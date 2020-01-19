import axios from 'axios'

const server = axios.create({
  baseURL: `http://localhost:3000`
  // baseURL: `http://server-miniwp.nuelpan.com/`  
})

export default server