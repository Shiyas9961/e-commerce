import axios from 'axios'

export const privateAxios = axios.create({
    headers : {
        'Content-Type' : 'application/json'
    },
    withCredentials : true
})