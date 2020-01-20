<template>
  <div>
    <!-- <user @login="loginStatus" v-if="!isLogin"></user> -->

    <user @login="checkLogin" v-if="isLogin == false"></user>

    <mainPage v-if="isLogin" @logout="logout"></mainPage>
    <!-- <section v-else>
      <navigation :upload="upload" @logout="loginStatus" @change-page="changePage"></navigation>
      <div v-if="!upload" class="row">
        <mainpage></mainpage>
      </div>
      <upload @back-to-home="backToHome" v-if="upload"></upload>
      <sellButton @change-page="changePage" v-if="!upload"></sellButton>
    </section>-->
  </div>
</template>

<script>
import user from "./components/userpage.vue";
import mainPage from "./components/mainPage.vue";

export default {
  name: "App",
  components: {
    user,
    mainPage
  },
  data() {
    return {
      isLogin: false,
      upload: false
    };
  },
  methods: {
    backToHome() {
      this.upload = false;
    },
    logout() {
      this.isLogin = false;
    },
    checkLogin() {
      if (!localStorage.getItem("token")) {
        this.isLogin = false;
      } else {
        this.isLogin = true;
      }
    },
    changePage(payload) {
      if (payload === "upload") {
        this.upload = true;
      } else if (payload === "mainpage") {
        this.upload = false;
      }
    },
    loginStatus(value) {
      if (value === "logout") {
        localStorage.removeItem("token");
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


<style scoped>
.login {
  background-color: palegreen;
}
</style>