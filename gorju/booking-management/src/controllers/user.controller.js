import axios from "axios";

function getUser(id) {
    return new Promise((resolve, reject) => {
        axios.get(process.env.USER_API_URL + id).then((response) => {
            if (response.status === 200)
                return resolve(response.data)
            else
                return reject({ code: 404, data: "User not found" })
        })
    })
}

export default { getUser }