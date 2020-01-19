import axios from 'axios'

const server = axios.create({
  baseURL: `http://localhost:3000`
  // baseURL: `http://ec2-18-136-102-8.ap-southeast-1.compute.amazonaws.com`  
})

export default server