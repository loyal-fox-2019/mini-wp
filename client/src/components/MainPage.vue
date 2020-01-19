<template>
    <div class="container-fluid">
        <div id="header">
            <ul class="nav">
                <li class="nav-item">
                    <a class="nav-link active" href="#">Published</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Drafts</a>
                </li>
            </ul>
        </div>
        <div id="article-list row">
            <form class="form-inline my-3 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="searchKey">
                <button class="btn btn-outline-success my-2 my-sm-0 mb-3" type="submit" @click.prevent="searchArticle">Search</button>
            </form>
            <div class="row mt-3">
                <div class="col-sm-6 mt-2" v-for="article in searchArticle" :key="article.id">
                    <div class="card">
                        <div class="row no-gutters">
                            <div class="col-md-4">
                                <img v-bind:src="article.featured_image" class="card-img" alt="#" width="300" height="200">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">{{article.title}}</h5>
                                    <p class="card-text">{{article.description}}</p>
                                    <p class="card-text"><small class="text-muted">{{new Date(article.created_at).toLocaleString()}}</small></p>
                                    <a href="#" class="btn btn-primary" @click.prevent="test">Full Article</a>
                                    <a href="#" class="btn btn-warning" @click.prevent="$emit('viewEdit', article)">Edit</a> 
                                    <a href="#" class="btn btn-danger" @click.prevent="$emit('deletePost', article._id)">Delete</a>
                                </div>
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
const BASE_URL = 'http://localhost:3000'

export default {
    name: 'MainPage',
    data() {
        return {
            articles: [],
            searchKey: ''
        }
    },
    props: ['articleList', 'isLogin'],
    methods: {
        
    },
    computed: {
        searchArticle: function(){
            if(this.searchKey == ''){
                return this.articleList
            }else{
                return this.articleList.filter(data => data.title.toLowerCase().includes(this.searchKey.toLowerCase()))
            }
        }
    },

}
</script>

<style lang="css" scoped>
    #header{
        margin: 10px 0;
        font-size: 24px;
    }
    .nav-item a{
        color: #000 !important;
    }
    form button{
        border: 2px solid black !important;
        color: #fdcb6e !important;
        background: #000;
    }
    form button:hover{
        border: 2px solid #fdcb6e !important;
        color: #000 !important;
        background: transparent;
    }
</style>