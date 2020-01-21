<template>
  <div>
    <Navbar 
    v-bind:page="page" 
    v-show="showNavbar" 
    v-on:changePageAfterLogin="changePageAfterLogin($event)"
    v-on:changePageToCreateArticle="toCreateArticle()"
    v-on:logout="logout()"></Navbar>
    <LoginRegisterForm
    v-show="showLoginRegisterForm"
    v-bind:page="page" 
    v-on:changePage="loginRegister($event)"
    v-on:login="login($event)"
    v-on:register="register($event)"></LoginRegisterForm>
    <Home v-show="showHome"></Home>
    <Article v-show="showArticle" v-bind:articles="articles" v-on:toEditPage="toEditPage($event)" v-on:deleteArticle="deleteArticle($event)"></Article>
    <createArticle v-show="showCreateArticle" v-on:backToArticle="backToArticle()"></createArticle>
    <updateArticle v-show="showUpdateArticle" v-bind:article="article" v-on:updateSuccess="backToArticle()"></updateArticle>
  </div>
</template>

<script>
import LoginRegisterForm from './components/login-register-form';
import Navbar from './components/navbar';
import Home from './components/home';
import Article from './components/article';
import createArticle from './components/create-article';
import updateArticle from './components/update-article';
import axios from 'axios';
import swal from 'sweetalert2';
export default {
    components: {
        LoginRegisterForm,
        Navbar,
        Home,
        Article,
        createArticle,
        updateArticle
    },
    created() {
        const userToken = localStorage.getItem('usertoken')
        if(!userToken) {
            this.page = 'login',
            this.showNavbar = false;
            this.showLoginRegisterForm = true;
        } else {
            this.page = 'home',
            this.showNavbar = true;
            this.showLoginRegisterForm = false;
            this.getArticles();
        }
    },
    data: function() {
        return {
            page: 'login',
            showNavbar: false,
            showLoginRegisterForm: true,
            showHome: true,
            showArticle: false,
            showCreateArticle: false,
            showUpdateArticle: false,
            articles: [],
            article: {}

        }
    },
    methods: {
        //Move between register and login page
        loginRegister: function(value) {
            this.page = value;
        },
        //Login User
        login: function(value) {
            axios({
                method: 'post',
                url: 'http://localhost:3000/user/privateAuth',
                data: {
                    email: value.email,
                    password: value.password
                }
            })
            .then(response => {
                localStorage.setItem('usertoken', response.data.data);
                this.showLoginRegisterForm = false;
                this.showNavbar = true;
                this.page = 'home';
            })
            .catch(error => {
                const errorResponse = {error};
                const errorMessage = errorResponse.error.response.data.errors;
                swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: `${errorMessage}`
                })
            })
            },
        //Register User
        register: function(value) {
            axios({
                method: 'post',
                url: 'http://localhost:3000/user/register',
                data: {
                    email: value.email,
                    name: value.name,
                    password: value.password
                }
            })
            .then(response => {
                return axios({
                    method: 'post',
                    url: 'http://localhost:3000/user/privateAuth',
                    data: {
                        email: value.email,
                        password: value.password
                    }
                })
            })
            .then(response => {
                localStorage.setItem('usertoken', response.data.data);
                this.showLoginRegisterForm = false;
                this.showNavbar = true;
                this.page = 'home';
            })
            .catch(error => {
                const errorResponse = {error};
                let errorMessage;
                if(Array.isArray(errorResponse.error.response.data.errors)) {
                    errorMessage = errorResponse.error.response.data.errors[0]
                    swal.fire({
                        icon: 'error',
                        title: 'Register Failed',
                        text: `${errorMessage}`
                    })
                } else {
                    errorMessage = errorResponse.error.response.data.errors;
                    swal.fire({
                        icon: 'error',
                        title: 'Register Failed',
                        text: `${errorMessage}`
                    })
                }
            })
            },
            //Move pages between Home and Article
            changePageAfterLogin: function(event) {
                this.page = event
                if(this.page === 'home') {
                    this.showHome = true;
                    this.showArticle = false;
                    this.showCreateArticle = false;
                    this.showUpdateArticle = false;
                } else if(this.page === 'article') {
                    this.showHome = false;
                    this.showArticle = true;
                    this.showCreateArticle = false;
                    this.showUpdateArticle = false;
                }
            },
            //Move to create Article
            toCreateArticle: function() {
                this.showHome = false;
                this.showArticle = false;
                this.showCreateArticle = true;
                this.showUpdateArticle = false;
            },
            backToArticle: function() {
                this.getArticles();
                this.showArticle = true;
                this.showCreateArticle = false;
                this.showUpdateArticle = false;
            },
            getArticles: function() {
                axios({
                    method: 'get',
                    url: 'http://localhost:3000/article',
                    headers: {
                        usertoken: localStorage.getItem('usertoken')
                    }
                })
                .then(articles => {
                    this.articles = articles.data.data
                })
                .catch(error => {
                    console.log({error})
                })
            },
            toEditPage: function(event) {
                axios({
                    method: 'get',
                    url: `http://localhost:3000/article/findOne/${event}`,
                    headers: {
                        usertoken: localStorage.getItem('usertoken')
                    }
                })
                .then(article => {
                    this.showUpdateArticle = true;
                    this.showArticle = false;
                    this.article = article.data.data;
                })
                .catch(error => {
                    console.log({error});
                })
            },
            deleteArticle: function(event) {
                axios({
                    method: 'delete',
                    url: `http://localhost:3000/article/${event}`,
                    headers: {
                        usertoken: localStorage.getItem('usertoken')
                    }
                })
                .then(response => {
                    this.backToArticle()
                })
                .catch(error => {
                    console.log({error});
                })
            },
            logout: function() {
                localStorage.clear()
                this.page = 'login';
                this.showNavbar = false;
                this.showHome = false;
                this.showArticle = false;
                this.showCreateArticle = false;
                this.showUpdateArticle = false;
                this.showLoginRegisterForm = true;
            }
        }
    }
</script>

<style>
    
</style>