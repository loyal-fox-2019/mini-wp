import axios from 'axios';

const baseURLProd = 'http://35.184.99.60:3000';
const baseURLDev = 'http://localhost:3000';

const instance = axios.create({
    baseURL: baseURLDev
});

module.exports = {
    instance
};