const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const User = require('./src/models/User')

require('dotenv').config()


const app = express()
app.use(express.json())
app.use(cors())

//  Initialise database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database.'))


app.post('/users', (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
  user.save().then(() => {
    res.send('User created.')
  }).catch((error) => {
    res.status(400).send(error)
  })

})


// Start server
app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}.`))
