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

