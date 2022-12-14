import Booking from '../models/objects/booking.model.js'
import CreateBookingRequest from '../models/web/createBookingRequest.js'
import vehicleController from './vehicle.controller.js';
import { StatusCodes } from 'http-status-codes';

const getAllBookings = () => {
  return new Promise((resolve, reject) => {
    Booking.find().then((bookings) => {
      resolve(bookings)
    }).catch((error) => {
      reject({ code: StatusCodes.SERVICE_UNAVAILABLE, data: error })
    })
  })
}

// get calendar of all vehicles in the database
const getCalendar = () => {
  return new Promise((resolve, reject) => {
    Booking.find().then((bookings) => {

      // sort by number plate
      bookings.sort((a, b) => {
        return a.number_plate.localeCompare(b.number_plate)
      })

      // create calendar object
      let calendar = {}
      let currentNumberPlate = ""
      let currentBookings = []

      // loop through bookings
      bookings.forEach((booking) => {
        // if number plate is different, add current number plate to calendar
        if (currentNumberPlate !== booking.number_plate) {
          if (currentNumberPlate !== "") {
            calendar[currentNumberPlate] = currentBookings
          }
          currentNumberPlate = booking.number_plate
          currentBookings = []
        }
        // add booking to current bookings
        currentBookings.push({ from_date: booking.from_date, to_date: booking.to_date })
      })
      // add last number plate to calendar
      calendar[currentNumberPlate] = currentBookings
      resolve(calendar)
    })
  })
}

const createBooking = (request) => {
  return new Promise(async (resolve, reject) => {

    // create request object
    let createBookingRequest = new CreateBookingRequest(request)

    // validate request
    createBookingRequest.validate((error) => {
      if (error) {
        return reject({ code: StatusCodes.BAD_REQUEST, data: error.message })
      }
    })

    vehicleController.getVehicle().then((vehicle) => {
      if (!vehicle.available) {
        return reject({ code: StatusCodes.BAD_REQUEST, data: 'Vehicle is not available' })
      }
    })


    // create booking object
    let booking
    try {
      booking = new Booking(await createBookingRequest.createBooking())
    } catch (error) {
      // if error is thrown, price of vehicle not found -> vehicle not found
      return reject({ code: StatusCodes.NOT_FOUND, data: "Vehicle has not been found." })
    }

    //check if dates of same number plate have no overlap
    let bookings = await Booking.find({
      number_plate: booking.number_plate,
      from_date: { $lte: booking.to_date },
      to_date: { $gte: booking.from_date },
    })

    // if overlap, reject
    if (bookings.length > 0) {
      reject({ code: StatusCodes.BAD_REQUEST, data: 'Dates overlap with existing bookings' })
    } else {
      // else, save booking and resolve
      booking.save().then((booking) => {
        resolve({ code: StatusCodes.CREATED, data: booking._id })
      })
    }
  })
}

const getBookingById = (id) => {
  return new Promise((resolve, reject) => {
    Booking.findById(id).then((booking) => {
      if (booking === null)
        reject({ code: StatusCodes.NOT_FOUND, data: "Booking not found." })
      else
        resolve(booking)
    }).catch(() => {
      reject({ code: StatusCodes.NOT_FOUND, data: "Booking not found." })
    })
  })
}

const fulfillBookingById = (id) => {
  return new Promise((resolve, reject) => {
    Booking.findById(id).then((booking) => {
      if (booking.paid === false) {
        booking.pay().then((response) => {
          return resolve(response)
        }).catch((error) => {
          return reject(error)
        })
      } else {
        return reject({ code: StatusCodes.BAD_REQUEST, data: "Booking has already been paid." })
      }
    }).catch(() => {
      reject({ code: StatusCodes.NOT_FOUND, data: "Booking not found." })
    })
  })
}

export default { getCalendar, getAllBookings, createBooking, getBookingById, fulfillBookingById }