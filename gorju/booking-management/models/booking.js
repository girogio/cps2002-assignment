const { default: axios } = require('axios')
const { response } = require('express')
const mongoose  = require('mongoose')

const Schema = mongoose.Schema

const bookingSchema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    number_plates: {
        type: [String],
        required: true
    },
    date_created: {
        type: Date,
        required: true,
        default: Date.now
    },
    
})

bookingSchema.methods.calc = function() {
      for(let i = 0; i < this.number_plates.length; i++) {
        // axios.get('http://localhost:3000/api/vehicle/' + this.number_plates[i])
        // .then(response => {
        //     console.log(response.data)
        // })
        // .catch(err => {
        //     console.log(err)
        // })
        console.log(this.number_plates[i])
    }
}

module.exports = mongoose.model('Booking', bookingSchema)
