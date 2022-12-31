
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

const app = express()
const db = mongoose.connection

dotenv.config()

app.use(express.json())
app.use(cors())

mongoose.set('strictQuery', true)

if (process.env.NODE_ENV === 'development') {
    process.env.USER_API_URL = 'http://localhost:3001/api/users/'
    process.env.VEHICLE_API_URL = 'http://localhost:3002/api/vehicles/'
} else {
    process.env.USER_API_URL = 'http://user_app:3000/api/users/'
    process.env.VEHICLE_API_URL = 'http://vehicleapp:3002/api/vehicles/'
}

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
db.on('error', (error) => console.error(error))

import bookingRouter from './src/routes/bookings.js'
app.use('/api/bookings/', bookingRouter)

app.listen(process.env.SERVICE_PORT, () => console.log('Server started on port ' + process.env.SERVICE_PORT))
db.once('open', () => console.log('Connected to database.'))
