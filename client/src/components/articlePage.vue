<template>
    <div class="col-9" id="infoCol">
        <div id="articlePage">
            <p class="h3">Articles</p>
            <div class="d-flex justify-content-between">
                <div>
                    <p class="h6">Published <kbd>{{this.articles.length}}</kbd></p>
                </div>
                <div>
                    <button type="button" class="btn btn-success btn-sm mb-2" @click.prevent="page='addArticle'">Add Article</button>    
                </div>
            </div>
            <form>
                <div class="form-group">
                    <input type="text" class="form-control" id="searchArticle" placeholder="Search Article" v-model="search">
                </div>
            </form>
            <div class="row">
                <div class="card-group col-4" v-for="article in filterArticle" v-bind:key="article._id">
                    <div class="card text-white bg-info mb-3" style="max-width: 18rem;">
                        <div class="card-header">Article {{article.created_At}}</div>
                        <img v-bind:src="article.file" class="card-img-top" style="width: 100px;" alt="...">
                        <div class="card-body" style="height: 200px; overflow-y: scroll;">
                            <h5 class="card-title">{{article.title}}</h5>
                            <p class="card-text">{{article.content}}.</p>
                        </div>
                        <a href="#" class="btn btn-secondary" v-on:click.prevent="findOneArticle(article._id)">Edit</a>
                        <a href="#" class="btn btn-warning" v-on:click.prevent="deleteArticle(article._id)">Delete</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        this.findArticle();
    },
    computed: {
        filterArticle() {
            return this.articles.filter(article => {
                return article.title.toLowerCase().includes(this.search.toLowerCase());
            });
        }
    },
    data() {
        return {
            // htmlPort: 'http://localhost:3000',
            search: '',
            articles: '',
        }
    },
    methods: {
        findArticle() {
            axios({
                url: `http://localhost:3000/article`,
                method: 'get',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(({ data }) => {
                // this.articles = [];
                this.articles = data;
            })
            .catch(err => {
                console.log(err.message);
            });
        },

    }
}
</script>

<style scoped>

</style>