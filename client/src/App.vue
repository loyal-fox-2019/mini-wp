<template>
  <div>
    <loginRegister @checkLogin="setLogin" v-if="!isLogin"></loginRegister>
    <navbar @checkLogin="setLogout" @submitArticle="createArticle" v-if="isLogin"></navbar>
    <leftNav v-if="isLogin" @showPost="showingPost"></leftNav>
    <mainPage
      v-if="isLogin && !addArticle && !editArticle"
      @updateArticle="editedArticle"
      @submitArticle="createArticle"
    ></mainPage>
    <addArticle @getBack="showingPost" @submitArticle="setArticle" v-if="addArticle && isLogin"></addArticle>
    <updateArticle @getBack="showingPost" @submitArticle="setArticle" v-if="editArticle && isLogin"></updateArticle>
  </div>
</template>


<script>
import HalamanLoginRegister from "./views/HalamanLoginRegister";
import navbar from "./components/navbar";
import mainPage from "./views/mainPage";
import leftNav from "./components/leftNav";
import addArticle from "./components/addArticle";
import updateArticle from "./components/updateArticle";

export default {
  name: "App.vue",
  data() {
    return {
      isLogin: false,
      addArticle: false,
      editArticle: false
    };
  },
  components: {
    loginRegister: HalamanLoginRegister,
    navbar,
    mainPage,
    addArticle,
    leftNav,
    updateArticle
  },
  methods: {
    setLogin() {
      this.isLogin = true;
    },
    setLogout() {
      this.isLogin = false;
    },
    setArticle() {
      this.addArticle = false;
      this.editArticle = false;
    },
    createArticle() {
      this.addArticle = true;
    },
    showingPost() {
      this.addArticle = false;
      this.editArticle = false;
    },
    editedArticle() {
      this.editArticle = true;
    }
  },
  created() {
    if (localStorage.getItem("token")) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }
};
</script>

<style scoped>
</style>