<template>
    <div>
        <form action="" method="post" enctype="multipart/form-data">
            <div class="row px-4 mt-3">
                <div class="col-1">
                    <h4 class="d-inline-block">Title: </h4>
                </div>
                <div class="col-8">
                    <input class="d-inline-block" placeholder="Article title" type="text" id="title-box" v-model="newTitle" required>
                </div>
            </div>
            <div class="row px-4 mt-3">
                <div class="col-1">
                    <h4>Image:</h4>
                </div>
                <div class="col ml-3">
                    <input type="file" ref="picture" name="picture" @change="getImage" />
                </div>
            </div>
            <div class="row px-4 mt-3">
                <div class="col-1">
                    <h4>Content:</h4>
                </div>
            </div>
            <div class="row px-4 mb-4">
                <div class="col">
                    <quill v-if="!yesEdit" v-model="content" class="editor"></quill>
                    <quill v-if="yesEdit" v-model="articleEdit.content" class="editor"></quill>
                </div>
            </div>
        </form>
        <div class="row px-4 mt-5">
            <button class="btn btn-outline-primary my-2 my-sm-0 font-weight-bold ml-3" type="submit" v-if="!yesEdit" v-on:click="publishArticle">Publish</button>
            <button class="btn btn-outline-danger my-2 my-sm-0 font-weight-bold ml-3" type="submit" v-if="yesEdit" v-on:click="updateArticle">Update</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
    name: 'writeArticle',
    data(){
        return {
            newTitle: "",
            picture: null,
            content: null
        }
    },
    props: {
        yesEdit: Boolean,
        articleEdit: Object
    },
    methods: {
        getImage: function(){
            this.picture = this.$refs.picture.files[0]
        },
        publishArticle: function(){
            let isi = JSON.stringify(this.content)
            let formData = new FormData()
            formData.set('title', this.newTitle)
            formData.set('content', isi)
            formData.set('created_at', new Date())
            formData.set('picture', this.picture)
            axios({
                method: 'post',
                url: `http://localhost:3000/articles`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    token: localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                Swal.fire(
                    `Article "${data.title}" published!`,
                    'Going back to article list',
                    'success'
                )
                this.$emit('doneWrite')
            })
            .catch(err=>{
                console.log(err);
            })
        },
        updateArticle: function(){
            let isi = JSON.stringify(this.articleEdit.content)
            let formData = new FormData()
            formData.set('title', this.newTitle)
            formData.set('content', isi)
            if(this.picture !== null) {
                formData.set('picture', this.picture)
            }         
            axios({
                method: 'patch',
                url: `http://localhost:3000/articles/${this.articleEdit.articleId}`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    token: localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                Swal.fire(
                    `Article "${data.title}" updated!`,
                    'Going back to article list',
                    'success'
                )
                this.$emit('doneWrite')
            })
            .catch(err=>{
                console.log(err);
            })
        }
    },
    mounted(){
        if(this.yesEdit) {
            this.newTitle = this.articleEdit.title
            this.content = this.articleEdit.content
        }
        else {
            this.newTitle = ''
            this.content = null
        }
    }
}
</script>

<style scoped>
    #title-box {
        width: 50%;
        border-radius: 5px;
        margin: 0 10px;
        padding: 0 20px;
        box-shadow: 3px 2px gray;
        border: 2px solid rgb(20, 106, 112);
    }
    
    .editor {
        height: 45vh;
    }
</style>