<template>
    <div>
        <h1>My Articles</h1>
        <div v-if="myArticles.length > 0">
            <!-- <table class="table">
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
            </table> -->

            <div class="card-columns">
                
                <div class="card" v-for="({_id, createdAt,updatedAt,featured_image,title,author,content} , index) in myArticles" :key="index">
                    <img class="card-img-top" :src="featured_image" alt="Featured image">
                    <div class="card-body">
                        <h5 class="card-title">{{ title }}</h5>
                        <p class="card-text">{{ content.substr(0,200) }}{{ content.length > 200 ? "..." : "" }}</p>                        
                    </div>
                    <div class="card-footer">
                        <div class="links">
                            <a href="#" @click="viewArticle(_id)">View</a>
                            <a href="#" v-on:click="showEditForm(_id)">Edit</a>
                            <a href="#" v-on:click="deleteArticle(_id)">Delete</a>
                        </div>
                        <small class="text-muted">Last updated {{ (Date(updatedAt)).toLocaleString('en-CA') }}</small>
                    </div>                    
                </div>
                
            </div>

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
                    for(let i=0;i<data.length;i++)
                    {
                        data[i].content = data[i].content.replace(/<\/?[^>]+>/ig, " ");
                    }
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
.card-img-top {
    width: 100%;
    height: 15vw;
    object-fit: cover;
}
.card {
    height: 35vw;
}
.card-footer {
    bottom: 0;
    position: absolute;
}
.links {
    display: flex;
    justify-content: space-evenly;
    text-align: center;
}
</style>