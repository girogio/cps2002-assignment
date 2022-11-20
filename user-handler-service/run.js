
express = require('express')
mongoose = require('mongoose')
cors = require('cors')
dotenv = require('dotenv')

const app = express()
const db = mongoose.connection

dotenv.config()
console.log(process.env);

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
db.on('error', (error) => console.error(error))

app.use('/api/users', require('./src/routes/userRoute.js'))
app.listen(process.env.SERVICE_PORT, () => console.log('Server started on port ' + process.env.SERVICE_PORT))
db.once('open', () => console.log('Connected to database.' ))
