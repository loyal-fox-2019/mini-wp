import axios from 'axios'

const instance = axios.create({
  // baseURL: 'http://localhost:80'
  baseURL: 'https://servercms.amilhasbala.com'
})

export default instance