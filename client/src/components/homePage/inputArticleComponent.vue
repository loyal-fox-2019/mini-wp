<template>
    <div>
        <form class="w-100" @submit.prevent="submitArticle" action="" enctype="multipart/form-data">
            <label for="article-title">Title : </label>
            <sui-label color="teal" basic>10 - 100 character</sui-label>
            <div class="field">
                <div class="ui input">
                    <input type="text"
                           id="article-title"
                           placeholder="Title"
                           v-model="title"
                           size="100"
                           minlength="10"
                           maxlength="100"
                           required>
                </div>
            </div>
            <br>
            <label for="article-tags">Tags : </label>
            <sui-label color="teal" basic>
                min 1 tag, 3 - 15 character
            </sui-label>
            <div class="field">
                <div class="ui input">
                    <sui-dropdown
                            multiple
                            id="article-tags"
                            :options="tagList"
                            v-model="tags"
                            placeholder="Tags"
                            search
                            selection
                            allow-additions
                            required/>
                </div>
            </div>
            <br>
            <label>Feature Image : </label>
            <sui-label color="teal" basic>max size 5 Mb</sui-label>
            <div class="field">
                <div id="input-image-container" v-if="imgFile">
                    <i class="remove icon" id="remove-img" @click="removeImg"></i>
                    <sui-image :src="imgFile"/>
                </div>
                <div class="ui input">
                    <input type="file"
                           ref="featured_image"
                           name="featured_image"
                           @change="handleFileUpload"/>
                </div>
            </div>
            <br>
            <label>Content : </label>
            <div class="field">
                <sui-label color="teal" basic>100 - 50.000 character</sui-label>
                <button class="ui button blue" type="submit" class="btn btn-primary">Submit</button>
            </div>
            <div class="field">
                <local-quill-editor v-model="content"
                                    ref="quillEditor"
                                    :options="editorOption">
                </local-quill-editor>
            </div>
        </form>
    </div>
</template>

<script>
    import {instance} from "../../config/axiosConfig";

    export default {
        name: "inputArticleComponent",
        data() {
            return {
                imgFile: null,
                title: "",
                featured_image: "",
                content: "",
                editorOption: {
                    theme: 'snow'
                },
                header: null,
                contentMsg: null,
                visible: false,
                tags: null,
                tagList: [],
            }
        },
        methods: {
            submitArticle: function () {
                this.$dialog
                    .confirm("Save this data ?")
                    .then(dialog => {
                        let formData = new FormData();
                        formData.set('title', this.title);
                        formData.set('tags', this.tags);
                        formData.set('content', this.content);
                        formData.set('featured_image', this.featured_image);

                        instance({
                            method: "post",
                            url: "/articles",
                            data: formData,
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                Authorization: "token " + localStorage.token
                            }
                        }).then(({data}) => {
                            this.$emit('clicked');
                            console.log(data);
                            this.$toast.success({
                                title: 'Success',
                                message: 'Data successfully saved'
                            });
                            dialog.close();
                        }).catch(err => {
                            console.log({err});
                            this.$toast.error({
                                title: 'Error',
                                message: err.response.data.message
                            });
                            dialog.close();
                        });
                    }).catch(err => {
                    this.$toast.info({
                        title: 'Cancel',
                        message: 'You have cancel to save the data'
                    });
                    err.close();
                });
            },
            handleFileUpload: function (e) {
                this.featured_image = this.$refs.featured_image.files[0];
                const file = e.target.files[0];
                this.imgFile = URL.createObjectURL(file);
            },
            removeImg: function(){
                this.imgFile = null;
                this.featured_image = null;
                this.$refs.featured_image.type = 'text';
                this.$refs.featured_image.type = 'file';
            }
        },
        components: {
            LocalQuillEditor: VueQuillEditor.quillEditor,
        }
    }
</script>

<style scoped>
    .field {
        margin: 10px;
    }

    #input-image-container {
        width: 250px;
        margin: 10px;
    }

    #remove-img {
        color: red;
        font-size: 16px;
        cursor: pointer;
    }
</style>