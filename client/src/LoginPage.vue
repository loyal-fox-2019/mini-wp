<template>
  <div>
    <b-navbar toggleable="lg" type="dark" :style="{'background-color':'#006088'}" class="p-0">
      <b-navbar-brand href="#" class="ml-3 mr-0" style="color: white;">
        <i class="fab fa-vuejs"></i>
        <span class="font-weight-bold" style="font-size:16px;font-family: 'Nunito', sans-serif;">MiniVipi</span>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="#">
            <span class="text-light" style="font-size:14px;" @click="register">Sign Up</span>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-container fluid class="vh-100" style="background-color:#F6F7F7;">
      <b-row class="justify-content-center">
        <b-col cols="3">
          <h4 class="mt-5 mb-3 text-center font-weight-light">Log in to your account</h4>
          <login-form @authenticated="getAuth"></login-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import LoginForm from './components/LoginForm';
import Fontawesome from '@fortawesome/fontawesome-free/css/all.css';

export default {
  components: {
    LoginForm,
  },
  data() {
    return {
      isLogin: false,
      authenticated: false,
    }
  },
  methods: {
    getAuth(val) {
      this.authenticated = val;
      this.$emit("authenticated", this.authenticated);
      if (val) {
        this.$router.replace({ name: "user-page" });
      }
    },
    register() {
      this.$router.replace({ name: "register-page" });
    }
  }
}
</script>

<style scoped>
  .nav-item:hover {
    background-color: #2980b9;
  }
</style>