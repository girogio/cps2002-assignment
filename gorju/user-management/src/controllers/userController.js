const User = require("../models/userModel.js");
const StatusCodes = require("http-status-codes").StatusCodes;

exports.createUser = (userObj) => {
  return new Promise((resolve, reject) => {
    const user = new User(userObj);
    user.save().then(() => {
      resolve({ code: StatusCodes.CREATED, data: { user_id: user._id } });
    }).catch(() => {
      reject({ code: StatusCodes.CONFLICT, data: "Email is already taken." });
    })
  });
};

exports.deleteUserById = (id) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndDelete(id).then(() => {
      resolve({ code: StatusCodes.OK, data: "User deleted." });
    }).catch(() => {
      reject({ code: StatusCodes.INTERNAL_SERVER_ERROR, data: "Invalid id." });
    });
  });
}

exports.findByIdAndUpdate = (id, userObj) => {
  return new Promise((resolve, reject) => {
    User.findById(id).then((userToModify) => {

      if (userToModify === null)
        reject({ code: StatusCodes.NOT_FOUND, data: "User not found." });

      userToModify.name = userObj.name === undefined || userObj.name === "" ? userToModify.name : userObj.name;
      userToModify.email = userObj.email === undefined || userObj.email === "" ? userToModify.email : userObj.email;
      userToModify.balance = userObj.balance === undefined || userObj.balance === -1 ? userToModify.balance : userObj.balance;

      let updatedUser = new User(userToModify);

      updatedUser.save().then(() => {
        resolve({ code: StatusCodes.OK, data: "User updated." });
      }).catch((error) => {
        reject({ code: StatusCodes.INTERNAL_SERVER_ERROR, data: error });
      })
    }).catch((error) => {
      reject({ code: StatusCodes.INTERNAL_SERVER_ERROR, data: error });
    });
  });
}

exports.addBalanceById = (id, amount) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(id, { $inc: { balance: amount } })
      .then(() => {
        resolve({ code: StatusCodes.OK, data: { message: "Balance added successfully." } });
      }).catch((error) => {
        reject({ code: StatusCodes.INTERNAL_SERVER_ERROR, data: error });
      })
  });
}

exports.getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email }).then((user) => {
      if (user === null) {
        reject({ code: StatusCodes.NOT_FOUND, data: "User not found." });
      }
      resolve({ code: StatusCodes.OK, data: user });
    })
  });
}

exports.getUserById = function (id) {
  return new Promise((resolve, reject) => {
    User.findById(id).then((user) => {
      if (user === null) {
        reject({ code: StatusCodes.NOT_FOUND, data: "User not found." });
      }
      resolve({ code: StatusCodes.OK, data: user });
    }).catch((error) => {
      reject({ code: StatusCodes.INTERNAL_SERVER_ERROR, data: error });
    });
  });
};

exports.getAllUsers = () => {
  return new Promise((resolve) => {
    User.find().then((users) => {
      resolve({ code: StatusCodes.OK, data: users });
    })
  });
};

exports.deleteAllUsers = () => {
  return new Promise((resolve) => {
    User.deleteMany({}).then(() => {
      resolve({ code: StatusCodes.OK, data: "All users deleted." });
    })
  })
};
