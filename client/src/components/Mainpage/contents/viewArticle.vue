<template>
    <div>
        Article
        <h1>{{ title }}</h1>
        <a href="#">{{ author==username ? "Edit" : "" }}</a> 
        <a href="#">{{ author==username ? "Delete" : "" }}</a>
        <p>{{ content }}</p>
    </div>
</template>

<script>
    import axiosReq from "../../../config/axiosReq";
    export default {
        name: "viewArticle",
        data() {
            return {
                title: "",
                slug: "",
                content: "",
                author: "",
                username: this.$cookies.get('username')
            }
        },
        props: {
            id: String
        },
        watch: {
            id: {
                handler(id) {
                    axiosReq({
                        method: "GET",
                        url: `/api/articles/${id}`
                    })
                    .then(({data}) => {
                        this.title = data.title;
                        this.slug = data.slug;
                        this.content = data.content;
                        this.author = data.author.username;
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                },
                immediate: true
            }
        },
        method: {
            getArticle(id) {
                axiosReq({
                    method: "GET",
                    url: `/api/articles/${id}`
                })
                .then(({data}) => {
                    this.title = data.title;
                    this.slug = data.slug;
                    this.content = data.content;
                    this.author = data.author.username;
                })
                .catch((err) => {
                    console.log(err);
                })
            }
        }
    }
</script>

<style scoped>

</style>