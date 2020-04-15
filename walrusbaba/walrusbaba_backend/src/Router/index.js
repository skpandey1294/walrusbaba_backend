const express = require('express');

const router = express.Router();

router.use(express.json());

const { OTPMatch, updateUserOTP, addFortune, getFortune } = require('../Service');

router.get('/user/:otp', OTPMatch);

router.post('/user/info', updateUserOTP);

// Fortune Message Router

router.get('/fortune/:id', getFortune);

router.post('/fortune', addFortune);

module.exports = router;
