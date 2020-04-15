const {
  findUser,
  addUser,
  deleteUserData,
  findUserByOTP,
  addFortuneMessage,
  getFortuneMessage,
  getFortuneBySequence
} = require('../Controller');

const { sendOTP } = require('../msg91');

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
  sendOTP(userData);
  const user = await findUser(userData);
  if (user === null) {
    res.status(404).send({ message: 'User Not Registered' });
  } else {
    res.status(200).send(user);
  }
}

async function addFortune(req, res) {
  const msg = req.body;
  const fortuneMsg = await addFortuneMessage(msg);
  if (fortuneMsg === null) {
    res.status(404).send({ message: 'Fortune Add Failed' });
  } else {
    res.status(200).send(fortuneMsg);
  }
}

async function getFortune(req, res) {
  const { id } = req.params;
  const fortuneMsg = await getFortuneMessage(id);
  if (fortuneMsg === null) {
    res.status(404).send({ message: 'Fortune message not found' });
  } else {
    res.status(200).send(fortuneMsg);
  }
}

async function getFortuneDetail(req, res) {
  const sequence = req.params.sequence;
  const fortuneMsg = await getFortuneBySequence(sequence);
  if (fortuneMsg === null) {
    res.status(404).send({ message: 'Fortune message not found' });
  } else {
    res.status(200).send(fortuneMsg);
  }
}

module.exports = {
  OTPMatch: OTPMatch,
  updateUserOTP: updateUserOTP,
  addFortune: addFortune,
  getFortune: getFortune,
  getFortuneDetail
};
