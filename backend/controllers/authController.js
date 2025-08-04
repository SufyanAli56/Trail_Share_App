const User = require('../models/User');
const OtpLog = require('../models/OtpLog');
const sendEmail = require('../config/mailer');
const generateOTP = require('../utils/generateOTP');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
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
  const message = `Your OTP for SufariTrails is ${otp}. It expires in ${process.env.OTP_EXPIRE_MINUTES || 10} minutes.`;
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

// @desc    Set Password after OTP verification
// @route   POST /api/auth/set-password
// @access  Public
exports.setPassword = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !user.isVerified)
    return next(new ErrorResponse('User not verified or does not exist', 400));

  // ✅ Just assign the password; pre('save') will hash automatically
  user.password = password;
  await user.save();

  res.status(200).json({ success: true, message: 'Password set successfully. You can now log in.' });
});

// @desc    Login user with email + password
// @route   POST /api/auth/login
// @access  Public
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
