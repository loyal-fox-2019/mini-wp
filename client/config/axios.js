import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://35.224.129.40:3000'
})


export default instance