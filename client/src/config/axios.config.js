const axios = require('axios')

let instance = axios.create({
  baseURL: 'http://52.221.236.249'
})

module.exports = instance