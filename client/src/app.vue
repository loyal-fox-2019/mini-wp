<template>
  <div>
    <LandingPage v-if="!isLogin" @loginStatus="status"> </LandingPage>
    <HomePage v-else @loginStatus="status"> </HomePage>
  </div>
</template>

<script>
import LandingPage from './views/LandingPage'
import HomePage from './views/HomePage'

export default {
  components: {
    LandingPage, HomePage
  },
  data() {
    return {
      isLogin: false,
      userId: ''
    }
  },
  methods: {
    status(e) {
      this.isLogin = e
    }
  },
  created() {
    if (localStorage.getItem('token')) {
      this.isLogin = true;

    } 
    else this.isLogin = false;
  }
}
</script>

<style>

</style>
