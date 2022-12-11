const User = require("../models/userModel.js");

exports.createUser = (userObj) => {
  return new Promise((resolve, reject) => {

    let user = new User(userObj);

    if (user.name === undefined || user.email === undefined) {
      reject("User name and email are required.");
    }

    // get users with the same email
    User.find({ email: user.email }).then((users) => {
      if (users.length > 0) {
        reject("User with this email already exists.");
      } else {
        user
          .save()
          .then(() => {
            resolve(user._id);
          })
          .catch((error) => {
            reject(error);
          });
      }
    })
  });
};

exports.deleteUserById = (id) => {
  return new Promise((resolve, reject) => {
    if (!(id === undefined || id === null || id === "")) {
      User.findByIdAndDelete(id)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      reject("User id is required.");
    }
  });
}

exports.findByIdAndUpdate = (id, userObj) => {
  return new Promise((resolve, reject) => {
    if (!(id === undefined || id === null || id === "")) {

      User.findById(id).then((userToModify) => {

        if (userObj.name !== undefined) {
          userToModify.name = userObj.name;
        }

        if (userObj.email !== undefined) {
          userToModify.email = userObj.email;
        }

        userToModify.save().then(() => {
          resolve();
        }).catch((error) => {
          reject(error);
        })
      }).catch((error) => {
        reject(error);
      });
    } else {
      reject("User id is required.");
    }
  });
}

exports.getUserById = function (id) {
  if (id === undefined)
    throw new Error("User id is required.");
  return User.findById(id);
};

exports.getAllUsers = () => {
  return User.find();
};

exports.deleteAllUsers = () => {
  return User.deleteMany();
};
