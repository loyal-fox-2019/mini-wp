<template>
<div>
    <div>
        <Navbar></Navbar>
    </div>
    <div class="d-flex">
        <Sidebar @changePage="changePage"></Sidebar>
        <div class="main-content">
            <div class="create"  v-if="page === 'createArticle'">
                <FormCreate @backHome="backHome"/>
            </div>
            <div class="list-article"  v-if="page === 'listArticle'">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-6">
                            <input class="form-control mr-sm-2 mb-sm-3 mt-sm-3" type="search" placeholder="Search" aria-label="Search" v-model="searchFilter">
                        </div>
                    </div>
                </div>
                <Card v-for="entry in filteredArticle" :key="entry._id" :article="entry" v-on:showEdit="showEdit"></Card>
            </div>
            <div class="update" v-if="page === 'editArticle'">
                <FormUpdate :articleEdit="articleEdit" @showArticle="showArticle" @backHome="backHome" />
            </div>
        </div>

    </div>
</div>
</template>

<script>

import Navbar from '../component/navbar'
import Sidebar from '../component/sidebar'
import Article from '../component/Article'
import FormCreate from '../component/FormCreate'
import FormUpdate from '../component/FormUpdate'
import Card from '../component/card'

export default {
    data(){
        return{
            page: 'listArticle',
            showUpdate: false,
            showCreate: false,
            articleList: [],
            articleEdit: null,
            searchFilter: ''
        }
    },
    components: {
        Navbar,
        Sidebar,
        Article,
        FormCreate,
        FormUpdate,
        Card
    },
    methods: {
        changePage(e){
            this.page = e
            this.articles()
        },
        showEdit(payload){
            this.articleEdit= payload.article
            this.page= payload.command
            console.log(this.articleEdit)
            this.articles()
        },
        backHome(payload){
            this.page = payload
            this.articles()
        },
        showArticle(payload){
            this.page= payload
            this.articles()
        },
        articles(){
             axios.get('http://localhost:3000/miniwp/article', {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            .then(response => {
                // console.log(response.data.articles)
                this.articleList = response.data.articles

            })
            .catch(error => {
                console.log(error)
            })
        }
    },
    created() {
       this.articles()
    },
    computed:{
        filteredArticle(){
            console.log(this.articleList)
            return this.articleList.filter(el => {
            return el.title.toLowerCase().includes(this.searchFilter.toLowerCase())
      })
        }
    }
}
</script>

<style scoped>
.d-flex {
    display: flex;
}

.list-article {
    display: flex;
    flex-direction: column;
    width: 100vh;
}

.create, .update {
    width: 100%
}

.main-content {
    display: flex;
    flex-direction: column;
}

</style>