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
            @switchToFilterResultPage="switchToFilterResultPage"
            @logOut="changeIsLogin"
            class="sticky-top">
        </navBar>

        <contentPage 
            v-if="isLogin && showPage ==='contentPage'" 
            :loggedInUserDetail="loggedInUserDetail"
            :allArticlesArray="allArticlesArray"
            @switchToArticlePage="switchToArticlePage"
            @switchToUserContentPage="switchToUserContentPage"
            @switchToFilterResultPage=switchToFilterResultPage>
        </contentPage>

        <articlePage
            v-if="showPage === 'articlePage'"
            :articlePageMode="articlePageMode"
            @goBack="backFromChild1Page">
        </articlePage>

        <userContentPage
            v-if="showPage === 'userContentPage'"
            :userContentPageUsername = "userContentPageUsername"
            @goBack="backFromChild1Page">
        </userContentPage>

        <userProfilePage
            v-if="showPage === 'userProfilePage'"
            :loggedInUserDetail="loggedInUserDetail"
            @goBack="backFromChild1Page">
        </userProfilePage>

        <filterResultPage
            v-if="showPage === 'filterResultPage'"
            :searchPayload="searchPayload"
            @goBack="backFromChild1Page">
        </filterResultPage>

        

        

        
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
import filterResultPage from './filterResultPage'

export default {
    name: 'mainPage',
    components:{
        navBar,
        homePage,
        contentPage,
        articlePage,
        userProfilePage,
        userContentPage,
        filterResultPage
    },
    data(){
        return{
            isLogin: false,
            showPage: 'homePage',
            loggedInUserDetail: '',
            allArticlesArray: [],
            articlePageMode: '',
            userContentPageUsername : '',
            searchPayload:{}
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
        setAllArticlesArray(articles){
            this.allArticlesArray = articles
            // console.log(' allArticlesArray @setAllArticlesArray -mainPage.vue \n======================\n', this.allArticlesArray)
        },
        setArticlePageMode(mode){
            this.articlePageMode = mode
        },
        setUserContentPageUsername(username){
            this.userContentPageUsername = username
        },
        setSearchPayload(payload){
            this.searchPayload = payload
        },
        //other methods
        changeIsLogin(status){
            this.setIsLogin(status)

            if(status)
              {
                this.fetchUserDetail()
                this.fetchAllArticles()
                this.setShowPage('contentPage')
              }
            else
              {
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
            axios({
                method: 'get',
                url: '/articles/all',
                headers:{
                    token: localStorage.getItem('token')
                }
            })
            .then( ({data})=>{
                this.setAllArticlesArray(data)
            })
            .catch( ({response})=>{
                console.log(`error @fetchAllArticle - mainPage.vue \n=========================================\n`, response.data.message)
                Swal.fire(
                    "Error",
                    response.data.message,
                    'error'
                )
            })
        },
        switchToUserProfilePage(userId){
            this.setShowPage('userProfilePage')
        },
        switchToArticlePage(mode){
            this.setArticlePageMode(mode)
            this.setShowPage('articlePage')
        },
        switchToUserContentPage(username){
            this.setUserContentPageUsername(username)
            this.setShowPage('userContentPage')
        },
        switchToFilterResultPage(payload){
            this.setSearchPayload(payload)
            this.setShowPage('filterResultPage')
        },
        backFromChild1Page(page){
            this.fetchUserDetail()
            this.fetchAllArticles()
            this.setShowPage(page)
        },
        
    },
    created: function(){
        if(localStorage.getItem('token'))
          {
              this.changeIsLogin(true) 
            //   this.fetchUserDetail()
            //   this.fetchAllArticles()
          }
     
    }
}
</script>



<style scoped>
#mainPage{
    height: fit-content
}
</style>