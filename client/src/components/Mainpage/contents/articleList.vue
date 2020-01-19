<template>
    <div>
        <h1>My Articles</h1>
        <div v-if="myArticles.length > 0">
            <table class="table">
                <tr>
                    <th>No.</th>
                    <th>Creation date</th>
                    <th>Title</th>
                    <th>Preview</th>
                    <th colspan="3">Actions</th>
                </tr>
                <tr v-for="({_id, createdAt,title,content} , index) in myArticles">
                    <td>{{ index + 1 }}</td>
                    <td>{{ (Date(createdAt)).toLocaleString('en-CA') }}</td>
                    <td>{{ title }}</td>
                    <td>{{ content.substr(0,400) }}{{ content.length > 400 ? "..." : "" }}</td>
                    <td><a href="#" v-on:click="showEditForm(_id)">Edit</a></td>
                    <td><a href="#" v-on:click="deleteArticle(_id)">Delete</a></td>
                    <td><a href="#" @click="viewArticle(_id)">View Article</a></td>
                </tr>
            </table>
        </div>
        <div v-else>
            No articles yet.
        </div>
    </div>
</template>

<script>
    import axiosReq from "../../../config/axiosReq"
    export default {
        name: "articleList",
        data() {
            return {
                myArticles: []
            }
            
        },
        props: {
            trackEdit: Number
        },
        created() {
            this.getMyArticles();
        },
        watch: {
            trackEdit: {
                handler(val) {
                    if(val)
                    {
                        this.getMyArticles();
                    }                    
                },
                immediate: true
            }
        },
        methods: {
            getMyArticles() {
                axiosReq({
                    method: "GET",
                    url: `/api/users/myArticles`,
                    headers: {
                        token: this.$cookies.get('token')
                    }
                })
                .then(({data}) => {
                    console.log(data);
                    this.myArticles = data;
                })
                .catch((err) => {
                    console.log(err);
                    
                })

            },
            deleteArticle(id) {
                axiosReq({
                    method: "DELETE",
                    url: `/api/articles/${id}`,
                    headers: {
                        token: this.$cookies.get('token')
                    }
                })
                .then(() => {
                    this.getMyArticles();
                })
                .catch((err) => {
                    console.log(err);
                    
                })
            },
            showEditForm(id) {
                this.$emit('editArticle',id);
            },
            viewArticle(id) {
                this.$emit('viewArticle',id);
            }
        }
    }
</script>

<style scoped>

</style>