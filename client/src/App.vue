<template>
  <div>
    <home-page @checkUser="checkUser" v-if="isLoggedIn"></home-page>
    <landing-page @checkUser="checkUser" v-else></landing-page>
  </div>
</template>

<script>
import landingPage from "./pages/LandingPage";
import homePage from "./pages/HomePage";

export default {
  data: function () {
    return {
      isLoggedIn: false
    };
  },
  components: {
    landingPage,
    homePage
  },
  methods: {
    checkUser: function() {
      if (localStorage.access_token) {
        this.isLoggedIn = true
      } else {
        this.isLoggedIn = false
      }
    }
  },
  mounted(){
    if (localStorage.access_token) {
      this.isLoggedIn = true
    } else {
      this.isLoggedIn = false
    }
  }
};
</script>

<style>

</style>