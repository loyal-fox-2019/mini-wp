<template>
  <div>
    <div v-if="login">
      <div v-if="form" style="margin-left: 70vh; margin-top: 20vh">
        <LoginForm @register="registerForm($event)" @login="logIn($event)" />
      </div>
      <div v-else style="margin-left: 70vh; margin-top: 20vh">
        <RegisterForm @login="registerForm($event)" @pageLogin="logIn($event)" />
      </div>
    </div>
    <div v-else-if="!login">
      <div>
        <Navbar @page="changePage($event)" />
      </div>
      <div v-if="page === 'all'">
        <AllArticle @article="changeSpecific($event)" />
      </div>
      <div v-else-if="page === 'mine'">
        <MyArticle @page="changeUpdate($event)" @article="changeSpecific($event)" />
      </div>
      <div v-else-if="page === 'write'" class="container">
        <WriteArticle @page="changePage($event)" />
      </div>
      <div v-else-if="page === 'update'" class="container">
        <UpdatePage :dataArticle="dataUpdate" @page="changePage($event)" />
      </div>
      <div v-else-if="page === 'specific'">
        <SpecificArticle :dataSpecific="dataSpecific" />
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import AllArticle from "./views/AllArticle";
import MyArticle from "./views/MyArticle";
import Navbar from "./components/Navbar";
import WriteArticle from "./views/WriteArticle";
import UpdatePage from "./components/UpdatePage";
import SpecificArticle from "./components/SpecificArticle";

export default {
  created() {
    this.checkToken();
  },
  data: function() {
    return {
      login: true,
      form: true,
      page: "all",
      dataUpdate: "",
      dataSpecific: ""
    };
  },
  components: {
    LoginForm,
    RegisterForm,
    AllArticle,
    MyArticle,
    Navbar,
    WriteArticle,
    UpdatePage,
    SpecificArticle
  },
  methods: {
    logIn: function(event) {
      this.login = event;
    },
    checkToken: function() {
      if (localStorage.getItem("access_token")) {
        this.login = false;
      } else {
        this.login = true;
      }
    },
    registerForm: function(event) {
      this.form = event;
    },
    changePage: function(event) {
      if (event === "log-out") {
        this.logOut();
      } else {
        this.page = event;
      }
    },
    logOut: function() {
      localStorage.clear();
      this.login = true;
    },
    changeUpdate: function(event) {
      this.dataUpdate = event;
      this.page = "update";
    },
    changeSpecific: function(event) {
      this.dataSpecific = event;
      this.page = "specific";
    }
  }
};
</script>

<style>
</style>