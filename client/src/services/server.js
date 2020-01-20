import axios from 'axios'

const developmentURL = `http://localhost:3000`

const axiosInstance = axios.create({
   baseURL: `http://localhost:3000`,
   headers: {
      token: localStorage.token
   }
})

axiosInstance.interceptors.request.use(function(config) {
   config.headers.token = localStorage.token
   return config
})

export default axiosInstance