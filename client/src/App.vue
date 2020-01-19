<template>
    <div>
        <LandingPage v-show="!isLogin" v-on:userLogin="login" v-on:userRegister="register"></LandingPage>
        <div id="main-page" v-show="isLogin">
            <Header v-show="isLogin" v-on:logout="logout"></Header>
             <!-- CONTENT! -->
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-2" style="padding: 0;">
                        <Sidebar v-on:writePage="write" v-on:blogPost="post"></Sidebar>
                    </div>
                    <div class="col-md-10 overflow-auto" id="right-content">
                        <MainPage v-show="isArticle"></MainPage>
                        <WritePage v-show="isWrite" v-on:article="getArticle"></WritePage>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Header from './components/Header'
import LandingPage from './components/LandingPage'
import Sidebar from './components/Sidebar'
import MainPage from './components/MainPage'
import WritePage from './components/WritePage'

const BASE_URL = 'http://localhost:3000'

export default {
    name: 'app',
    data() {
        return {
            isLogin: true,
            errStatus: null,
            isArticle: true,
            isWrite: false,
            articleList: []
        }
    },
    components: {
        LandingPage,
        Header,
        Sidebar,
        MainPage,
        WritePage
    },
    methods: {
        login: function(data){
            axios.post(`${BASE_URL}/user/login`, data)
                .then(res => {
                    console.log('Login Berhasil', res)
                    localStorage.setItem('token', res.data.token)
                    this.isLogin = true
                    this.isArticle = true
                })
                .catch(err => {
                    console.log(err)
                })
        },
        register: function(data){
            let reg = {
                name: data.name,
                email: data.email,
                password: data.password
            }
            axios.post(`${BASE_URL}/user/register`, reg)
                .then(res => {
                    console.log('Register Berhasil', res)
                    this.login
                })
                .catch(err => {
                    console.log(err)
                })
        },
        logout: function(){
            this.isLogin = false
            localStorage.removeItem('token')
        },
        write: function(){
            this.isArticle = false
            this.isWrite = true
        },
        getArticle: function(val){
            this.articleList.push(val)
        },
        post: function(){
            this.isArticle = true
            this.isWrite = false
        }
    },
    computed: {
        getAll: function(){
            let newData = this
            axios.get(`${BASE_URL}/article`, {headers: {token: localStorage.getItem('token')}})
                .then(results => {
                    console.log(results.data)
                    newData.articleList = results.data
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    created() {
        if(localStorage.getItem('token')){
            this.isLogin = true
            let newData = this
            axios.get(`${BASE_URL}/article`, {headers: {token: localStorage.getItem('token')}})
                .then(results => {
                    console.log(results.data)
                    newData.articleList = results.data
                    newData.archive = results.data
                })
                .catch(err => {
                    console.log(err)
                })
        }else{
            this.isLogin = false
        }
    },
}
</script>

<style lang="css" scoped>
    #left-content{
        position: fixed;
        border: 2px solid black;
        width: 100%;
        height: 100%;
    }
    #right-content{
        max-height: 95vh;
        max-width: 100%;
    }
</style>