// importing required packages
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const rewire = require("rewire");

// configuring testing framework
chai.use(sinonChai);
const sandbox = sinon.createSandbox();

// importing database models and controllers
const mongoose = require("mongoose");
let userController = rewire("../controllers/userController.js");
// const userController =    require("../controllers/userController.js");
const User = require("../models/userModel.js");

describe("Testing the user controller", () => {
  let sampleUser;

  beforeEach(() => {
    sampleUser = {
      name: "John Doe",
      email: "john@doe.com",
      id: "1234"
    }

    // stub the findById method of the User model (returns sampleUser)
    findByIdStub = sandbox
      .stub(mongoose.Model, "findById")
      .resolves(sampleUser);

  });

  afterEach(() => {
    userController = rewire("../controllers/userController.js");
    sandbox.restore();
  });

  describe("Testing the createUser function", () => {

    it("it should resolve when no duplicate users are found", (done) => {

      // stub the find method of the User model (no duplicate users found)
      findStub = sandbox
        .stub(mongoose.Model, "find")
        .resolves([]);

      // stub a successful save of a new user
      saveStub = sandbox
        .stub(mongoose.Model.prototype, "save")
        .resolves();

      // creating a new user 
      userController.createUser(sampleUser).then(() => {
        expect(findStub).to.have.been.calledOnce;
        expect(findStub).to.have.been.calledWith({ email: sampleUser.email });
        expect(saveStub).to.have.been.calledOnce;
        done()
      })
    })


    it("it should reject if the user name is not provided", (done) => {
      let user = {
        email: "john@doe.com",
        name: undefined
      };
      userController.createUser(user).catch((error) => {
        expect(error).to.equal("User name and email are required.");
        done()
      })
    })

    it("it should reject if the email is not provided", (done) => {
      let user = {
        email: undefined,
        name: "John Doe"
      };
      userController.createUser(user).catch((error) => {
        expect(error).to.equal("User name and email are required.");
        done()
      })
    })

    it("it should reject if the user already exists", (done) => {

      // stub the find method of the User model (duplicate user found)
      findStub = sandbox
        .stub(mongoose.Model, "find")
        .resolves([sampleUser]);

      // creating a new user with the same email as the sampleUser
      userController.createUser(sampleUser).catch((error) => {
        expect(error).to.equal("User with this email already exists.");
        done()
      })
    })

    it("it should reject if the save fails", (done) => {

      // stub the find method of the User model (no duplicate users found)
      findStub = sandbox
        .stub(mongoose.Model, "find")
        .resolves([]);

      // stub a failed save of a new user
      saveStub = sandbox
        .stub(mongoose.Model.prototype, "save")
        .rejects()

      // creating a new user 
      userController.createUser(sampleUser).catch((error) => {
        done()
      })
    })
  });

  describe("Testing the getUserById function", () => {

    it("it should return a user by id", async () => {
      userController.getUserById("1234").then((user) => {
        expect(user).to.equal(sampleUser);
      });
    });

    it("should throw an error if no id is provided", (done) => {
      try {
        userController.getUserById();
      } catch (error) {
        expect(error.message).to.equal("User id is required.");
        done();
      }
    })
  });

  describe("Testing the getAllUsers function", () => {

    it("should return all users", async () => {
      let users = [sampleUser];
      let findStub = sandbox
        .stub(mongoose.Model, "find")
        .resolves(users);

      userController.getAllUsers().then((users) => {
        expect(users).to.equal(users);
      });
    });
  });

  describe("Testing the deleteAllUsers function", () => {

    it("it should delete all users", async () => {

      let deleteManyStub = sandbox
        .stub(mongoose.Model, "deleteMany")
        .resolves();

      userController.deleteAllUsers().then(() => {
        expect(deleteManyStub).to.have.been.calledOnce;
      });
    });
  });



  describe("Testing the deleteUserById function", () => {

    it("it should resolve and delete a user by id", async () => {

      // stub the findByIdAndDelete method of the User model (resolves)
      let findByIdAndDeleteStub = sandbox
        .stub(mongoose.Model, "findByIdAndDelete")
        .resolves();

      // delete a user by id = 1234
      userController.deleteUserById("1234").then(() => {
        expect(findByIdAndDeleteStub).to.have.been.calledOnce;
        done();
      })

    });

    it("it should reject if id is undefined", (done) => {
      userController.deleteUserById().catch(() => {
        done()
      })
    });

    it("it should reject if user is not found", (done) => {

      sandbox.restore();

      failedFindByIdAndDeleteStub = sandbox
        .stub(mongoose.Model, "findByIdAndDelete")
        .rejects();

      userController.deleteUserById("123").catch(() => {
        done()
      })
    })
  })

  // describe("Testing the updateUserById function", () => {

  //   it("it should resolve and update a user by id", async (done) => {

  //     editedUser = {
  //       name: "John Dozer",
  //       email: "john@dozer.com"
  //     }

  //     // stub the save method 
  //     saveStub = sandbox
  //       .stub(mongoose.Model.prototype, "save")
  //       .resolves();

  //     const a = await userController.findByIdAndUpdate("1234", editedUser)
  //     console.log(a)

  //     done()
  //   })
  // })
});

describe("Testing user model", () => {
  let sampleUser;

  beforeEach(() => {
    sampleUser = {
      name: "John Doe",
      email: "john@doe.com",
    };
  });

  it("it should throw an error due to empty fields", () => {
    let user = new User();
    user.validate((err) => {
      expect(err.errors.name).to.exist;
      expect(err.errors.email).to.exist;
    });
  });

  it("it should create the user successfully with correct parameters", (done) => {
    let user = new User({ ...sampleUser });
    user.validate((err) => {
      expect(err).to.not.exist;
      done();
    });
  });
});

