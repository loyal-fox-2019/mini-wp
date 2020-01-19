<template>
  <div>
    <Navbar @logout="loginStatus" :status="isLogin"></Navbar>
    <LoginPage @login="loginStatus" v-if="!isLogin"></LoginPage>
    <AfterLogin v-else></AfterLogin>
  </div>
</template>

<script>
import LoginPage from "./views/LoginPage";
import Navbar from "./components/Navbar";
import AfterLogin from "./views/AfterLogin";
export default {
  name: "App",
  components: {
    Navbar,
    LoginPage,
    AfterLogin
  },
  data() {
    return {
      isLogin: false
    };
  },
  methods: {
    checkLogin() {
      if (localStorage.getItem("token")) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    },
    loginStatus(value) {
      if (value === "logout") {
        localStorage.clear();
        this.checkLogin();
      } else {
        this.checkLogin();
      }
    }
  },
  created() {
    this.checkLogin();
  }
};
</script>

<style>
</style>