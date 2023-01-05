import axios from 'axios'

function getVehicle(number_plate) {
    return new Promise((resolve, reject) => {
        axios.get(process.env.VEHICLE_API_URL + number_plate).then((response) => {
            console.log(response.data)
            console.log(response.status)
            if (response.status === 200)
                return resolve(response.data.vehicles[0])
            else
                return reject({ code: 404, data: "Vehicle not found" })
        }).catch((err) => {
            console.log(err)
            return reject({ code: 404, data: "Vehicle not found" })
        })
    })
}

export default { getVehicle }