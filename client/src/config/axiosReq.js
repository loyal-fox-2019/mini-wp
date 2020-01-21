import axios from 'axios';

const axiosReq = axios.create({
    baseURL: 'http://35.247.134.77:3000'
});

module.exports = axiosReq;