const express = require('express');

const router = express.Router();

router.use(express.json());

const { OTPMatch, updateUserOTP } = require('../Service');

router.get('/user/:otp', OTPMatch);

router.post('/user/info', updateUserOTP);

module.exports = router;
