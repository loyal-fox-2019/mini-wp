<template>
  <div class="container">
    <form class="form-signin" action="#">
      <h2 class="form-signin-heading">sign in now</h2>
      <div class="login-wrap">
        <input
          type="email"
          class="form-control"
          placeholder="Email"
          autofocus=""
        />
        <input type="password" class="form-control" placeholder="Password" />
        <button class="btn btn-lg btn-login btn-block" type="submit" @click="setLogin"> 
          Sign in
        </button>
        <p>or you can sign in via oAuth</p>
        <div class="text-center">
          <a href="#" class="btn btn-primary">
            <i class="fa fa-facebook"></i>
            Facebook
          </a>
          <a href="#" class="btn btn-primary">
            <i class="fa fa-twitter"></i>
            Twitter
          </a>
        </div>
        <div class="registration text-center">
          Don't have an account yet?
          <a class="" href="#" @click="setRegister">
            Create an account
          </a>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  methods: {
    setLogin() {
      this.$emit('set-login')
    },
    setRegister() {
      this.$emit('set-register')
    },
  }
}
</script>

<style scoped>
@import '../assets/css/style-login.css';
</style>
