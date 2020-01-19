<template>
    <div class="container-fluid">
        <div class="row">
            <!-- SIDEBAR -->
            <div class="col-md-3" id="sidebar">
                <div class="dashboard-subtitle">Manage</div>
                <div class="row dashboard-items" @click="goToList">
                    <div class="col-2">
                        <i class="fas fa-align-left fa-lg dashboard-img"></i>
                    </div>
                    <div class="col-10">Blog Posts</div>
                </div>
                <div class="row dashboard-items"  @click="goToWrite">
                    <div class="col-2">
                        <i class="far fa-file-alt fa-lg dashboard-img"></i>
                    </div>
                    <div class="col-10">Write Blog</div>
                </div>
            </div>

            <div class="col-md-9" id="content">
                <!-- LIST ARTICLES -->
                <listArticle class="content" v-if="showList" @goToDetail="getDetail" @update="goToEdit"></listArticle>

                <!-- WRITE BLOG -->
                <writeArticle class="content" v-if="showWrite" @doneWrite="goToList" :articleEdit="articleData" :yesEdit="isEdit"></writeArticle>

                <!-- DETAIL ARTICLE -->
                <detailArticle class="content" v-if="showDetail" :articleId="detailId"></detailArticle>
            </div>
        </div>
    </div>
</template>

<script>
import listArticle from './listArticle'
import writeArticle from './writeArticle'
import detailArticle from './detailArticle'
export default {
    name: 'sidebar',
    data() {
        return {
            showList: false,
            showWrite: false,
            showDetail: false,
            detailId: null,
            isEdit: false,
            articleData: null
        }
    },
    components: {
        listArticle,
        writeArticle,
        detailArticle
    },
    mounted(){
        this.goToList()
    },
    methods: {
        goToList: function(){
            this.showList = true
            this.showWrite = false
            this.showDetail = false
        },
        goToWrite: function(){
            this.showList = false
            this.showWrite = true
            this.showDetail = false
            this.isEdit = false
        },
        getDetail: function(id) {
            this.detailId = id
            this.showList = false
            this.showWrite = false
            this.showDetail = true
        },
        goToEdit: function(payload){
            this.articleData = payload
            this.showList = false
            this.showWrite = true
            this.showDetail = false
            this.isEdit = true
        }
    }
}
</script>

<style scoped>
    #sidebar {
        height: 100vh;
        overflow: auto;
    }
    
    .dashboard-img {
    padding: 0px 15px 0px 5px;
    }

    .dashboard-subtitle{
        padding: 5px;
        margin-top: 10px;
        font-size: 17px;
        font-weight: bold;
    }

    .dashboard-items{
        font-size: 18px;
        text-align: left;
        vertical-align: middle;
        padding: 13px 20px;
        font-weight: bold;
    }

    .dashboard-items:hover {
        background-color: rgb(170, 170, 170);
        cursor: pointer;
        color: rgb(10, 51, 54);
    }

    #content {
        background-color: rgb(240, 240, 240);
        height: 100vh;
        overflow: auto;
    }

</style>