<template>
  <div>
    <Navigation v-show="loggedIn" @logout="setLogout"></Navigation>
    <login-page v-show="!loggedIn" @set-login="setLogin"></login-page>
    <main-page v-show="loggedIn"></main-page>
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue'
import LoginPage from './views/Login-page.vue'
import MainPage from './views/Main-page.vue'
export default {
  components: {
    Navigation,
    LoginPage,
    MainPage
  },
  data: function() {
    return {
      loggedIn: true
    };
  },
  methods: {
    setLogin() {
      this.loggedIn = true
    },
    setLogout() {
      this.loggedIn = false
    }
  }
}
</script>

<style>
</style>
