import axios from 'axios'

export default axios.create({
    baseURL: 'http://localhost:3000'
    // baseURL: 'ec2-3-0-182-128.ap-southeast-1.compute.amazonaws.com'
})