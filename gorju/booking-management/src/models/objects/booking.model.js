import axios from 'axios'
import mongoose from 'mongoose'
import userController from '../../controllers/user.controller.js'
import { StatusCodes } from 'http-status-codes'

const bookingSchema = new mongoose.Schema({
    booker_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    number_plate: {
        type: String,
        required: true
    },
    from_date: {
        type: Date,
        required: true,
    },
    to_date: {
        type: Date,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    paid: {
        type: Boolean,
        default: false
    },
}, {
    methods: {
        pay: function () {
            return new Promise((resolve, reject) => {

                userController.getUser(this.booker_id).then((user) => {

                    if (user.balance < this.price) {
                        return reject({ code: 406, data: "Insufficient funds" })
                    }
                    axios.patch(process.env.USER_API_URL + this.booker_id, {
                        balance: user.balance - this.price
                    }).catch(() => {
                        return reject({ code: StatusCodes.NOT_ACCEPTABLE, data: "Error updating user balance" })
                    })

                    this.paid = true

                    this.save()

                    return resolve({ code: StatusCodes.OK, data: "Booking paid" })

                }).catch((err) => {
                    return reject(err)
                })
            })
        }
    }
})

export default mongoose.model('Booking', bookingSchema)
