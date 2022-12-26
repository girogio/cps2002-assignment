const User = require("../models/userModel.js");
const StatusCodes = require("http-status-codes").StatusCodes;

exports.createUser = (userObj) => {
  return new Promise((resolve, reject) => {

    let user = new User(userObj);

    if (user.name === undefined || user.email === undefined) {
      reject({ code: StatusCodes.BAD_REQUEST, data: "User name and email are required." });
    }

    // get users with the same email
    User.find({ email: user.email }).then((users) => {
      if (users.length > 0) {
        reject({ code: StatusCodes.CONFLICT, data: "User with this email already exists." });
      } else {
        user.save().then(() => {
          resolve({ code: StatusCodes.CREATED, data: { id: user._id } });
        })
          .catch((error) => {
            reject({ code: StatusCodes.INTERNAL_SERVER_ERROR, data: error });
          });
      }
    })
  });
};

exports.deleteUserById = (id) => {
  return new Promise((resolve, reject) => {
    if (!(id === undefined || id === null || id === "")) {
      User.findByIdAndDelete(id).then((err) => {
        resolve({ code: StatusCodes.OK, data: "User deleted." });
      }).catch(() => {
        reject({ code: StatusCodes.INTERNAL_SERVER_ERROR, data: "Invalid id." });
      });
    } else {
      reject({ code: StatusCodes.BAD_REQUEST, data: "User id is required." });
    }
  });
}

exports.findByIdAndUpdate = (id, userObj) => {
  return new Promise((resolve, reject) => {
    if (!(id === undefined || id === null || id === "")) {

      User.findById(id).then((userToModify) => {

        if (userToModify === null)
          reject({ code: StatusCodes.NOT_FOUND, data: "User not found." });

        userToModify.name = userObj.name === undefined || userObj.name === "" ? userToModify.name : userObj.name;
        userToModify.email = userObj.email === undefined || userObj.email === "" ? userToModify.email : userObj.email;
        userToModify.balance = userObj.balance === undefined || userObj.balance === -1 ? userToModify.balance : userObj.balance;

        updatedUser = new User(userToModify);

        updatedUser.save().then(() => {
          resolve({ code: StatusCodes.OK, data: "User updated." });
        }).catch((error) => {
          reject({ code: StatusCodes.INTERNAL_SERVER_ERROR, data: error });
        })
      }).catch((error) => {
        reject({ code: StatusCodes.INTERNAL_SERVER_ERROR, data: error });
      });
    } else {
      reject({ code: StatusCodes.BAD_REQUEST, data: "User id is required." });
    }
  });
}

exports.addBalanceById = (id, amount) => {
  return new Promise((resolve, reject) => {
    if ((id === undefined || id === null || id === "")) {
      reject({ code: StatusCodes.BAD_REQUEST, data: "User id is required." });
    } else {
      User.findByIdAndUpdate(id, { $inc: { balance: amount } })
        .then(() => {
          resolve({ code: StatusCodes.OK, data: "Balance added successfully." });
        }).catch((error) => {
          reject({ code: StatusCodes.INTERNAL_SERVER_ERROR, data: error });
        })
    }
  });
}

exports.getUserById = function (id) {
  return new Promise((resolve, reject) => {
    if (!(id === undefined || id === null || id === "")) {
      User.findById(id).then((user) => {
        if (user === null) {
          reject({ code: StatusCodes.NOT_FOUND, data: "User not found." });
        }
        resolve({ code: StatusCodes.OK, data: user });
      }).catch((error) => {
        reject({ code: StatusCodes.INTERNAL_SERVER_ERROR, data: error });
      });
    } else {
      reject({ code: StatusCodes.BAD_REQUEST, data: "User id is required." });
    }
  });
};

exports.getAllUsers = () => {
  return new Promise((resolve, reject) => {
    User.find().then((users) => {
      resolve({ code: StatusCodes.OK, data: users });
    })
  });
};

exports.deleteAllUsers = () => {
  return new Promise((resolve, reject) => {
    User.deleteMany({}).then(() => {
      resolve({ code: StatusCodes.OK, data: "All users deleted." });
    })
  })
};
