<template>
  <div>
    <Navigation
      :loged-in="loggedIn"
      @logout="setLogout"
      @hide-detail="showHome"
      @show-add="showAdd"
      @show-login="showLogin"
    ></Navigation>
    <div class="nav-margin"></div>
    <main-page v-if="!login && !detailArticle && !addArticle" @show-detail="showDetail"></main-page>
    <login-page v-if="login && !detailArticle && !addArticle" @set-login="setLogin"></login-page>
    <article-page v-if="!login && detailArticle && !addArticle" :detail="article" @show-home="showHome"></article-page>
    <add-article v-if="!login && !detailArticle && addArticle" @show-home="showHome"></add-article>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import LoginPage from "./views/Login-page.vue";
import MainPage from "./views/Main-page.vue";
import ArticlePage from "./views/Article-page";
import AddArticle from "./views/Add-article";
export default {
  name: "MiniWP",
  components: {
    Navigation,
    LoginPage,
    MainPage,
    ArticlePage,
    AddArticle
  },
  data: function() {
    return {
      loggedIn: false,
      detailArticle: false,
      addArticle: false,
      login: false,
      article: null
    };
  },
  methods: {
    showLogin() {
      this.login = true;
      this.addArticle = false;
      this.detailArticle = false;
    },
    setLogin() {
      this.loggedIn = true;
      this.login = false;
    },
    setLogout() {
      this.loggedIn = false;
      this.addArticle = false;
      this.detailArticle = false;
      this.login = true;
      localStorage.clear();
      this.$gAuth.signOut()
    },
    showDetail(payload) {
      this.article = payload;
      this.detailArticle = true;
      this.login = false;
    },
    showHome() {
      this.detailArticle = false;
      this.addArticle = false;
      this.login = false;
    },
    showAdd() {
      this.addArticle = true;
      this.login = false;
      this.detailArticle = false;
    },
    checkLogin() {
      if (localStorage.getItem("token")) {
        this.setLogin();
      }
    }
  },
  created() {
    this.checkLogin();
  }
};
</script>

<style scoped>
.nav-margin {
  height: 80px;
}
</style>
