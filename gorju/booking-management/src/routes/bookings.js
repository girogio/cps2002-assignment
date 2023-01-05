import express from 'express'
import { StatusCodes } from 'http-status-codes';
import bookingController from '../controllers/booking.controller.js'


const router = express.Router()


// get all bookings
router.get('/', async (req, res) => {
    bookingController.getAllBookings().then((bookings) => {
        res.status(StatusCodes.OK).json({bookings: bookings})
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
    bookingController.getCalendar().then((calendar) => {
        res.status(StatusCodes.OK).json(calendar[req.params.number_plate])
    }).catch((error) => {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    })
})

// create a booking
router.post('/', async (req, res) => {
    bookingController.createBooking(req.body).then((response) => {
        res.status(response.code).json({ success: true, booking_id: response.data })
    }).catch((error) => {
        res.status(error.code).json({ success: false, message: error.data })
    })
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
    bookingController.fulfillBookingById(req.params.id).then((response) => {
        res.status(response.code).json({ success: true, message: response.data })
    }).catch((error) => {
        res.status(error.code).json({ success: false, message: error.data })
    })
})

// update a booking by id
router.put('/:id', async (req, res) => {
    bookingController.updateBookingById(req.params.id, req.body).then(() => {
        res.status(StatusCodes.NO_CONTENT).json()
    }).catch((error) => {
        res.status(error.code).json({ success: false, message: error.data })
    })
})


export default router