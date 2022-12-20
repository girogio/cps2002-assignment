const express = require('express')
const router = express.Router()

const Booking = require('../models/booking')
const booking = require('../models/booking')

router.post('/', async (req, res) => {
    const booking = new Booking({
        user_id: req.body.user_id,
        number_plates: req.body.number_plates
    })
    try {
        const newBooking = await booking.save()
        res.status(201).json(newBooking)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.head('/', async (req, res) => {
    //find user from id

   Booking.findOne({ user_id: req.body.user_id }, (err, bookings) => {
    console.log(bookings)
    bookings.calc()
   })
    
})

module.exports = router