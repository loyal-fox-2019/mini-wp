<template>
    <div>
        <h1>New post</h1>
            <input type="text" v-model="title" placeholder="Article title"><br>
            <input type="text" v-model="slug" placeholder="Article slug">
            <button id="save-btn" @click="saveArticle">Save article</button><br>
            <textarea v-model="content" cols="90" rows="20" placeholder="Article body"></textarea><br>
            <button id="save-btn" @click="saveArticle">Save article</button>

            <!-- Quill editor -->
            <!-- <div class="editor"></div> -->
    </div>
</template>

<script>
    import axiosReq from "../../../config/axiosReq"
    export default {
        name: "newArticle",
        data() {
            return {
                title: "",
                slug: "",
                content: ""
            }
        },
        methods: {
            saveArticle() {
                axiosReq({
                    method: "POST",
                    url: "/api/articles",
                    headers: {
                        token: this.$cookies.get('token')
                    },
                    data: {
                        title: this.title,
                        slug: this.slug,
                        content: this.content
                    }
                })
                .then(({data}) => {
                    console.log(data);
                    this.title = "";
                    this.slug = "";
                    this.content = "";
                })
                .catch((err) => {
                    console.log(err);
                    
                    this.title = "";
                    this.slug = "";
                    this.content = "";
                })
            }
        }
    }
</script>

<style scoped>

</style>