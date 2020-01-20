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
            <div id="edit-image-container" v-if="imgFile">
                <i class="remove icon" id="remove-img" @click="removeImg" />
                <sui-image :src="imgFile"/>
            </div>
            <div class="ui input">
                <input type="file"
                       ref="featured_image"
                       name="featured_image"
                       @change="handleFileUpload"/>
                <i class="undo icon" id="undoImg" @click="undoImg"/>
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
                imgFile: null,
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
            this.content = this.data.content;
            this.imgFile = this.data.featured_image;
        },
        methods: {
            updateArticle: function () {
                this.$dialog
                .confirm("Update the data ?")
                .then(dialog => {
                    let formData = new FormData();
                    formData.set('title', this.title);
                    formData.set('tags', this.tags);
                    formData.set('content', this.content);
                    formData.set('featured_image', this.featured_image);
                    formData.set('imgFile', this.imgFile);

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
                        this.$toast.success({
                            title: 'Success',
                            message: 'Data successfully updated'
                        });
                        dialog.close()
                    }).catch(err => {
                        console.log({err});
                        this.$toast.error({
                            title: 'Error',
                            message: err.response.data.message
                        });
                        dialog.close()
                    });
                })
                .catch(err => {
                    this.$toast.info({
                        title: 'Cancel',
                        message: 'You have cancel to update the data'
                    });
                    err.close()
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
            },
            undoImg: function(){
                this.removeImg();
                this.imgFile = this.data.featured_image;
            },
            cancelEdit: function () {
                this.$emit('cancelEdit')
            },
        }
    }
</script>

<style scoped>
    #edit-image-container{
        width: 250px;
        margin: 10px;
    }

    .input{
        padding-top: 10px;
    }

    #remove-img {
        color: red;
    }

    i {
        font-size: 16px;
        cursor: pointer;
    }

    #undoImg {
        color: blue;
        margin: 10px 5px;
    }
</style>