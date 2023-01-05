import express from 'express'
import { StatusCodes } from 'http-status-codes';
import bookingController from '../controllers/booking.controller.js'


const router = express.Router()


// get all bookings
router.get('/', async (req, res) => {
    bookingController.getAllBookings().then((bookings) => {
        res.status(StatusCodes.OK).json({ bookings: bookings })
    }).catch((error) => {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    })
})

router.get('/calendar', async (req, res) => {
    bookingController.getCalendar().then((calendar) => {
        res.status(StatusCodes.OK).json(calendar)
    }).catch((error) => {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    })
})

router.get('/calendar/:number_plate', async (req, res) => {

    if (req.params.number_plate == undefined) {
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: "Bad request, number_plate is required" })
        return
    } else if (req.params.number_plate.length != 6) {
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: "Bad request,  invalid number_plate" })
        return
    }

    bookingController.getCalendar().then((calendar) => {
        res.status(StatusCodes.OK).json(calendar[req.params.number_plate])
        return
    }).catch((error) => {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
        return
    })
})

// create a booking
router.post('/', async (req, res) => {

    if (req.body.booker_id == undefined) {
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: "Bad request, booker_id is required" })
    } else if (req.body.number_plate == undefined) {
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: "Bad request, number_plate is required" })
    } else if (req.body.from_date == undefined) {
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: "Bad request, from_date is required" })
    } else if (req.body.to_date == undefined) {
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: "Bad request, to_date is required" })
    } else {
        bookingController.createBooking(req.body).then((response) => {
            res.status(response.code).json({ success: true, booking_id: response.data })
        }).catch((error) => {
            res.status(error.code).json({ success: false, message: error.data })
        })
    }
})

// get a booking by id
router.get('/:id', async (req, res) => {
    bookingController.getBookingById(req.params.id).then((booking) => {
        res.status(StatusCodes.OK).json([booking])
    }).catch((error) => {
        res.status(error.code).json({ success: false, message: error.data })
    })
})

// delete a booking by id
router.delete('/:id', async (req, res) => {

    if (req.params.id == undefined) {
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: "Bad request, booking id is required" })
        return
    }

    bookingController.fulfillBookingById(req.params.id).then((response) => {
        res.status(response.code).json({ success: true, message: response.data })
    }).catch((error) => {
        res.status(error.code).json({ success: false, message: error.data })
    })
})

export default router