const User = require('../models/User');
const OtpLog = require('../models/OtpLog');
const sendEmail = require('../config/mailer');
const generateOTP = require('../utils/generateOTP');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

/**
 * @desc Register user & send OTP
 * @route POST /api/auth/register
 */
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return next(new ErrorResponse('Email already registered', 400));

  // Create user without password first
  const user = await User.create({ name, email });

  // Generate OTP
  const otp = generateOTP();
  user.otp = otp;
  user.otpExpire = Date.now() + (process.env.OTP_EXPIRE_MINUTES || 10) * 60 * 1000;
  await user.save();

  // Log OTP
  await OtpLog.create({ email: user.email, otp });

  // Send OTP via email
  const message = `Your OTP for SufariTrails is ${otp}. It expires in ${
    process.env.OTP_EXPIRE_MINUTES || 10
  } minutes.`;
  try {
    await sendEmail({
      to: user.email,
      subject: 'SufariTrails - OTP Verification',
      text: message,
    });

    res.status(201).json({
      success: true,
      data: { email: user.email, message: 'OTP sent to email' },
    });
  } catch (err) {
    console.error('Email send error:', err);
    await User.deleteOne({ _id: user._id });
    return next(new ErrorResponse('Email could not be sent', 500));
  }
});

/**
 * @desc Verify OTP
 * @route POST /api/otp/verify
 */
exports.verifyOtp = asyncHandler(async (req, res, next) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });
  if (!user) return next(new ErrorResponse('User not found', 404));

  // Check OTP and expiry
  if (!user.otp || user.otp !== otp) {
    return next(new ErrorResponse('Invalid OTP', 400));
  }
  if (user.otpExpire < Date.now()) {
    return next(new ErrorResponse('OTP expired', 400));
  }

  // Mark verified and clear OTP
  user.isVerified = true;
  user.otp = undefined;
  user.otpExpire = undefined;
  await user.save();

  await OtpLog.updateMany({ email, otp }, { used: true });

  res.status(200).json({ success: true, message: 'OTP verified successfully', email: user.email });
});

/**
 * @desc Set Password after OTP verification
 * @route POST /api/auth/set-password
 */
exports.setPassword = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return next(new ErrorResponse('User not found', 404));

  if (!user.isVerified) {
    return next(new ErrorResponse('User not verified. Please verify OTP first.', 400));
  }

  // Assign password (pre-save hook will hash)
  user.password = password;
  await user.save();

  res.status(200).json({ success: true, message: 'Password set successfully. You can now log in.' });
});

/**
 * @desc Login user with email + password
 * @route POST /api/auth/login
 */
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !user.isVerified)
    return next(new ErrorResponse('Invalid credentials or user not verified', 401));

  if (!user.password)
    return next(new ErrorResponse('Password not set. Please set your password first.', 400));

  const isMatch = await user.matchPassword(password);
  if (!isMatch) return next(new ErrorResponse('Invalid credentials', 401));

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });

  res.status(200).json({
    success: true,
    token,
    user: { id: user._id, name: user.name, email: user.email },
  });
});
