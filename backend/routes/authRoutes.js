const express = require('express');
const { register, login, setPassword } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/set-password', setPassword);
router.post('/login', login);

module.exports = router;
