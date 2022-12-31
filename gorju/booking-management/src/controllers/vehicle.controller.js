import axios from 'axios'

function getVehicle(number_plate) {
    return new Promise((resolve, reject) => {
        axios.get(process.env.VEHICLE_API_URL + number_plate).then((response) => {
            if (response.status === 200)
                return resolve(response.data)
            else
                return reject({ code: 404, data: "Vehicle not found" })
        })
    })
}

export default { getVehicle }