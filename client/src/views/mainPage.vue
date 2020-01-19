<template>
    <div id="mainPage"  class="divIdentifier">
        <homePage 
            v-if="showPage === 'homePage'" 
            @login="changeIsLogin" >
        </homePage>

        <navBar 
            v-if="isLogin" 
            :loggedInUserDetail="loggedInUserDetail"
            @backToHome="backFromChild1Page"
            @userProfile="switchToUserProfilePage"
            @createArticle="switchToArticlePage('createMode')"
            @myArticles="switchToUserContentPage"
            @logOut="changeIsLogin"
            class="sticky-top">
        </navBar>

        <contentPage 
            v-if="isLogin && showPage ==='contentPage'" 
            :loggedInUserDetail="loggedInUserDetail"
            @seeUserArticles="seeUserArticles">
        </contentPage>

        <articlePage
            v-if="showPage === 'articlePage'"
            :articlePageMode="articlePageMode"
            @goBack="backFromChild1Page">
        </articlePage>

        <userContentPage
            v-if="showPage === 'userContentPage'"
            @goBack="backFromChild1Page">
        </userContentPage>

        <userProfilePage
            v-if="showPage === 'userProfilePage'"
            :loggedInUserDetail="loggedInUserDetail"
            @goBack="backFromChild1Page">
        </userProfilePage>

        

        
    </div>
</template>



<script>
import axios from '../../config/axios'
import Swal from 'sweetalert2'

import navBar from '../components/navbar'
import homePage from './homePage'
import contentPage from './contentPage'
import articlePage from './articlePage'
import userProfilePage from './userProfilePage'
import userContentPage from './userContentPage'

export default {
    name: 'mainPage',
    components:{
        navBar,
        homePage,
        contentPage,
        articlePage,
        userProfilePage,
        userContentPage
    },
    data(){
        return{
            isLogin: false,
            showPage: 'homePage',
            loggedInUserDetail: '',
            articlePageMode: ''
        }
    },
    methods:{
        //setters
        setShowPage(page){
            this.showPage = page
        },
        setLoggedInUserDetail(data){
            this.loggedInUserDetail = data
        },
        setIsLogin(status){
            this.isLogin = status
        },
        setArticlePageMode(mode){
            this.articlePageMode = mode
        },
        //other methods
        changeIsLogin(status){
            if(status)
              {
                this.setIsLogin(status)
                this.fetchUserDetail()
                this.setShowPage('contentPage')
              }
            else
              {
                this.setIsLogin(status)
                this.setShowPage('homePage')
                Swal.fire(
                    'Log Out successfull',
                    `See you again ${this.loggedInUserDetail.username}`
                )
                this.setLoggedInUserDetail('')
              }
        },
        fetchUserDetail(){
            axios({
                method: 'get',
                url: '/users',
                headers: {
                    token : localStorage.getItem('token')
                }
            })
            .then( ({data})=>{
                this.setLoggedInUserDetail(data)
            })
            .catch( ({ response })=>{
                console.log('error log @fetchUserDetail - mainPage.vue\n=========================================\n', response.data.message)
                Swal.fire(
                    "Error",
                    response.data.message,
                    'error'
                )
            })
        },
        fetchAllArticles(){
            console.log(' \n======================\n FETCHING NEH, CERITANYA')
        },
        switchToUserProfilePage(userId){
            this.setShowPage('userProfilePage')
        },
        switchToArticlePage(mode){
            this.setArticlePageMode(mode)
            this.setShowPage('articlePage')
        },
        switchToUserContentPage(userId){
            console.log(`TCL: switchToUserContentPage -> userId`, userId)
            this.setShowPage('userContentPage')
        },
        backFromChild1Page(page){
            this.fetchUserDetail()
            this.fetchAllArticles()
            this.setShowPage(page)
        },
        seeUserArticles(payload){
            console.log('TCL\n ======================\n @mainPage.vue \n', payload)
            this.contentPage = 'userArticles'
        },
    },
    created: function(){
        if(localStorage.getItem('token'))
            this.changeIsLogin(true) 
     
    }
}
</script>



<style scoped>
#mainPage{
    height: fit-content
}
</style>