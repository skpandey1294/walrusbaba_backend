const {
  findUser,
  addUser,
  deleteUserData,
  findUserByOTP
} = require('../Controller');

async function OTPMatch(req, res) {
  const otp = req.params.otp;
  const user = await findUserByOTP(otp);
  if (!user.length) {
    res.status(404).send({ message: 'User Not Registered' });
  } else {
    res.status(200).send(user);
  }
}

async function updateUserOTP(req, res) {
  const userData = req.body;
  const user = await findUser(userData);
  if (user === null) {
    res.status(404).send({ message: 'User Not Registered' });
  } else {
    res.status(200).send(user);
  }
}

module.exports = { OTPMatch: OTPMatch, updateUserOTP: updateUserOTP };
