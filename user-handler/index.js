const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv').config()


const app = express()
app.use(express.json())
app.use(cors())

//  Initialise database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database.'))


// Routes

// Start server
app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}.`))
