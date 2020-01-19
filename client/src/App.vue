<template>
  <div>
    <navbar @checkLogin="setLogout" v-if="isLogin"></navbar>
    <loginRegister @checkLogin="setLogin" v-if="!isLogin"></loginRegister>
    <!-- <mainPage></mainPage> -->
    <addArticle></addArticle>
  </div>
</template>


<script>
import HalamanLoginRegister from "./views/HalamanLoginRegister";
import navbar from "./components/navbar";
import mainPage from "./views/mainPage";
import addArticle from "./components/addArticle";

export default {
  name: "App.vue",
  data() {
    return {
      isLogin: false,
      addArticle: false
    };
  },
  components: {
    loginRegister: HalamanLoginRegister,
    navbar,
    mainPage,
    addArticle
  },
  methods: {
    setLogin() {
      this.isLogin = true;
    },
    setLogout() {
      this.isLogin = false;
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