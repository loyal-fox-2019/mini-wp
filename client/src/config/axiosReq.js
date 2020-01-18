import axios from 'axios';

const axiosReq = axios.create({
    baseURL: 'http://localhost:3000'
});

module.exports = axiosReq;