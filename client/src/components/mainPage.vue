<template>

    <div>
            <nav class="navbar navbar-expand-lg">
                <a class="navbar-brand" href="#" id="logo"><i class="fab fa-wordpress-simple" style="font-size: 30px;margin-right: 7px;"></i>My Sites</a>
                <i class="far fa-newspasper" style="font-size: 30px;margin-right: 7px;"></i>
                  <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="navbar-brand" href="#" style="color: white;">Reader</a>
                    </li>
                  </ul>
                  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                  </button>
                  <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto justify-content-right ">
                        <GoogleLogin :params="params" :logoutButton=true>Logout</GoogleLogin>
                        <a class="nav-link" href="#"><i class="fas fa-user-friends" style="color: white;"></i></a><a class="nav-link" href="#"><i class="far fa-comments" style="color: white;"></i></a>
                      </ul>
                  </div>
            </nav>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-3">
                        <div class="sidebar-sticky left-overflow">
                            <div class="list-group">
                                <h5>Manage</h5>
                                <a href="#" class="list-group-item list-group-item-action" v-on:click.prevent="showForm"><i class="far fa-file-alt"></i>Write Post</a>
                                <a href="#" class="list-group-item list-group-item-action" v-on:click.prevent="showPublished"><i class="far fa-paper-plane"></i>Blog Posts</a>
                                <a href="#" class="list-group-item list-group-item-action disabled"><i class="fas fa-photo-video"></i>Media</a>
                                <a href="#" class="list-group-item list-group-item-action disabled"><i class="far fa-comment-dots"></i>Comments</a>
                                <a href="#" class="list-group-item list-group-item-action disabled"><i class="fas fa-list-ol"></i>Feedback</a>
                                <a href="#" class="list-group-item list-group-item-action disabled"><i class="fas fa-plug"></i>Plugins</a>
                                <a href="#" class="list-group-item list-group-item-action disabled"><i class="fas fa-cloud-upload-alt"></i>Import</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-9">
                        <div class="container">
                            <div class="row justify-content-between" id="publish">
                                <div class="input-group mb-3">
                                    <input v-model="titleSearch" type="text" class="form-control" placeholder="Article's Title" aria-label="Recipient's username" aria-describedby="basic-addon2">
                                    <div class="input-group-append">
                                      <button class="input-group-text" id="basic-addon2" v-on:click="searchArticle">search</button>
                                    </div>
                                  </div>
                            </div>
                            <div id="formWrite" style="display: none;" v-show="formWrite">
                                <form method="post" enctype="multipart/form-data">
                                    <p>Title</p>
                                    <input type="text" v-model="articleTitle">
                                    <p>Content</p>
                                    <froala :tag="'textarea'" :config="config" v-model="articleContent"></froala>
                                    <input type="file" name="file" v-on:change="uploadPicture"/>
                                  </form>
                                <p>
                                    <button type="button" class="btn btn-danger" v-on:click="publishArticle">Publish</button>
                                </p>
                            </div>
                            <div id="formUpdate" style="display: none;" v-show="formUpdate">
                                <form method="post" enctype="multipart/form-data">
                                    <p>Title</p>
                                    <input type="text" v-model="articleTitle" v-bind:placeholder="titlePlace">
                                    <p>Content</p>
                                    <div>
                                        <div class="fr-view" >
                                            <froala :tag="'textarea'" :config="config" v-model="articleContent"></froala>
                                        </div>
                                    </div>
                                    <input type="file" name="file" v-on:change="uploadPicture"/>
                                </form>
                                <p>
                                    <button type="button" class="btn btn-danger" v-on:click="update(articleId)">Update</button>
                                </p>
                            </div>
                            <div class="row blogs d-flex justify-content-between" v-for="(item, key) in searchedList" :key="key" :data="item" v-show="searchedList.length>0">
                                <div class="col-md-3">
                                    <h5>{{ item.title }}</h5>
                                    <froalaView v-model="item.content"></froalaView>
                                    <!-- <p>{{ item }}</p> -->
                                </div>
                                <img class="col-md " v-bind:src="item.picture" alt="" style="width: 25%;height: 25%;">
                                <div class="col-md justify-content-right">
                                    <button type="button" class="btn btn-warning" v-on:click="updateArticle(item._id)">Edit</button>
                                    <button type="button" class="btn btn-danger" v-on:click="deleteArticle(item._id)">Delete</button>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </div>       
  
  
</template>

<script>
import boostrap from 'bootstrap'
import axios from 'axios'
import GoogleLogin from 'vue-google-login'
import FroalaEditor from 'froala-editor'
import VueFroala from 'vue-froala-wysiwyg';
export default {
    name: 'mainpage',
    props: ['data'],
    components:{
        GoogleLogin
    },
    data(){
        return{
            config: {
                events: {
                    'froalaEditor.initialized': function () {
                        console.log('initialized')
                    }
                }
            },
            model: 'Edit Your Content Here!',
            params: {
                client_id: "1014814489310-p0qgrk4k8m0skfllva0q2nubat1aqgth.apps.googleusercontent.com"
            },
            titleSearch: '',
            formWrite: false,
            articleTitle: '',
            articleContent: '',
            formUpdate: false,
            titlePlace: '',
            contentPlace: '',
            articleId: '',
            picture: '',
            listArticles: '',
            showArticles: false,
            searchedList: []
        }
    },
    methods:{
        signOut(){
            localStorage.removeItem('token')
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.log('User signed out.');
            });
            this.$emit('user-signout', true)
        },
        showForm(){
            if(this.formWrite==false){
                this.formWrite = true
                this.formUpdate=false
                this.searchedList = []
            }else{
                this.formWrite = false
                this.formUpdate=false
                this.searchedList = this.listArticles
            }
        },
        showPublished(){
            if(this.searchedList.length===0){
                this.formWrite = false
                this.formUpdate=false
                this.listArticles = this.data
                this.searchedList = this.listArticles
            }else{
                this.formWrite = false
                this.formUpdate=false
                this.searchedList = []
            }
            
        },
        searchArticle(){
            let findList = []
            console.log('article', this.listArticles)
            for(let article of this.listArticles){
                console.log(article)
                if(article.title.includes(this.titleSearch)){
                findList.push(article)
                }
            }
            this.searchedList = findList
        },
        uploadPicture(){
            this.picture = event.target.files[0]
        },
        publishArticle(){
            const formData = new FormData()
            let list = this.listArticles
            formData.append('title', this.articleTitle)
            formData.append('content', this.articleContent)
            formData.append('picture', this.picture)
            formData.append('created_at', new Date())
            this.formWrite = false
            axios({
                method: 'post',
                url: 'http://localhost:3000/articles',
                data: formData,
                headers:{
                token: localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                // console.log(data, 'result dari publish article')
                list.push({
                id: data._id,
                title:data.title,
                content:data.content,
                created_at: data.created_at,
                picture: data.picture
                })
                this.showPublished()
            })
            .catch(err=>{
                console.log(err)
            })},
        update(id){
            console.log(id,'di update')
            // console.log('picture yang ke upload', this.picture)
            const formData = new FormData()
            formData.append('title', this.articleTitle)
            formData.append('content', this.articleContent)
            formData.append('created_at', new Date())
            formData.append('picture', this.picture)
            axios({
                method: 'patch',
                url: `http://localhost:3000/articles/${id}`,
                data: formData,
                headers:{
                token: localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                // console.log(data,'di update()')
                this.formUpdate=false
                return axios({
                method:'get',
                url: 'http://localhost:3000/articles',
                headers:{
                    token: localStorage.getItem('token')
                }
                })
            })
            .then(({data})=>{
                this.searchedList = data.result
                this.listArticles = data.result
            })
            .catch(err=>{
                console.log(err)
            })
        },
        deleteArticle(id){
            console.log('delete article id', id)
            axios({
                method: 'delete',
                url: `http://localhost:3000/articles/${id}`,
                headers:{
                    token: localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                // console.log(data)
                return axios({
                method: 'get',
                url: 'http://localhost:3000/articles',
                headers:{
                    token: localStorage.getItem('token')
                }
                })
            })
            .then(({data})=>{
                this.listArticles = data.result
                this.searchedList = data.result
            })
            .catch(err=>{
                console.log(err)
            })
        },
        updateArticle(id){
            console.log(id,'di updateARticle')
            this.formUpdate = true
            this.articleId = id
            this.searchedList = []
            axios({
                method: 'get',
                url: `http://localhost:3000/articles/${id}`,
                headers:{
                token: localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                // console.log(data, 'data di updateArticle')
                this.titlePlace = data.result.title
                this.contentPlace = data.result.content
                this.created = data.result.created_at
                this.articleId = data.result._id
                this.picture = data.result.picture
            })
            .catch(err=>{
                console.log(err)
            })}
    }
}
var editor = new FroalaEditor('#example')
</script>

<style>

</style>