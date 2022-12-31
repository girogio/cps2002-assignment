import sinon from "sinon";
import { expect, use } from "chai";
import sinonChai from "sinon-chai";

import Booking from "../models/objects/booking.model.js";
import userController from "../controllers/user.controller.js";
import axios from "axios";

use(sinonChai)

const sandbox = sinon.createSandbox()

describe("Testing the booking model", () => {

    describe("Testing pay()", () => {


        beforeEach(() => {
            sandbox.restore()
        })

        afterEach(() => {
            sandbox.restore()
        })

        it("it should resolve and return success message if funds are sufficient", (done) => {

            let user = {
                _id: "63ae05b628347818c81e10f2",
                name: "John Doe",
                email: "john@doe.com",
                balance: 1000
            }

            let booking = {
                booker_id: "63ae05b628347818c81e10f2",
                number_plate: "ABC123",
                from_date: new Date(),
                to_date: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)),
                price: 100,
                paid: false,
            }

            function deductBal() {
                if (user.balance > booking.price)
                    user.balance -= booking.price
            }


            sandbox.stub(axios, 'patch').callsFake(deductBal)

            sandbox.stub(userController, 'getUser').resolves(user)

            booking = new Booking(booking)

            booking.pay().then((response) => {
                expect(response).to.deep.equal({ code: 200, data: "Booking paid" })
                expect(booking.paid).to.be.true
                expect(user.balance).to.equal(900)
                done()
            })
        })
    })


    it("it should reject and return error message if funds are insufficient", (done) => {

        let user = {
            _id: "63ae05b628347818c81e10f2",
            name: "John Doe",
            email: "john@doe.com",
            balance: 0
        }

        let booking = {
            booker_id: "63ae05b628347818c81e10f2",
            number_plate: "ABC123",
            from_date: new Date(),
            to_date: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)),
            price: 100,
            paid: false,
        }

        function deductBal() {
            if (user.balance > booking.price)
                user.balance -= booking.price
        }


        sandbox.stub(axios, 'patch').callsFake(deductBal)

        sandbox.stub(userController, 'getUser').resolves(user)

        booking = new Booking(booking)

        booking.pay().catch((response) => {
            expect(response).to.deep.equal({ code: 406, data: 'Insufficient funds' })
            expect(booking.paid).to.be.false
            expect(user.balance).to.equal(0)
            done()
        })
    })
})