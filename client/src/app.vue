<template>
    <div>
        <NavBar @sideBarToggle="sideBarToggler($event)" @subMenuToggle="writeToggler" :logStat="isLogin" @loggedOut="userLoggedOut"></NavBar>
        <!-- Main Part -->
        <b-container fluid class="custom-main-content" id="mainContainer">
            <div class="row">
                <SideBar :sideStat="sideBar" @subMenuToggle="subMenuToggler($event, articles)" v-if="isLogin"></SideBar>

                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4 custom-main" v-if="isLogin">
                    <MainContent :selectedSub="webContent"></MainContent>
                </main>
            </div>

            <logForm v-if="!isLogin" @logged='userLogged'></logForm>

        </b-container>
        <!-- Main Part -->
        <Footer></Footer>
    </div>
  
</template>

<script>
import NavBar from './components/navBar'
import SideBar from './components/sideBar'
import Footer from './components/footer'
import MainContent from './components/content'
import logForm from './components/signIn'

export default {
    data(){
        return {
            sideBar: 'articles',
            webContent: {
                contentSub: '',
                articles: null
            },
            isLogin: false
        }
    },
    components:{
        NavBar,
        SideBar,
        Footer,
        MainContent,
        logForm
    },
    created(){
        if(localStorage.getItem('token')){
            this.isLogin = true
        }else{
            this.isLogin = false
        }
    },
    methods:{  
        sideBarToggler(side){
            this.sideBar = side
        },
        subMenuToggler(sub){
            this.webContent.contentSub = sub.sub
            this.webContent.articles = sub.articleDatas
        },
        writeToggler(write){
            this.webContent.contentSub = write
        },
        userLogged(){
            this.isLogin = true
        },
        userLoggedOut(){
            this.isLogin = false
        }
    }
}
</script>

<style>
    .custom-main-content {
            padding: 0% !important;
        }
    #mainContainer {
        background-color: #ddf7fa;
        height: 90vh;
    }
    .custom-main {
            height: 90vh;
            overflow-y: scroll;
        }
</style>