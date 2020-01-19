<template>
  <div>
    <navbar></navbar>
    <loginRegister @checkLogin="setLogin" v-if="!isLogin"><loginRegister/>
  </div>
</template>


<script>
import HalamanLoginRegister from "./views/HalamanLoginRegister";
import navbar from "./components/navbar";

export default {
  name: "App.vue",
  data() {
    return {
      isLogin: false
    };
  },
  components: {
    loginRegister: HalamanLoginRegister,
    navbar
  },
  methods: {
    setLogin() {
      this.isLogin = true;
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