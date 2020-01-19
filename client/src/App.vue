<template>
    <div>
        <mainpage v-show="userToken" v-on:user-signout="signedOut($event)" :data="allArticles"></mainpage>
        <login 
            v-show="loginform" 
            v-on:login-success="loginSuccess($event)"
            v-on:show-register="switchForm($event)"
            ></login>
        <registration 
            v-on:switchto-login="switchForm($event)" 
            v-show="!userToken && !loginform"
            v-on:regist-success="registrationSuccess($event)"
            >
        </registration>
    </div>
</template>

<script>
import boostrap from 'bootstrap'
import axios from 'axios'
import mainpage from './components/mainPage'
import login from './components/Login'
import registration from './components/Registration'
export default {
    name: 'App',
    components: {
        mainpage,
        login,
        registration
    },
    created(){
        if(localStorage.getItem('token')){
            this.userToken = localStorage.getItem('token')
            this.getArticles(this.userToken)
        }
    },
    data(){
        return{
            loginform: false,
            userToken: '',
            allArticles: ''
        }
    },
    methods:{
        getArticles(token){
            axios({
                method:'get',
                url: 'http://localhost:3000/articles',
                headers:{
                    token: token
                }
            })
            .then(({data})=>{
                // console.log('masuk created', data.result)
                this.allArticles = data.result
            })
            .catch(err=>{
                console.log(err)
            })
        },
        signedOut(event){
            this.loginform = true
            this.userToken = null
        },
        switchForm(event){
            if(this.loginform){
                this.loginform = false
            }else{
                this.loginform = event
            }
        },
        registrationSuccess(event){
            this.userToken = localStorage.getItem('token')
            this.getArticles(this.userToken)
        },
        loginSuccess(event){
            this.userToken = localStorage.getItem('token')
            this.getArticles(this.userToken)
        }
    }
}
</script>

<style>

</style>