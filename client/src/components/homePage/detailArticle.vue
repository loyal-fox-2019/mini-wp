<template>
    <div>
        <div class="row px-4 mt-3">
            <h4>{{ article.title }}</h4>
        </div>
        <div class="row px-4 mt-3">
            <p><i class="far fa-calendar"> Created: {{ article.created_at.split("T")[0] }}</i></p>
        </div>
        <div class="row px-4 mt-3">
            <img :src="article.picture">
        </div>
        <div class="row px-4 mt-3">
            <quill v-model="article.content" id="editor" :config="config"></quill>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'detailArticle',
    data(){
        return {
            article: null,
            config: {
                readOnly: true
            }
        }
    },
    props: {
        articleId: String
    },
    mounted(){
        axios({
            method: 'get',
            url: `http://localhost:3000/articles/${this.articleId}`,
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then(({data})=>{
            let isi = JSON.parse(data.content)
            data.content = isi
            this.article = data
            
        })
        .catch(err=>{
            console.log(err);
        })
    }
}
</script>

<style scoped>
    img {
        height: 200px;
    }

    #editor {
        height: 100%;
        width: 100%;
    }
</style>