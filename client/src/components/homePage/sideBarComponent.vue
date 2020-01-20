<template>
    <div>
        <sui-tab :active-index="tabActive" :menu="{ vertical: true, fluid: true, tabular: true }" id="suiTab">
            <sui-tab-pane
                    title="List Article"
                    id="list-article">
                <search-component @search="listOfArticle"></search-component>
                <message-component
                        :header="header"
                        :content="contentMsg"
                        :visible="visible">
                </message-component>
                <sui-card-group :items-per-row="3" id="cardContainer">
                    <card-article-component
                            v-for="article in articles"
                            :key="article._id"
                            :article="article"
                            @clicked="listOfArticle"
                            @showContent="showContent"
                            @data="selectedArticle"
                            @searchTag="listOfArticle"/>
                </sui-card-group>
            </sui-tab-pane>
            <sui-tab-pane
                    title="New Article"
                    id="new-article">
                <input-article-component @clicked="listOfArticle"/>
            </sui-tab-pane>
        </sui-tab>
        <content-component
                v-if="contentVisible"
                @dismiss="showContent"
                :data="article"
                @updateData="listOfArticle"
                :editVisibility="editVisibility"
        />
    </div>
</template>

<script>
    import cardArticleComponent from "./cardArticleComponent";
    import {instance} from "../../config/axiosConfig";
    import inputArticleComponent from "./inputArticleComponent";
    import searchComponent from "./searchComponent";
    import messageComponent from "../messageComponent";
    import contentComponent from "./contentComponent";

    export default {
        name: "sideBarComponent",
        data() {
            return {
                editVisibility: false,
                articles: [],
                header: null,
                contentMsg: null,
                visible: false,
                contentVisible: false,
                article: null,
                tabActive: 0,
                tagKey: null
            }
        },
        methods: {
            listOfArticle: function (data) {
                let url = "";

                if (!data){
                    url = '/articles';
                } else {
                    url = `/articles/${data}`;
                }

                instance({
                    method: 'get',
                    url: url,
                    headers: {
                        Authorization: "token " + localStorage.token
                    }
                }).then(({data}) => {
                    if (data.length > 0) {
                        this.articles = data.reverse();
                    } else {
                        this.articles = [];
                    }
                    this.searchArticle(data);
                }).catch(err => {
                    console.log(err.response.data.message)
                })
            },
            searchArticle: function (data) {
                this.contentMsg = `found ${data.length} items`;
                this.visible = true;
                setTimeout(() => {
                    this.visible = false;
                }, 2000);
            },
            showContent: function (isEdit) {
                if (this.contentVisible) {
                    this.contentVisible = false;
                } else {
                    this.contentVisible = true;
                }
                this.editVisibility = isEdit
            },
            selectedArticle: function (data) {
                this.article = data;
            }
        },
        mounted() {
            this.listOfArticle();
        },
        components: {
            cardArticleComponent,
            inputArticleComponent,
            searchComponent,
            messageComponent,
            contentComponent
        },
    }
</script>

<style scoped>
    #cardContainer {
        margin-top: 5px;
        padding-top: 5px;
    }
</style>