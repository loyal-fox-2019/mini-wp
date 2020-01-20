<template>
    <div class="whole-body h-100">

        <!--Navbar-->
        <nav id="nav" class="navbar navbar-expand-lg navbar-dark bg-dark">
            <button @click="getPublished" id="homeButton" class="btn-lg btn btn-dark">
                    <i class="fab fa-wordpress"></i>
                    MiniWordpress
            </button>

            <!--navbar list-->
            <div v-if="loggedIn===true" class="collapse navbar-collapse" id="navbarSupportedContent">

                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a @click="onDisplay = 'create-form'"
                            class="btn-lg btn btn-dark text-white"> <i class="fa fa-plus-circle"></i> New Post <span class="sr-only">(current)</span>
                        </a>
                        <a @click="getDrafts" class="btn-lg btn btn-dark text-white"> <i class="fa fa-pencil-ruler"></i> Drafts <span class="sr-only">(current)</span></a>
                    </li>
                </ul>

                <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-secondary my-2 my-sm-0" type="submit">Search</button>
                <button @click="logout" class="btn btn-outline-secondary my-2 my-sm-0 ml-2" type="submit">Logout</button>
                </form>
            </div>
        </nav>
        <!--Navbar-->

        <!--user sign in-->
        <loginPage @loginSuccessful="loginSuccessful" v-if="loggedIn===false"></loginPage>

        <!--if loggedIn-->
        <div id="main-page" v-if="loggedIn" class="row">

            <!--left pane toolbar-->
            <div v-if="loggedIn===true" class='col-2'>

                <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">

                    <a @click="getPublished" 
                        class="nav-link m-2 mt-3 btn-dark text-white" 
                        id="v-pills-home-tab" 
                        data-toggle="pill" 
                        role="tab" 
                        aria-controls="v-pills-home" 
                        aria-selected="true"><i class="fa fa-stream"></i> timeline
                    </a>

                    <a @click="getYourPosts"
                        class="nav-link m-2 btn-dark text-white" 
                        id="v-pills-settings-tab" 
                        data-toggle="pill" 
                        role="tab" 
                        aria-controls="v-pills-settings" 
                        aria-selected="false"> <i class="fa fa-address-card"></i> your posts
                    </a>

                </div>
            </div>
            <!--left pane toolbar-->

            <div v-if="loggedIn===true" class='col-10 overflow-hidden'>
                <div id="content-area">

                    <deleteConfirmation :id="id" v-if="confirmDelete" @done="closeDelete"></deleteConfirmation>

                    <articleContent 
                        v-if="onDisplay==='article-content'"
                        v-for="(content,i) in contents" :key="i" 

                        @tagSearch="tagSearch" 
                        @confirmDelete="showDeleteModal" 
                        @updateArticle="updateArticle"

                        :content="content"
                        :id="id">
                     </articleContent>

                    <createForm @uploaded="getPublished" v-if="onDisplay==='create-form'"></createForm>

                    <updateForm @uploaded="getPublished" :id="id" v-if="onDisplay==='update-form'"></updateForm>

                </div>
            </div>

        </div>

    </div>
</template>

<script>
import articleContent from "./components/articleContent";
import createForm from "./components/createForm";
import updateForm from "./components/updateForm";
import deleteConfirmation from "./components/deleteConfirmation"
import loginPage from "./components/loginPage"
import axios from 'axios'

export default {
    name : "App",
    components : {
        articleContent,
        createForm,
        updateForm,
        deleteConfirmation,
        loginPage
    },
    data(){
        return{
            loggedIn : false,
            onDisplay : 'article-content',
            contents : [],
            confirmDelete : false,
            id : '',
            author : localStorage.author
        }
    },
    methods : {

        loginSuccessful(){
            console.log('masuk loginSuccessful')
            this.loggedIn = true
            console.log(this.loggedIn)
        },  

        logout(){
            this.loggedIn = false
            localStorage.clear()
        },

        getPublished(){
            this.contents = []
            console.log('masuk get timeline')
            axios({
                url : 'http://localhost:3000/article/',
                method : 'get',
                headers : {
                    token : localStorage.token
                }
            })
            .then(({data})=>{
                data.docs.forEach(el => {
                    this.contents.push(el)
                });
                this.onDisplay='article-content'
            })
            .catch(({response})=>{
                console.log(response)
            })
        },

        getDrafts(){
            this.contents = []
            console.log('masuk get drafts')
            axios({
                url : 'http://localhost:3000/article/drafts',
                method : 'post',
                data : {
                    author : localStorage.author
                },
                headers : {
                    token : localStorage.token
                }
            })
            .then(({data})=>{
                console.log(data)
                data.forEach(el => {
                    this.contents.push(el)
                });
                this.onDisplay='article-content'
            })
            .catch(({response})=>{
                console.log(response)
            })
        },

        getYourPosts(){
            console.log('masuk your posts')
            let filteredContents = this.contents.filter((content)=>{
                return content.author.includes(localStorage.author)
            })
            this.contents = filteredContents
        },

        tagSearch(tag){
            this.contents = []
            console.log('masuk get tagSearch')
            console.log(tag)
            axios({
                url : 'http://localhost:3000/article/',
                method : 'get',
                headers : {
                    token : localStorage.token
                }
            })
            .then(({data})=>{
                data.docs.forEach(el => {
                    this.contents.push(el)
                });
                let filteredContents = this.contents.filter((content)=>{
                    return (content.tags.indexOf(tag) >= 0)
                })
                this.contents = filteredContents
            })
        },

        showDeleteModal(id){
            this.id = ''
            this.id = id
            this.confirmDelete = true
        },

        closeDelete(jadiDelete){
            if(jadiDelete === 'yes'){
                this.confirmDelete = false
                this.getPublished()
            }
            if(jadiDelete === 'no'){
                this.confirmDelete = false
            }
        },

        updateArticle(id){
            this.id = ''
            this.id = id
            this.onDisplay = 'update-form'
        }
    },

    created(){
        this.getPublished()
        this.author = localStorage.getItem('author')
    }
}
</script>

<style>

#main-page{
    max-height: 93%;
    max-width: 100%;
    overflow: scroll;
}

#homeButton{
    size: 100%;
}

/* navbar */
.col-2{
    overflow: hidden;
    height: 93%;
}
.nav-link{
    background-color: rgb(27, 27, 27);
}
/* navbar */

.content-area{
    overflow: hidden;
}

</style>