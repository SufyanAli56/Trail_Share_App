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

  // 1️⃣ Find user
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // 2️⃣ Check if OTP matches and not expired
  if (user.otp !== otp || user.otpExpire < new Date()) {
    return next(new ErrorResponse('Invalid or expired OTP', 400));
  }

  // 3️⃣ Update OTP log as verified
  await OtpLog.findOneAndUpdate(
    { email, otp },
    { verified: true },
    { new: true }
  );

  // 4️⃣ Clear OTP from user and mark verified
  user.otp = undefined;
  user.otpExpire = undefined;
  user.isVerified = true;
  await user.save();

  // 5️⃣ Generate JWT
  const token = generateToken(user._id);

  // 6️⃣ Set cookie options safely
  const cookieExpireDays = Number(process.env.JWT_COOKIE_EXPIRE || 7); // default 7 days
  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000),
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  // 7️⃣ Send response with token and cookie
  res
    .status(200)
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
