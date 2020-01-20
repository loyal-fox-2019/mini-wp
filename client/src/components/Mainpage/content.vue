<template>
    <div class="col-10 content">
        <NewArticle v-if="visibility.newArticle" @viewArticle="viewArticle"></NewArticle >
        <ArticleListAndEdit  v-if="visibility.articleList" @viewArticle="viewArticle"></ArticleListAndEdit>
        <viewArticle v-if="visibility.viewArticle" :id="viewId"></viewArticle>
        <allArticles v-if="visibility.allArticles" @viewArticle="viewArticle"></allArticles>
    </div>
</template>

<script>
    import NewArticle from "./contents/newArticle"
    import ArticleListAndEdit from "./contents/articleListAndEdit"
    import viewArticle from "./contents/viewArticle";
    import allArticles from "./contents/allArticles";
    export default {
        name: "Content",
        data() {
            return {
                visibility: {
                    newArticle: false,
                    articleList: false,
                    viewArticle: false,
                    allArticles: false
                },
                viewId: ""
            }
        },
        methods: {
            hideAll() {
                for(let element in this.visibility)
                {
                    this.visibility[element] = false;
                }
            },
            showOne(el) {
                this.visibility[el] = true;
            },
            viewArticle(id) {
                this.viewId = id;
                this.$emit('switchTab','viewArticle');
            }
        },
        props: {
            tabToShow: String
        },
        watch: {
            tabToShow: {
                handler(newTab) {
                    console.log("newTab:",newTab);
                    this.hideAll();
                    this.showOne(newTab);
                },
                immediate: true
            }
        },
        components: {
            NewArticle,
            ArticleListAndEdit,
            viewArticle,
            allArticles
        }
    }
</script>

<style scoped>
.content {
    overflow-y: auto;
    height: calc(100vh - 50px);
    padding-top: 25px;
    padding-left: 25px;
    line-height: 25px;
}
</style>