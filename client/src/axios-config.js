'use strict'

import axios from 'axios'

const axiosInstance = axios.create({
    // baseURL: 'https://mini-wp-server.prograami.com'
    baseURL: 'http://localhost'
})

export default axiosInstance