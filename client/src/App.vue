<template>
    <div>
        <Header v-show="isLogin"></Header>
        <LandingPage v-show="!isLogin" v-on:userLogin="login" v-on:userRegister="register"></LandingPage>
    </div>
</template>

<script>
import axios from 'axios'
import Header from './components/Header'
import LandingPage from './components/LandingPage'

const BASE_URL = 'http://localhost:3000'

export default {
    name: 'app',
    data() {
        return {
            isLogin: false,
            errStatus: null
        }
    },
    components: {
        LandingPage,
        Header
    },
    methods: {
        login: function(data){
            axios.post(`${BASE_URL}/user/login`, data)
                .then(res => {
                    localStorage.setItem('token', res.token)
                    this.isLogin = true
                })
                .catch(err => {
                    console.log(err)
                    this.errStatus = err.response.status
                })
        }
    },
    created() {
        if(localStorage.getItem('token')){
            this.isLogin = true
        }else{
            this.isLogin = false
        }
    },
}
</script>

<style lang="css" scoped>

</style>