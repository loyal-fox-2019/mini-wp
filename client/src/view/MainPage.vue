<template>
<div>
    <Navbar></Navbar>
    <div class="d-flex">
        <Sidebar @changePage="changePage"></Sidebar>
        <!-- <FormCreate v-if="page === 'createArticle'"/> -->
        <div class="list-article" >
            <Card v-for="article in articleList" :key="article._id" :data="article"></Card>
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
            page: null,
            showUpdate: false,
            showCreate: false,
            articleList: null
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
        },
        articles(){
             axios.get('http://localhost:3000/miniwp/article', {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            .then(response => {
                console.log(response.data.articles)
                this.articleList = response.data.articles

            })
            .catch(error => {
                console.log(error)
            })
            }
    },
    created() {
       this.articles()
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
</style>