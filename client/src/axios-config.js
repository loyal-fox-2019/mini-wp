'use strict'

import axios from 'axios'

const axiosInstance = axios.create({
    
    baseURL: 'https://mini-wp-server.prograami.com'
})

export default axiosInstance