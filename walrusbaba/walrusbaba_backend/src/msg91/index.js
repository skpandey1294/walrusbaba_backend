const msg91 = require('msg91')('323908AswHoLCjSaZx5e71ea52P1', 'WALRUS', '4');

function sendOTP(msg) {
  msg91.send(msg.phoneNumber, msg.OTP);
}

module.exports = { sendOTP: sendOTP };
