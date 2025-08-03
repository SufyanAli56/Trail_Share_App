const mongoose = require('mongoose');

const otpLogSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600, // Document will be automatically deleted after 10 minutes
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('OtpLog', otpLogSchema);