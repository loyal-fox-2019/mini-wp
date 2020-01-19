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
                <button class="btn btn-outline-success my-2 my-sm-0 mb-3" type="submit" v-on:click.prevent='searchArticle'>Search</button>
            </form>
            <div class="row mt-3">
                <div class="col-sm-6 mt-2" v-for="article in articles" :key="article._id">
                    <div class="card">
                        <div class="row no-gutters">
                            <div class="col-md-4">
                                <img src="#" class="card-img" alt="#">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">{{data.name}}</h5>
                                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                    <a href="#" class="btn btn-primary">Full Article</a>
                                    <a href="#" class="btn btn-warning">Edit</a> 
                                    <a href="#" class="btn btn-danger">Delete</a>
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
export default {
    name: 'MainPage',
    data() {
        return {
            articles: []
        }
    },
    props: ['articleList']
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