const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// Check if user is verified via OTP
exports.checkVerified = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user.isVerified) {
    return next(new ErrorResponse('Please verify your account with OTP first', 401));
  }

  next();
});