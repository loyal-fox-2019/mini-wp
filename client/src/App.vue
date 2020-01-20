<template>
    <div>
        <LandingPage v-show="!isLogin" v-on:userLogin="login" v-on:userRegister="register" v-on:hasLoggedIn="googleSign"></LandingPage>
        <div id="main-page" v-show="isLogin">
            <Header v-show="isLogin" v-on:logout="logout"></Header>
             <!-- CONTENT! -->
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-2" style="padding: 0;">
                        <Sidebar v-on:writePage="write" v-on:blogPost="post"></Sidebar>
                    </div>
                    <div class="col-md-10 overflow-auto" id="right-content">
                        <MainPage v-show="isArticle" :articleList="articleList" v-on:deletePost="deletePost" v-on:viewEdit="viewEdit" v-on:fullArticle="getFullArticle"></MainPage>
                        <WritePage v-show="isWrite" v-on:article="getArticle"></WritePage>
                        <EditForm v-if="editArticle !== null" :editArticle="editArticle" v-on:doneEdit="doneEdit"></EditForm>
                        <FullArticle v-show="fullArticle" :fullArticle="fullArticle"></FullArticle>
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
import EditForm from './components/EditForm'
import FullArticle from './components/FullArticle'

const BASE_URL = 'http://localhost:3000'

export default {
    name: 'app',
    data() {
        return {
            isLogin: false,
            errStatus: null,
            isArticle: false,
            isWrite: false,
            articleList: [],
            editArticle: null,
            fullArticle: false
        }
    },
    components: {
        LandingPage,
        Header,
        Sidebar,
        MainPage,
        WritePage,
        EditForm,
        FullArticle
    },
    methods: {
        login: function(data){
            console.log(data)
            const login = {
                email: data.email,
                password: data.password
            }
            axios.post(`${BASE_URL}/user/login`, login)
                .then(res => {
                    console.log('Login Berhasil', res)
                    localStorage.setItem('token', res.data.token)
                    this.isLogin = true
                    this.isArticle = true
                    this.fetchArticle()
                })
                .catch(err => {
                    console.log(err.response)
                })
        },
        register: function(data){
            console.log('Hello')
            let reg = {
                name: data.name,
                email: data.email,
                password: data.password
            }
            axios.post(`${BASE_URL}/user/register`, reg)
                .then(res => {
                    console.log('Register Berhasil', res)
                    const loginData = res.data.data
                    console.log(loginData)
                    return this.login({email: reg.email, password: reg.password})
                })
                .catch(err => {
                    console.log(err)
                })
        },
        logout: function(){
            this.isLogin = false
            localStorage.removeItem('token')
            location.reload()
        },
        write: function(){
            this.isArticle = false
            this.isWrite = true
        },
        getArticle: function(val){
            if(val){
                this.isWrite = false
                this.isArticle = true
                return this.fetchArticle()
            }
        },
        getFullArticle: function(val){
            this.fullArticle = val
            this.isArticle = false
        },
        post: function(){
            this.isArticle = true
            this.isWrite = false
            this.fullArticle = false
        },
        fetchArticle: function(){
            let newData = this
            axios.get(`${BASE_URL}/article`, {headers: {token: localStorage.getItem('token')}})
                .then(results => {
                    newData.articleList = results.data
                })
                .catch(err => {
                    console.log(err)
                })
        },
        deletePost: function(id){
            axios.delete(`${BASE_URL}/article/${id}`, {headers: {token: localStorage.getItem('token')}})
                .then(res => {
                    console.log('data deleted', res)
                    this.fetchArticle()
                })
                .catch(err => {
                    console.log(err)
                })
        },
        viewEdit: function(val){
            console.log(val)
            if(val){
                this.editArticle = val
                this.isArticle = false
            }else{
                this.editArticle = null
            }
        },
        doneEdit: function(){
            this.fetchArticle()
            this.isArticle = true
            this.editArticle = null
        },
        googleSign: function(){
            this.isLogin = true
            this.isArticle = true
            this.fetchArticle()
        }
    },
    created() {
        if(localStorage.getItem('token')){
            this.isLogin = true
            this.isArticle = true
            this.fetchArticle()
        }else{
            this.isLogin = false
        }
    }
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