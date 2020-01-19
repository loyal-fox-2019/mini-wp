<template>
    <b-container fluid id="container">
        <b-row class="pt-5 pb-4" align-h="center">
            <h1><i class="fab fa-wordpress-simple fa-lg"></i> Mini WP</h1>
        </b-row>
        <b-row align-v="top" align-h="center" id="row">
            <b-col cols="5">
                <b-nav tabs fill>
                    <b-nav-item class="nav-item" @click="viewLogin">Login</b-nav-item>
                    <b-nav-item class="nav-item" @click="viewRegister">Register</b-nav-item>
                </b-nav>
                <div class="border border-top-0 rounded-bottom" id="isi">
                    <login v-if="showLogin" @logged="successLogin"></login>
                    <register v-if="showRegister" @registered="successLogin"></register>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import login from './login'
import register from './register'
export default {
    name: 'loginRegis',
    data(){
        return{
            showLogin: true,
            showRegister: false
        }
    },
    methods: {
        viewLogin: function(){
            this.showLogin = true
            this.showRegister = false
        },
        viewRegister: function(){
            this.showLogin = false
            this.showRegister = true
        },
        successLogin: function(){
            this.$emit('loggedIn')
        }
    },
    components: {
        login,
        register
    },
    mounted(){
        this.showLogin = true
        this.showRegister = false
    }
}
</script>

<style scoped>
    #container {
        height: 100vh;
        background-color: rgb(192, 198, 212);
    }

    .nav-item {
        font-size: 20px;
        font-weight: bold;
    }

    #row {
        height: 70vh;
    }
    
    #isi {
        background-color: rgb(157, 165, 175);
    }
</style>