import sinon from "sinon";
import { expect, use } from "chai";
import sinonChai from "sinon-chai";
import mongoose from "mongoose";
import bookingController from "../controllers/booking.controller.js";
import bookingModel from "../models/objects/booking.model.js";

import userController from "../controllers/user.controller.js";
import vehicleController from "../controllers/vehicle.controller.js";

use(sinonChai)
const sandbox = sinon.createSandbox()


describe("Testing the booking controller", () => {

    beforeEach(() => {
        sandbox.restore()
    })

    describe("Testing getAllBookings", () => {

        it("it should resolve and return list of bookings", (done) => {

            const returnedBookings = [
                {
                    "_id": "63aeefae51917a76c00b366a",
                    "booker_id": "63ae05b628347818c81e10f2",
                    "number_plate": "ABC123",
                    "from_date": "1671922800000",
                    "to_date": "1672095600000",
                    "price": 100,
                    "paid": true,
                }
            ]

            let findStub = sandbox.stub(mongoose.Model, 'find').resolves(returnedBookings)

            bookingController.getAllBookings().then((bookings) => {
                expect(findStub).to.have.been.called
                expect(bookings).to.be.an('array')
                done()
            })
        })

        it("it should reject and return error", (done) => {

            let err = new Error("Error")

            let findStub = sandbox.stub(mongoose.Model, 'find').rejects(err)

            bookingController.getAllBookings().catch((error) => {
                expect(findStub).to.have.been.called
                expect(error).to.be.an('object')
                expect(error.code).to.be.equal(503)
                expect(error.data).to.be.equal(err)
                done()
            })
        })
    })

    describe("Testing getCalendar", () => {

        it("it should resolve and return list of bookings", (done) => {

            const returnedBookings = [
                {
                    "booker_id": "63ae05b628347818c81e10f2",
                    "number_plate": "ABC123",
                    "from_date": "1671922800000",
                    "to_date": "1672095600000",
                    "price": 100,
                    "paid": true,
                },
                {
                    "booker_id": "63ae05b628347818c81e10f2",
                    "number_plate": "ABC123",
                    "from_date": "1672419013813",
                    "to_date": "168419033963",
                    "price": 100,
                    "paid": true,
                },
                {
                    "booker_id": "63ae05b628347818c81e10f2",
                    "number_plate": "ABC124",
                    "from_date": "1672419013813",
                    "to_date": "168419033963",
                    "price": 100,
                    "paid": true,
                }
            ]

            const expectedCalendar = {
                "ABC123": [
                    {
                        "from_date": "1671922800000",
                        "to_date": "1672095600000",
                    },
                    {
                        "from_date": "1672419013813",
                        "to_date": "168419033963",
                    }],
                "ABC124": [
                    {
                        "from_date": "1672419013813",
                        "to_date": "168419033963",
                    }
                ]
            }

            let findStub = sandbox.stub(mongoose.Model, 'find').resolves(returnedBookings)

            bookingController.getCalendar().then((calendar) => {
                expect(findStub).to.have.been.called
                expect(calendar).to.be.an('object')
                expect(calendar['ABC123']).to.be.an('array')
                expect(calendar).to.be.deep.equal(expectedCalendar)
                done()
            })
        })
    })

    describe("Testing createBooking", () => {

        it("it should resolve and return created booking id and created status code", (done) => {

            const request = {
                "booker_id": '63ae05b628347818c81e10f2',
                "number_plate": 'ABC123',
                "from_date": '12-12-2022',
                "to_date": '13-12-2022',
            }

            const returnedBooking = {
                "_id": "63aeefae51917a76c00b366a",
                "booker_id": "63ae05b628347818c81e10f2",
                "number_plate": "ABC123",
                "price": 100,
                "paid": false,
            }

            let getUserStub = sandbox.stub(userController, 'getUser').resolves({
                "name": "John Doe",
                "email": "john@doe.com",
                "balance": 1000
            })

            let findStub = sandbox.stub(mongoose.Model, 'find').resolves([])

            let saveStub = sandbox.stub(mongoose.Model.prototype, 'save').resolves(returnedBooking)

            let getVehicleStub = sandbox.stub(vehicleController, 'getVehicle').resolves({
                "number_plate": "ABC123",
                "price": 100,
                "available": true,
                "model": "BMW",
                "brand": "X3",
                "capacity": 5,
            })

            bookingController.createBooking(request).then((booking) => {
                expect(getVehicleStub).to.have.been.called
                expect(findStub).to.have.been.called
                expect(saveStub).to.have.been.called
                expect(booking).to.be.an('object')
                expect(booking).to.be.deep.equal({ code: 201, data: returnedBooking._id })
                done()
            })
        })

        it("it should reject if the request is invalid", (done) => {
            const request = {
                "booker_id": '63ae05basdsa628347818c81e10f2',
                "number_plate": 'ABCasdsa123',
                "from_date": '12-12sda-2022',
                "to_date": '13-12-2asdasdsd022',
            }

            bookingController.createBooking(request).catch((error) => {
                expect(error).to.be.an('object')
                expect(error.code).to.be.equal(400)
                done()
            })
        })

        it("it should reject and return status code 400 if there are overlapping bookings", (done) => {

            const request = {
                "booker_id": '63ae05b628347818c81e10f2',
                "number_plate": 'ABC123',
                "from_date": '12-12-2022',
                "to_date": '13-12-2022',
            }

            const returnedBooking = {
                "_id": "63aeefae51917a76c00b366a",
                "booker_id": "63ae05b628347818c81e10f2",
                "number_plate": "ABC123",
                "price": 100,
                "paid": false,
            }

            let getUserStub = sandbox.stub(userController, 'getUser').resolves({
                "name": "John Doe",
                "email": "john@doe.com",
                "balance": 1000
            })

            let findStub = sandbox.stub(mongoose.Model, 'find').resolves([
                {
                    "booker_id": "63ae05b628347818c81e10f2",
                    "number_plate": "ABC123",
                    "from_date": "1671922800000",
                    "to_date": "1672095600000",
                }
            ])

            let saveStub = sandbox.stub(mongoose.Model.prototype, 'save').resolves(returnedBooking)

            let getVehicleStub = sandbox.stub(vehicleController, 'getVehicle').resolves({
                "number_plate": "ABC123",
                "price": 100,
                "available": true,
                "model": "BMW",
                "brand": "X3",
                "capacity": 5,
            })

            bookingController.createBooking(request).catch((error) => {
                expect(getVehicleStub).to.have.been.called
                expect(findStub).to.have.been.called
                expect(saveStub).to.not.have.been.called
                expect(error).to.be.an('object')
                expect(error.code).to.be.equal(400)
                done()
            })
        })
    })

    describe("Testing getBookingById", () => {

        it("it should resolve and return booking", (done) => {
            const expectedBooking = {
                "_id": "63aeefae51927a76c00b366a",
                "booker_id": "63ae05b628347818c81e10f2",
                "number_plate": "ABC123",
                "from_date": "1671922800000",
                "to_date": "1672095600000",
                "price": 100,
                "paid": true,
            }


            let findByIdStub = sandbox.stub(mongoose.Model, 'findById').resolves(expectedBooking)

            bookingController.getBookingById('63aeefae51927a76c00b366a').then((booking) => {
                expect(findByIdStub).to.have.been.called
                expect(booking).to.be.an('object')
                expect(booking).to.be.deep.equal(expectedBooking)
                done()
            })
        })

        it("it should reject and return status code 404 if booking is not found", (done) => {

            let findByIdStub = sandbox.stub(mongoose.Model, 'findById').rejects()

            bookingController.getBookingById('63aeefae51927a76c00b366a').catch((error) => {
                expect(findByIdStub).to.have.been.called
                expect(error).to.be.an('object')
                expect(error.code).to.be.equal(404)
            })

            sandbox.restore()

            findByIdStub = sandbox.stub(mongoose.Model, 'findById').resolves(null)

            bookingController.getBookingById('63aeefae51927a76c00b366a').catch((error) => {
                expect(findByIdStub).to.have.been.called
                expect(error).to.be.an('object')
                expect(error.code).to.be.equal(404)
                done()
            })
        })
    })

    describe("Testing fulfillBookingById", () => {

        it("it should resolve and return booking", (done) => {

            const inputBooking = {
                "_id": "63aeefae51927a76c00b366a",
                "booker_id": "63ae05b628347818c81e10f2",
                "number_plate": "ABC123",
                "from_date": "1671922800000",
                "to_date": "1672095600000",
                "price": 100,
                "paid": false,
                pay: function () {
                    return new Promise((resolve, reject) => {
                        this.paid = true
                        resolve(this)
                    })
                }
            }

            let findByIdStub = sandbox.stub(mongoose.Model, 'findById').resolves(inputBooking)

            bookingController.fulfillBookingById('63aeefae51927a76c00b366a').then((booking) => {
                expect(findByIdStub).to.have.been.called
                expect(booking.paid).to.be.true
                done()
            })
        })

        it("it should reject if payment cannot occur", (done) => {

            const inputBooking = {
                "_id": "63aeefae51927a76c00b366a",
                "booker_id": "63ae05b628347818c81e10f2",
                "number_plate": "ABC123",
                "from_date": "1671922800000",
                "to_date": "1672095600000",
                "price": 100,
                "paid": false,
                pay: function () {
                    return new Promise((resolve, reject) => {
                        reject({ code: 406, data: "Insufficient funds." })
                    })
                }
            }

            let findByIdStub = sandbox.stub(mongoose.Model, 'findById').resolves(inputBooking)

            bookingController.fulfillBookingById('63aeefae51927a76c00b366a').catch((error) => {
                expect(findByIdStub).to.have.been.called
                expect(error.code).to.be.equal(406)
                expect(error.data).to.be.eq("Insufficient funds.")
                done()
            })
        })

        it("it should reject if booking has been paid", (done) => {

            const inputBooking = {
                "_id": "63aeefae51927a76c00b366a",
                "booker_id": "63ae05b628347818c81e10f2",
                "number_plate": "ABC123",
                "from_date": "1671922800000",
                "to_date": "1672095600000",
                "price": 100,
                "paid": true,
            }

            let findByIdStub = sandbox.stub(mongoose.Model, 'findById').resolves(inputBooking)

            bookingController.fulfillBookingById('63aeefae51927a76c00b366a').catch((error) => {
                expect(findByIdStub).to.have.been.called
                done()
            })
        })

        it("it should reject if no user with given id is found", (done) => {

            let findByIdStub = sandbox.stub(mongoose.Model, 'findById').rejects()

            bookingController.fulfillBookingById('asd').catch((error) => {
                expect(findByIdStub).to.have.been.called
                done()
            })
        })
    })
})



