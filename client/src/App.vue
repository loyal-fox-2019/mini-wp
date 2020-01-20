<template>
  <div>
    <span v-if="!isLoggedIn">
      <Frontpage @loggedIn="login" v-show="!isLoggedIn"></Frontpage>
    </span>
    <span v-else>
      <Homepage @loggedIn="login" v-show="isLoggedIn"></Homepage>
    </span>
  </div>
</template>

<script>
import Frontpage from "./components/views/Frontpage";
import Homepage from "./components/views/Homepage";
export default {
  name: "App",
  data() {
    return {
      token: localStorage.getItem("token"),
      isLoggedIn: false
    };
  },
  components: {
    Frontpage,
    Homepage
  },
  created() {
    if (localStorage.getItem("token")) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  },
  methods: {
    login(value) {
      this.isLoggedIn = value;
    }
  }
};
</script>

<style scoped>
</style>