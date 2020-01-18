<template>
    <form class="w-100"
          @submit.prevent="updateArticle"
          enctype="multipart/form-data">
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
        <div class="field input">
            <div id="edit-image-container">
                <sui-image :src="data.featured_image"/>
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
        <sui-label color="teal" basic>100 - 50.000 character</sui-label>
        <div class="field input">
            <button class="ui button blue" type="submit" class="btn btn-primary">Update</button>
            <button class="ui button negative" class="btn btn-primary" @click="cancelEdit">
                Cancel
            </button>
        </div>
        <div class="field input">
            <local-quill-editor v-model="content"
                                ref="quillEditor"
                                :options="editorOption">
            </local-quill-editor>
        </div>
    </form>
</template>

<script>


    import {instance} from "../../config/axiosConfig";

    export default {
        name: "editArticleComponent",
        data() {
            return {
                title: "",
                featured_image: "",
                content: "",
                editorOption: {
                    theme: 'snow'
                },
                tags: null,
                tagList: [
                    {key: 'angular', text: 'Angular', value: 'angular'},
                    {key: 'css', text: 'CSS', value: 'css'},
                    {key: 'design', text: 'Graphic Design', value: 'design'},
                    {key: 'ember', text: 'Ember', value: 'ember'},
                    {key: 'html', text: 'HTML', value: 'html'},
                    {key: 'ia', text: 'Information Architecture', value: 'ia'},
                    {key: 'javascript', text: 'Javascript', value: 'javascript'},
                    {key: 'mech', text: 'Mechanical Engineering', value: 'mech'},
                    {key: 'meteor', text: 'Meteor', value: 'meteor'},
                    {key: 'node', text: 'NodeJS', value: 'node'},
                    {key: 'plumbing', text: 'Plumbing', value: 'plumbing'},
                    {key: 'python', text: 'Python', value: 'python'},
                    {key: 'rails', text: 'Rails', value: 'rails'},
                    {key: 'react', text: 'React', value: 'react'},
                    {key: 'repair', text: 'Kitchen Repair', value: 'repair'},
                    {key: 'ruby', text: 'Ruby', value: 'ruby'},
                    {key: 'ui', text: 'UI Design', value: 'ui'},
                    {key: 'ux', text: 'User Experience', value: 'ux'},
                ],
            }
        },
        props: {
            data: Object
        },
        components: {
            LocalQuillEditor: VueQuillEditor.quillEditor,
        },
        mounted() {
            this.title = this.data.title;
            this.tags = this.data.tags;
            this.content = this.data.content
        },
        methods: {
            updateArticle: function () {
                let formData = new FormData();
                formData.set('title', this.title);
                formData.set('tags', this.tags);
                formData.set('content', this.content);
                formData.set('featured_image', this.featured_image);

                instance({
                    method: "put",
                    url: "/articles/" + this.data._id,
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: "token " + localStorage.token
                    }
                }).then(({data}) => {
                    this.$emit('updateData');
                    this.$emit('dismiss');
                    console.log(data);
                }).catch(err => {
                    console.log(err)
                });
                this.visible = true;
                setTimeout(() => {
                    this.visible = false;
                }, 2000);
            },
            handleFileUpload: function () {
                this.featured_image = this.$refs.featured_image.files[0];
            },
            cancelEdit: function () {
                this.$emit('cancelEdit')
            },

        }
    }
</script>

<style scoped>
    #edit-image-container{
        width: 200px;
    }

    .input{
        padding-top: 10px;
    }
</style>