import mongoose from 'mongoose'
import vehicleController from '../..//controllers/vehicle.controller.js'
const createBookingRequestSchema = new mongoose.Schema({
    booker_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    number_plate: {
        type: String,
        required: true,
        uppercase: true,
        match: /[A-Z]{3}[0-9]{3}/
    },
    from_date: {
        type: String,
        required: true,
        match: /[0-9]{2}-[0-9]{2}-[0-9]{4}/
    },
    to_date: {
        type: String,
        required: true,
        match: /[0-9]{2}-[0-9]{2}-[0-9]{4}/,
        validate: {
            validator: function () {
                return this.days_difference() > 0
            },
            message: 'from_date must be before to_date'
        }
    }
}, {
    methods: {
        getFromDate: function () {
            let from_day = this.from_date.split("-")[0]
            let from_month = this.from_date.split("-")[1] - 1// months are 0-based
            let from_year = this.from_date.split("-")[2]

            return new Date(from_year, from_month, from_day)
        },
        getToDate: function () {
            let to_day = this.to_date.split("-")[0]
            let to_month = this.to_date.split("-")[1] - 1// months are 0-based
            let to_year = this.to_date.split("-")[2]

            return new Date(to_year, to_month, to_day)
        }
    }
})

createBookingRequestSchema.methods.calculatePrice = async function () {


    // get amount of days between from_date and to_date
    let days_difference = this.days_difference()


    let vehicle = await vehicleController.getVehicle(this.number_plate)

    return vehicle.price * days_difference

}

createBookingRequestSchema.methods.createBooking = async function () {

    let booking = {
        booker_id: this.booker_id,
        number_plate: this.number_plate,
        from_date: this.getFromDate(),
        to_date: this.getToDate(),
        price: await this.calculatePrice()
    }

    return booking
}

createBookingRequestSchema.methods.days_difference = function () {
    let time_difference = this.getToDate().getTime() - this.getFromDate().getTime()
    let days_difference = time_difference / (1000 * 3600 * 24)

    return days_difference
}


export default mongoose.model('CreateBookingRequest', createBookingRequestSchema)