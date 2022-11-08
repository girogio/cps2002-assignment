const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const rewire = require("rewire");
const sandbox = sinon.createSandbox();


const mongoose = require("mongoose");
let userController = rewire("../controllers/userController.js");
const User = require("../models/userModel.js");

describe("Testing the user controller", () => {
  let sampleUser;
  let findByIdStub;

  beforeEach(() => {
    sampleUser = {
      name: "John Doe",
      email: "john@doe.com",
    };
    findByIdStub = sandbox
      .stub(mongoose.Model, "findById")
      .resolves(sampleUser);
  });

  afterEach(() => {
    userController = rewire("../controllers/userController.js");
    sandbox.restore();
  });

  it("it should return a user by id", async () => {
    userController.getUserById("1234").then((user) => {
      expect(user).to.equal(sampleUser);
    });
  });

  it("it should throw an error if id is undefined", async () => {
    expect(() => userController.getUserById()).to.throw("User id is required.");
  });
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
