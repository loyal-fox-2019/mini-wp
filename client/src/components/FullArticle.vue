<template>
    <div>
        <div class="row mt-5">
            <div class="col col-md-4">
                <img v-bind:src="fullArticle.featured_image" alt="featured_image" width="500" height="400">
            </div>
            <div class="col col-md-8">
                <h2>{{fullArticle.title}}</h2>
                <h5>{{fullArticle.description}}</h5>
                <p v-html="fullArticle.content"></p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            article: []
        }
    },
    props: ['fullArticle']
}
</script>

<style lang="css" scoped>
    
</style>