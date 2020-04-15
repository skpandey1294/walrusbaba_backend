const express = require('express');

const router = express.Router();

router.use(express.json());

const { OTPMatch, updateUserOTP, addFortune, getFortune, getFortuneDetail } = require('../Service');

router.get('/user/:otp', OTPMatch);

router.post('/user/info', updateUserOTP);

// Fortune Message Router

router.get('/fortune/:id', getFortune);

router.get('/fortune/sequence/:sequence', getFortuneDetail)

router.post('/fortune', addFortune);

module.exports = router;
