import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://miniwp-server.japhendywijaya.xyz:3000'
})


export default instance