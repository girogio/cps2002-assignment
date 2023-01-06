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


describe("Testing the user controller", () => {

  let sampleUser;

  beforeEach(() => {

    sampleUser = {
      name: "John Doe",
      email: "john@doe.com",
      id: "1234",
      balance: 0
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

  describe("Testing the getUserByEmail function", () => {

    it("should reject if the email is not found", (done) => {

      // stub the findOne method of the User model (returns null)
      findOneStub = sandbox
        .stub(mongoose.Model, "findOne")
        .resolves(null);

      userController.getUserByEmail("asd").then(() => { })

      userController.getUserByEmail("asd").catch((error) => {
        expect(error.code).to.equal(404);
        expect(error.data).to.equal("User not found.");
        done();
      })
    })

      it("should resolve if the email is found", (done) => {
          
          // stub the findOne method of the User model (returns sampleUser)
          let findOneStub = sandbox
            .stub(mongoose.Model, "findOne")
            .resolves(sampleUser);
  
          userController.getUserByEmail("asd").then((response) => {
            expect(response.code).to.equal(200);
            expect(response.data).to.equal(sampleUser);
            done();
          })
  
        })

        it("should reject if the findOne method fails", (done) => {

          // stub the findOne method of the User model (returns null)
          let findOneStub = sandbox
            .stub(mongoose.Model, "findOne")
            .resolves(null);
  
          userController.getUserByEmail("asd").then(() => { })
  
          userController.getUserByEmail("asd").catch((error) => {
            expect(error.code).to.equal(404);

            expect(error.data).to.equal("User not found.");
            done();
          })
  

        })


  })

  describe("Testing the createUser function", () => {

    it("it should resolve when no duplicate users are found", (done) => {

      // stub a successful save of a new user
      let saveStub = sandbox
        .stub(mongoose.Model.prototype, "save")
        .resolves();

      // creating a new user 
      userController.createUser(sampleUser).then(() => {
        expect(saveStub).to.have.been.calledOnce;
        done()
      })
    })

    it("it should reject if the user already exists", (done) => {

      // stub the find method of the User model (duplicate user found)

      let saveStub = sandbox
        .stub(mongoose.Model.prototype, "save")
        .rejects()

      // creating a new user with the same email as the sampleUser
      userController.createUser(sampleUser).catch((error) => {
        expect(error.code).to.equal(409);
        expect(error.data).to.equal("Email is already taken.");
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

    it("it should return a user by id", () => {
      userController.getUserById("1234").then((response) => {
        expect(response.code).to.equal(200);
        expect(findByIdStub).to.have.been.calledOnce;
        expect(response.data).to.equal(sampleUser);
      });
    });

    it("it should throw an error if the user is not found", () => {
      findByIdStub.resolves(null);
      userController.getUserById("123").catch((error) => {
        expect(error.code).to.equal(404);
        expect(error.data).to.equal("User not found.");
      });
    });

    it("it should throw an error if the user id is invalid", () => {
      findByIdStub.rejects()
      userController.getUserById("a").catch((error) => {
        expect(error.code).to.equal(500);
      });
    });
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

  describe("Testing the work function", () => {

    it("it should resolve and update a user by id", (done) => {
      sandbox.stub(mongoose.Model, "findByIdAndUpdate").resolves();
      userController.addBalanceById("1234").then(() => {
        done()
      })
    })

    it("it should reject if user is not found", (done) => {

      failedFindByIdAndUpdateStub = sandbox
        .stub(mongoose.Model, "findByIdAndUpdate")
        .rejects();

      userController.addBalanceById("123").catch((error) => {
        done()
      })
    })
  })

  describe("Testing the updateUserById function", () => {

    it("it should resolve and update a user by id", (done) => {

      editedUser = {
        name: "John Dozer",
        email: "john@dozer.com",
        balance: 30000
      }

      // stub the save method 
      saveStub = sandbox
        .stub(mongoose.Model.prototype, "save")
        .resolves();

      userController.findByIdAndUpdate("1234", editedUser).then(() => {
        done()
      })
    })

    it("it should reject if id is undefined", (done) => {
      sandbox.restore();
      sandbox.stub(mongoose.Model, "findById").resolves(null);

      userController.findByIdAndUpdate('1234').catch((error) => {
        expect(error.data).to.equal("User not found.");
        expect(error.code).to.equal(404);
        done()
      })
    })
    
    it("it should resolve and not change a user if no data is given", (done) => {
      
      let editedUser = {
        name: "",
        email: "",
      }

      // stub the save method 
        let saveStub = sandbox
        .stub(mongoose.Model.prototype, "save")
        .resolves();

      userController.findByIdAndUpdate("1234", editedUser).then(() => {
        done()
      })
    })


    it("it should reject if save method fails", (done) => {

      sandbox.restore();
      sandbox.stub(mongoose.Model, "findById").resolves(sampleUser);

      failedSaveStub = sandbox
        .stub(mongoose.Model.prototype, "save")
        .rejects();

      userController.findByIdAndUpdate("1234", editedUser).catch((error) => {
        done()
      })
    })

  })
});