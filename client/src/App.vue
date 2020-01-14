<template>
  <div>
    <Navigation v-show="loggedIn" @logout="setLogout" @hide-detail="showHome" @show-add="showAdd"></Navigation>
    <div class="nav-margin"></div>
    <login-page v-show="!loggedIn" @set-login="setLogin"></login-page>
    <main-page v-show="loggedIn && !detailArticle && !addArticle" @show-detail="showDetail"></main-page>
    <article-page v-show="loggedIn && detailArticle"></article-page>
    <add-article v-show="loggedIn && addArticle"></add-article>
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue'
import LoginPage from './views/Login-page.vue'
import MainPage from './views/Main-page.vue'
import ArticlePage from './views/Article-page'
import AddArticle from './views/Add-article'
export default {
  components: {
    Navigation,
    LoginPage,
    MainPage,
    ArticlePage,
    AddArticle
  },
  data: function() {
    return {
      loggedIn: true,
      detailArticle: false,
      addArticle: false
    };
  },
  methods: {
    setLogin() {
      this.loggedIn = true
    },
    setLogout() {
      this.loggedIn = false
    },
    showDetail() {
      this.detailArticle = true
    },
    showHome() {
      this.detailArticle = false
      this.addArticle = false
    },
    showAdd() {
      this.addArticle = true
    }
  }
}
</script>

<style scoped>
.nav-margin {
  height: 80px;
}
</style>
