<template>
    <div class="container mt-3">
        <div id="add-form">
            <h3 class="text-center">Edit Post</h3>
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
            <button type="submit" class="btn btn-primary" @click.prevent="editPost(editArticle._id)">Submit</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

const BASE_URL = 'http://34.87.122.217:3000'

export default {
    name: 'EditForm',
    data() {
        return {
            title: this.editArticle.title,
            description: this.editArticle.description,
            content: this.editArticle.content,
            image: this.editArticle.image
        }
    },
    props: ['editArticle'],
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
        editPost: function(id){
            let formData = new FormData()
            formData.append('title', this.title)
            formData.append('description', this.description)
            formData.append('content', this.content)
            formData.append('featured_image', this.image)

            console.log('This is form data',formData)
            axios.put(`${BASE_URL}/article/${id}`, formData, {headers: {'Content-Type': 'multipart/form-data', token: localStorage.getItem('token')}})
                .then(data => {
                    console.log('data created', data)
                    this.title = ''
                    this.description = ''
                    this.content = ''
                    this.image = null
                    return this.$emit('doneEdit', true)
                })
                .catch(err => {
                    console.log(err.response)
                })
        },
        previewFiles: function(){
            this.image = event.target.files[0]
            console.log(this.image)
        }
    }
}
</script>

<style lang="css" scoped>
    #uploadImage{
        margin-top: 9vh;
    }
</style>