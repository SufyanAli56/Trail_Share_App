const express = require('express');
const router = express.Router();
const { verifyOTP } = require('../controllers/otpController');

router.post('/verify', verifyOTP);

module.exports = router;