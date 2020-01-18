<template>
    <div>
        <NavBar @sideBarToggle="sideBarToggler($event)" @subMenuToggle="writeToggler" :logStat="isLogin"></NavBar>
        <!-- Main Part -->
        <b-container fluid class="custom-main-content" id="mainContainer">
            <div class="row">
                <SideBar :sideStat="sideBar" @subMenuToggle="subMenuToggler($event)" v-if="isLogin"></SideBar>

                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4 custom-main" v-if="isLogin">
                    <MainContent :selectedSub="contentSub"></MainContent>
                </main>
            </div>

            <logForm v-if="!isLogin"></logForm>

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
            contentSub: '',
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
    methods:{  
        sideBarToggler(side){
            this.sideBar = side
        },
        subMenuToggler(sub){
            this.contentSub = sub
        },
        writeToggler(write){
            this.contentSub = write
        }
    }
}
</script>

<style>
    .custom-main-content {
            padding: 0% !important;
            height: 90vh;
        }
    #mainContainer {
        background-color: #ddf7fa
    }
</style>