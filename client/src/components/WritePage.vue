<template>
    <div class="container mt-3">
        <div id="add-form">
            <h3 class="text-center">Add New Post</h3>
            <form action="/upload-single" method="post" enctype="multipart/form-data">
                <div class="form-group">
                    <label for="Title">Title</label>
                    <input type="text" class="form-control" id="Title" placeholder="Title" v-model="title">
                </div>
                <div class="form-group">
                    <label for="Short Description">Short Description</label>
                    <input type="text" class="form-control" id="Short Description" placeholder="Short Description" v-model="description">
                </div>
                <div class="form-group">
                    <label for="Short Description">Tell me your story</label>
                    <local-quill-editor v-model="content"
                                        ref="quillEditor"
                                        style="height: 200px"
                                        @blur="onEditorBlur($event)"
                                        @focus="onEditorFocus($event)"
                                        @ready="onEditorReady($event)">
                    </local-quill-editor>
                </div>
                <div class="form-group" id="uploadImage">
                    <label for="image">Upload an Image</label>
                    <input type="file" ref="myFiles" name="file" id="file" @change="previewFiles">
                </div>
            </form>
            <button type="submit" class="btn btn-primary" @click.prevent="createArticle">Submit</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

export default {
    name: 'WritePage',
    data() {
        return {
            title: '',
            description: '',
            content: '',
            image: null
        }
    },
    components: {
        LocalQuillEditor: VueQuillEditor.quillEditor
    },
    methods: {
        onEditorBlur(quill) {
            console.log('editor blur!', quill)
        },
        onEditorFocus(quill) {
            console.log('editor focus!', quill)
        },
        onEditorReady(quill) {
            console.log('editor ready!', quill)
        },
        previewFiles: function(){
            this.image = event.target.files[0]
            console.log(this.image)
        },
        createArticle: function(){
            let formData = new FormData()
            formData.append('title', this.title)
            formData.append('description', this.description)
            formData.append('content', this.content)
            formData.append('featured_image', this.image)

            console.log('This is form data',formData)
            axios.post(`${BASE_URL}/article`, formData, {headers: {'Content-Type': 'multipart/form-data', token: localStorage.getItem('token')}})
                .then(data => {
                    console.log('data created', data)
                    let created = (data.data.result)
                    this.title = ''
                    this.description = ''
                    this.content = ''
                    this.image = null
                    return this.$emit('article', created)
                })
                .catch(err => {
                    console.log(err.response)
                })
        }
    }
}
</script>

<style lang="css" scoped>
    #uploadImage{
        margin-top: 9vh;
    }
</style>