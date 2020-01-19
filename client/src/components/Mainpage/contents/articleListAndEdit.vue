<template>
    <div>
        <ArticleList v-show="!isEdit" @editArticle="showEditForm" :trackEdit="trackEdit" @viewArticle="viewArticle"></ArticleList>
        
        <EditArticle v-show="isEdit" :id="editId" @showMyList="showList"></EditArticle>
    </div>
</template>

<script>
    import ArticleList from "./articleList"
    import EditArticle from "./editArticle";
    export default {
        name: "ArticleListAndEdit",
        data() {
            return {
                isEdit: false,
                editId: "",
                trackEdit: 0
            }
        },
        methods: {
            showEditForm(id) {
                this.isEdit = true;
                this.editId = id;
            },
            showList() {
                this.trackEdit++;
                this.isEdit = false; 
            },
            viewArticle(id) {
                this.$emit('viewArticle',id)
            }
        },
        components: {
            ArticleList,
            EditArticle
        }

    }
</script>

<style scoped>

</style>