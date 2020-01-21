<template>
    <div class="container-fluid">
        <div class="row justify-content-center pt-5">
            <div class="col-lg-6">
                <div class="card-form">
                    <h2 class="mb-4">Create your article</h2>
                    <form v-on:submit.prevent="createNew()">
                        <div class="form-group">
                            <label for="exampleFormControlFile1">Upload article image here!</label>
                            <input type="file" v-on:change="inputToFile" class="form-control-file" id="exampleFormControlFile1">
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="title" aria-describedby="emailHelp" placeholder="Enter Article Name">
                        </div>
                        <wysiwyg v-model="content"></wysiwyg>
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
import swal from 'sweetalert2';
export default {
    name: 'create-article',
    data: function() {
        return {
            file: '',
            title: '',
            content: '',
        }
    },
    methods: {
        inputToFile: function(event) {
            this.file = event.target.files[0]
        },
        createNew: function() {
            const formData = new FormData();
            formData.append("file", this.file);
            formData.append("title", this.title);
            formData.append("content", this.content);
            axios({
                method: 'post',
                url: 'http://localhost:3000/article',
                data: formData,
                headers: {
                    usertoken: localStorage.getItem('usertoken')
                }
            })
            .then(article => {
                this.file = '',
                this.title = '',
                this.content = '',
                this.$emit('backToArticle');
            })
            .catch(error => {
                const errorResponse = {error}
                if(Array.isArray(errorResponse.error.response.data.errors)) {
                    swal.fire({
                        icon: 'error',
                        title: 'Failed to create new article',
                        text: `${errorResponse.error.response.data.errors[0]}`
                    })
                } else {
                    swal.fire({
                        icon: 'error',
                        title: 'Failed to create new article',
                        text: `${errorResponse.error.response.data.errors}`
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
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