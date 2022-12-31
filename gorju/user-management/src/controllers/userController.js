const User = require("../models/userModel.js");
const StatusCodes = require("http-status-codes").StatusCodes;

exports.createUser = (userObj) => {
  //validate userObj then save it
  return new Promise((resolve, reject) => {

    if (userObj.name === undefined || userObj.name === "" || userObj.email === undefined || userObj.email === "") {
      reject({ code: StatusCodes.BAD_REQUEST, data: "User name and email are required." });
    }

    const user = new User(userObj);

    user.save().then(() => {
      resolve({ code: StatusCodes.CREATED, data: "User created." });
    }).catch(() => {
      reject({ code: StatusCodes.CONFLICT, data: "Email is already taken." });
    })
  });
};

exports.deleteUserById = (id) => {
  return new Promise((resolve, reject) => {
    if (!(id === undefined || id === null || id === "")) {
      User.findByIdAndDelete(id).then(() => {
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

        let updatedUser = new User(userToModify);

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
          resolve({ code: StatusCodes.OK, data: { message: "Balance added successfully." } });
        }).catch((error) => {
          reject({ code: StatusCodes.INTERNAL_SERVER_ERROR, data: error });
        })
    }
  });
}

exports.getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    if (!(email === undefined || email === null || email === "")) {
      User.findOne({ email }).then((user) => {
        if (user === null) {
          reject({ code: StatusCodes.NOT_FOUND, data: "User not found." });
        }
        resolve({ code: StatusCodes.OK, data: user });
      })
    } else {
      reject({ code: StatusCodes.BAD_REQUEST, data: "User email is required." });
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
