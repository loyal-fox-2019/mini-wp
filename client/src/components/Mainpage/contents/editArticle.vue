<template>
    <div>
        <h1>Edit article</h1>
            <a href="#" @click="backToList">Go back</a><br>
            <input type="text" v-model="title" placeholder="Article title"><br>
            <input type="text" v-model="slug" placeholder="Article slug">
            <button id="save-btn" @click="updateArticle">Save article</button><br>

            <!-- <textarea v-model="content" cols="90" rows="20" placeholder="Article body"></textarea> -->
            <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption">
            </quill-editor>
            <br>

            <button id="save-btn" @click="updateArticle">Save article</button>

            
    </div>
</template>

<script>
    import axiosReq from "../../../config/axiosReq"
    export default {
        name: "editArticle",
        props: {
            id: String
        },
        data() {
            return {
                title: "",
                slug: "",
                content: ""
            }
        },
        watch: {
            id: {
                handler(newId) {
                    axiosReq({
                        method: "GET",
                        url: `/api/articles/${newId}`
                    })
                    .then(({data}) => {
                        this.title = data.title;
                        this.slug = data.slug;
                        this.content = data.content;
                    })
                    .catch((err) => {
                        backToList();
                    })
                },
                immediate: true
            }
        },
        methods: {
            backToList() {
                this.$emit('showMyList');
            },
            updateArticle() {
                axiosReq({
                    method: "PUT",
                    url: `/api/articles/${this.id}`,
                    headers: {
                        token: this.$cookies.get('token')
                    },
                    data: {
                        title: this.title,
                        slug: this.slug,
                        content: this.content
                    }
                })
                .then(() => {
                    this.$emit('viewArticle',this.id);
                    // this.backToList();
                })
                .catch((err) => {
                    this.backToList();
                })
            }
        }
    }
</script>

<style scoped>

</style>