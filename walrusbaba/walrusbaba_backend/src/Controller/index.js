const users = require('../Model/User');

async function findUser(userData) {
  try {
    return await users.find(
      {
        phoneNumber: userData.phoneNumber
      },
      (error, docs) => {
        if (!error) {
          if (!docs.length) {
            return addUser(userData);
          } else {
            return updateUserOTP(userData);
          }
        } else {
          console.error(`Error:${error}`);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
}

async function addUser(userData) {
  try {
    const user = new users(userData);
    return await user.save();
  } catch (error) {
    console.error(error);
  }
}

async function deleteUserData(mobile) {
  try {
    return await users.remove({
      where: { phoneNumber: mobile }
    });
  } catch (error) {
    console.error(error);
  }
}

async function updateUserOTP(userData) {
  try {
    console.log(userData);
    return await users.updateOne(
      {
        phoneNumber: `${userData.phoneNumber}`
      },
      {
        $set: {
          OTP: userData.OTP,
          Date: Date.now()
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
}

async function findUserByOTP(otp) {
  try {
    return await users.find({ OTP: otp });
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  findUser: findUser,
  addUser: addUser,
  deleteUserData: deleteUserData,
  findUserByOTP: findUserByOTP
};
