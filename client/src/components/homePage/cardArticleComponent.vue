<template lang="html">
    <sui-card id="cardArticle">
        <sui-card-header>
            <i class="remove icon" @click="remove"></i>
            <i class="pencil icon" @click="showContent(true)"></i>
        </sui-card-header>
        <sui-card-content @click.native="showContent(false)" id="thumbnail">
            <a>
                <sui-image :src="article.featured_image"/>
            </a>
        </sui-card-content>
        <sui-card-content @click.native="showContent(false)">
            <small id="created_at">{{createdDate}}</small>
            <p>
                <sui-card-header><a>{{article.title}}</a></sui-card-header>
            </p>
        </sui-card-content>
        <sui-card-content>
            <sui-card-meta>
                <sui-label id="tag"
                           color="teal"
                           v-for="tag, index in article.tags"
                           :key="index"
                           @click="searchTag(tag)">
                    #{{tag}}
                </sui-label>
            </sui-card-meta>
        </sui-card-content>
    </sui-card>
</template>

<script>
    import {instance} from "../../config/axiosConfig";

    export default {
        name: "cardArticleComponent",
        props: {
            article: Object
        },
        computed: {
            createdDate: function () {
                let date = new Date(this.article.created_at);
                return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}
                ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            }
        },
        methods: {
            remove: function () {
                this.$dialog
                    .confirm('Delete this data ?')
                    .then(dialog => {
                        instance({
                            method: 'delete',
                            url: `/articles/${this.article._id}`,
                            headers: {
                                Authorization: "token " + localStorage.token
                            }
                        }).then(({data}) => {
                            console.log(data.message);
                            this.$emit('clicked');
                            this.$toast.success({
                                title: 'Delete',
                                message: data.message
                            });
                            dialog.close();
                        }).catch(err => {
                            console.log({err});
                            this.$toast.error({
                                title: 'Error',
                                message: err.response.data.message
                            });
                            dialog.close();
                        })
                    })
                    .catch(err => {
                        this.$toast.info({
                            title: 'Cancel',
                            message: err.response.data.message
                        });
                        err.close();
                    })
            },
            showContent: function (isEdit) {
                this.$emit('showContent', isEdit);
                this.$emit('data', this.article);
            },
            searchTag: function (tag) {
                this.$emit('searchTag', tag);
            }
        }
    }
</script>

<style scoped>
    #cardArticle {
        width: 225px;
    }

    #created_at {
        color: gray;
    }

    .icon {
        color: gray;
        margin: 5px 0px 10px 10px;
        cursor: pointer;
    }

    #thumbnail {
        padding: 0;
        overflow: hidden;
    }

    #tag {
        margin: 1px;
        cursor: pointer;
    }
</style>