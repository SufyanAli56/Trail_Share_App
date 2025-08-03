const User = require('../models/User');
const OtpLog = require('../models/OtpLog');
const sendEmail = require('../config/mailer');
const generateOTP = require('../utils/generateOTP');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('express-async-handler');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorResponse('Email already registered', 400));
  }

  // Create user
  const user = await User.create({
    name,
    email,
  });

  // Generate OTP
  const otp = generateOTP();

  // Save OTP to user
  user.otp = otp;
  user.otpExpire = new Date(Date.now() + process.env.OTP_EXPIRE_MINUTES * 60 * 1000);
  await user.save();

  // Log OTP
  await OtpLog.create({
    email: user.email,
    otp,
  });

  // Send OTP email
  const message = `Your OTP for SufariTrails is ${otp}. It will expire in ${process.env.OTP_EXPIRE_MINUTES} minutes.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'SufariTrails - OTP Verification',
      message,
    });

    res.status(201).json({
      success: true,
      data: {
        email: user.email,
        message: 'OTP sent to email',
      },
    });
  } catch (error) {
    await User.deleteOne({ _id: user._id });
    return next(new ErrorResponse('Email could not be sent', 500));
  }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Generate OTP
  const otp = generateOTP();

  // Save OTP to user
  user.otp = otp;
  user.otpExpire = new Date(Date.now() + process.env.OTP_EXPIRE_MINUTES * 60 * 1000);
  await user.save();

  // Log OTP
  await OtpLog.create({
    email: user.email,
    otp,
  });

  // Send OTP email
  const message = `Your OTP for SufariTrails is ${otp}. It will expire in ${process.env.OTP_EXPIRE_MINUTES} minutes.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'SufariTrails - OTP Verification',
      message,
    });

    res.status(200).json({
      success: true,
      data: {
        email: user.email,
        message: 'OTP sent to email',
      },
    });
  } catch (error) {
    return next(new ErrorResponse('Email could not be sent', 500));
  }
});