<template>
  <div class="container-fluid">
        <div class="row justify-content-center pt-5">
            <div class="col-lg-6">
                <div class="card-form">
                    <h2 class="mb-4">Update your article</h2>
                    <form v-on:submit.prevent="update()">
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="getArticles.title" aria-describedby="emailHelp" placeholder="Enter Article Name">
                        </div>
                        <wysiwyg v-model="getArticles.content"></wysiwyg>
                        <div class="button-container mt-3">
                            <button class="btn btn-dark btn-lg">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'update-article',
    props: ['article'],
    data: function() {
        return {
            file: '',
            title: '',
            content: '',
        }
    },
    computed: {
        getArticles() {
            return {title: this.article.title, content: this.article.content, id: this.article._id}
        }
    },
    methods: {
        update: function() {
            axios({
                method: 'put',
                url: `http://localhost:3000/article/${this.getArticles.id}`,
                data: {
                    title: this.getArticles.title,
                    content: this.getArticles.content
                },
                headers: {
                    usertoken: localStorage.getItem('usertoken')
                }
            })
            .then(response => {
                this.$emit('updateSuccess')
            })
            .catch(error => {
                console.log({error});
            })
        }
    }
}
</script>

<style>
.container-fluid {
    height: 100vh;
}

.card-form {
    box-shadow: 0 0 5px black;
    padding: 30px;
    border-radius: 8px;
}

.button-container {
    text-align: center;
}

.button-container button {
    width: 100%;
}
</style>