<template>
    <div>
        <div class="row justify-content-center p-2 mt-2" id="search">
            <input type="text" id="search-bar" placeholder="Filter title" v-model="search_box" v-on:keyup="filter">
            <i class="fas fa-search fa-lg" id="search-img"></i>
        </div>
        <!-- IF NO ARTICLE FOUND -->
        <div class="row justify-content-center p-2 m-2" v-if="articles[0] == undefined">
            <h4>No article found</h4>
        </div>

        <!-- LIST ARTICLE -->
        <div>
            <div class="row px-4 mt-3 mb-4" >
                <div class="card col-sm-6 col-nd-6 col-lg-4 col-xl-3 p-2" :key="item._id" v-for="item in articles">
                    <img class="card-img-top rounded" v-bind:src="item.picture" alt="Card image cap">
                    <div class="card-body">
                    <h5 class="card-title">{{ item.title }}</h5>
                    <p class="card-text">
                        <i class="far fa-calendar"> Created: {{ item.created_at.split("T")[0] }}</i>
                    </p>
                    <div class="row mt-4">
                        <div class="col-7">
                            <i class="far fa-eye fa-lg dashboard-img" v-on:click="viewDetail(item._id)"></i>
                        </div>
                        <div class="col-2">
                            <i class="far fa-edit fa-lg dashboard-img" v-on:click="goToUpdate(item.title, item.content, item._id)"></i>
                        </div>
                        <div class="col-3">
                            <i class="fas fa-trash-alt fa-lg dashboard-img" v-on:click="deleteArticle(item.title, item._id)"></i>
                        </div>
                    </div>
                    </div>
                </div>                      
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
    name: 'listArticle',
    data(){
        return {
            articles: [],
            articles_perma: [],
            search_box: ''
        }
    },
    methods: {
        getArticles: function() {
            axios({
                method: 'get',
                url: 'http://35.240.160.186:3000/articles',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                if(data.length > 0){
                    for(let item of data) {
                        let isi = JSON.parse(item.content)
                        item.content = isi
                    }
                    this.articles = data
                    this.articles_perma = data
                }
                else {
                    this.articles = []
                    this.articles_perma = []
                }
            })
            .catch(err=>{
                console.log(err)
            })
        },
        filter: function(){
            let temp = []
            for(let obj of this.articles_perma) {
                if(obj.title.includes(this.search_box)) {
                    temp.push(obj)
                }
            }
            this.articles = temp
        },
        viewDetail: function(id){
            this.$emit('goToDetail', id)
        },
        deleteArticle: function(title, id){
            Swal.fire({
                title: `Deleting article ${title}`,
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            })
            .then(confirmed=>{
                if(confirmed.value) {
                    return axios({
                        method: 'delete',
                        url: `http://35.240.160.186:3000/articles/${id}`,
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    })
                }
                else if(confirmed.dismiss == 'cancel'){
                    this.getArticles()
                }
            })
            .then(({data})=>{
                Swal.fire(
                    `Article "${data.title}" deleted!`,
                    'Article deletion success.',
                    "success"
                )
                this.getArticles()
            })
            .catch(err=>{
                console.log(err);          
            })
        },
        goToUpdate: function(title, content, articleId){
            let articleData = {
                title,
                content,
                articleId
            }
            this.$emit("update", articleData)
        }
    },
    mounted(){
        this.getArticles()
    }
}
</script>

<style scoped>
    #search-bar {
        width: 50%;
        border-radius: 5px;
        margin: 0 10px;
        padding: 0 20px;
        box-shadow: 3px 2px gray;
        border: 2px solid rgb(20, 106, 112);
    }

    #search-img {
        margin-top: 5px;
        color: rgb(20, 106, 112);
        text-shadow: 2px 2px gray;
    }

    .card {
        width: 18rem
    }

    .card-title {
        font-weight: bold;
    }

    .fa-calendar {
        font-size: 14px
    }

    .fa-eye {
        filter: opacity(90%);
        text-shadow: 1px 2px gray;
    }

    .fa-eye:hover {
        cursor: pointer;
        filter: opacity(100%)
    }

    .fa-edit {
        filter: opacity(90%);
        text-shadow: 1px 2px gray;
    }

    .fa-edit:hover {
        cursor: pointer;
        filter: opacity(100%)
    }

    .fa-trash-alt {
        filter: opacity(90%);
        color: rgb(223, 51, 51);
        text-shadow: 1px 2px gray;
    }

    .fa-trash-alt:hover {
        cursor: pointer;
        filter: opacity(100%)
    }

    .fa-eye:active {
        text-shadow: 0 0;
    }

    .fa-edit:active {
        text-shadow: 0 0;
    }

    .fa-trash-alt:active {
        text-shadow: 0 0;
    }

</style>