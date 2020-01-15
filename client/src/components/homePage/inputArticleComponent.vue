<template>
    <div>
        <message-component :header="header" :content="contentMsg" :visible="visible"></message-component>
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
                            :options="tags"
                            v-model="tags"
                            placeholder="Tags"
                            search
                            selection
                            allow-additions
                            v-model="current"
                            required/>
                </div>
            </div>
            <br>
            <label>Feature Image : </label>
            <sui-label color="teal" basic>max size 5 Mb</sui-label>
            <div class="field">
                <div class="ui input">
                    <input type="file" ref="featured_image" name="featured_image" @change="handleFileUpload"/>
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
    import messageComponent from "../messageComponent";

    export default {
        name: "inputArticleComponent",
        data() {
            return {
                title: "",
                featured_image: "",
                content: "",
                editorOption: {
                    theme: 'snow'
                },
                header: null,
                contentMsg: null,
                visible: false,
                current: null,
                tags: [],
            }
        },
        methods: {
            submitArticle: function () {
                let formData = new FormData();
                formData.set('title', this.title);
                formData.set('tags', this.tags);
                formData.set('content', this.content);
                formData.set('quillContent', this.content);
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
                    this.header = "Success Saving Data";
                    this.contentMsg = "Data successfully saved";
                    console.log(data);
                }).catch(err => {
                    this.header = "Error Saving Data";
                    this.contentMsg = "Data failed to save";
                    console.log(err)
                });
                this.visible = true;
                setTimeout(() => {
                    this.visible = false;
                }, 2000);
            },
            handleFileUpload: function () {
                this.featured_image = this.$refs.featured_image.files[0];
            }
        },
        components: {
            LocalQuillEditor: VueQuillEditor.quillEditor,
            messageComponent
        }
    }
</script>

<style scoped>
    .field {
        margin: 10px;
    }
</style>