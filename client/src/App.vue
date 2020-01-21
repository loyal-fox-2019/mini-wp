<template>
  <div>
    <login-page @check-login-lagi="checkLogin" v-if="!loginStatus" :currentPage="currentPage"></login-page>
    <main-page v-if="loginStatus" :currentPage="currentPage" @check-login-lagi="checkLogin"></main-page>
  </div>
</template>

<script>
import LoginPage from "./components/pages/LoginPage";
import MainPage from "./components/pages/MainPage";

export default {
  name: "main-wrapper",
  components: {
    LoginPage,
    MainPage
  },
  data() {
    return {
      currentPage: "",
      loginStatus: false
    };
  },
  methods: {
    checkLogin() {
      this.loginStatus = !!localStorage.getItem("access_token");
      if (!this.loginStatus) {
        this.currentPage = "loginPage";
      } else {
        this.currentPage = "mainPage";
      }
    }
  },
  mounted() {
    this.checkLogin();
  }
};
</script>

<style>

</style>