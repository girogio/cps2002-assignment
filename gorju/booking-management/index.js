
express = require('express')
mongoose = require('mongoose')
cors = require('cors')
dotenv = require('dotenv')

const app = express()
const db = mongoose.connection

dotenv.config()

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
db.on('error', (error) => console.error(error))

app.use('/api/booking', require('./routes/bookings.js'))

app.listen(process.env.SERVICE_PORT, () => console.log('Server started on port ' + process.env.SERVICE_PORT))
db.once('open', () => console.log('Connected to database.' ))
