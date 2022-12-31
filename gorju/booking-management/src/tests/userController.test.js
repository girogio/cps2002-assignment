import sinon from "sinon";
import { expect, use } from "chai";
import sinonChai from "sinon-chai";

import userController from "../controllers/user.controller.js";
import axios from "axios";

use(sinonChai)

const sandbox = sinon.createSandbox()

describe("Testing the user controller", () => {



    describe("Testing getUser", () => {

        beforeEach(() => {
            sandbox.restore()
        })

        it("it should resolve and return user", (done) => {


            const returnedUser = {
                data: {
                    _id: "63ae05b628347818c81e10f2",
                    name: "John Doe",
                    email: "john@doe.com",
                    balance: 10
                },
                status: 200
            }

            const getStub = sandbox.stub(axios, 'get').resolves(returnedUser)

            userController.getUser("63ae05b628347818c81e10f2").then((user) => {
                expect(getStub).to.have.been.called
                expect(user).to.deep.equal(returnedUser.data)
                done()
            })
        })


        it("it should reject and return error 404 if user not found", (done) => {

            const response = {
                status: 404
            }

            const getStub = sandbox.stub(axios, 'get').resolves(response)

            userController.getUser("63ae05b628347818c81e10f2").catch((error) => {
                expect(getStub).to.have.been.called
                expect(error).to.deep.equal({ code: 404, data: "User not found" })
                done()
            })

        })
    })
})