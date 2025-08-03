const User = require('../models/User');
const OtpLog = require('../models/OtpLog');
const generateToken = require('../utils/generateToken');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('express-async-handler');

// @desc    Verify OTP
// @route   POST /api/otp/verify
// @access  Public
exports.verifyOTP = asyncHandler(async (req, res, next) => {
  const { email, otp } = req.body;

  // Find user
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if OTP matches and not expired
  if (user.otp !== otp || user.otpExpire < new Date()) {
    return next(new ErrorResponse('Invalid or expired OTP', 400));
  }

  // Update OTP log
  await OtpLog.findOneAndUpdate(
    { email, otp },
    { verified: true },
    { new: true }
  );

  // Clear OTP from user
  user.otp = undefined;
  user.otpExpire = undefined;
  user.isVerified = true;
  await user.save();

  // Generate token
  const token = generateToken(user._id);

  // Set cookie options
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(200)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
});