<template>
    <div class="row" id="rowMenuInfo">
        <menuBar @signOut='signOut' @listPage='toPage($event)' ></menuBar> <!-- listen to menuBar component -->
        <articlePage v-if="page === 'article'"></articlePage>
        <articleAddPage v-if="page === 'articleAddPage'"></articleAddPage>
        <mainPage v-if="page === 'main'"></mainPage>
        <aboutPage v-if="page === 'about'"></aboutPage>
    </div>
</template>

<script>
import menuBar from '../components/menuBar.vue';
import articlePage from '../components/articlePage.vue';
import articleAddPage from '../components/articleAddPage.vue';
import mainPage from '../components/mainPage.vue';
import aboutPage from '../components/aboutPage.vue';

export default {
    components: {
        menuBar,
        articlePage,
        articleAddPage,
        mainPage,
        aboutPage,
    },
    data() {
        return {
            page: ''
        }
    },
    methods: {
        toPage(page) {
            this.page = page;
        },
        signOut() {
            localStorage.removeItem('token');
            this.$emit('signOut');
        }
    }
}
</script>

<style scoped>

</style>