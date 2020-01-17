<template>
  <div class="container">
    <form class="form-signin" action="#" @submit.prevent="login">
      <h2 class="form-signin-heading">sign in now</h2>
      <div class="login-wrap">
        <div v-for="(error, i) in errors" :key="i" class="alert alert-danger text-center" role="alert">
          {{error}}
        </div>
        <input
          type="email"
          class="form-control"
          placeholder="Email"
          autofocus=""
          required
          v-model="email"
        />
        <input type="password" class="form-control" placeholder="Password" required v-model="password"/>
        <button class="btn btn-lg btn-login btn-block" type="submit"> 
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
import axios from '../config/api'
export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
      errors: []
    }
  },
  methods: {
    setLogin() {
      this.$emit('set-login')
    },
    setRegister() {
      this.$emit('set-register')
    },
    login() {
      this.errors = []
      axios({
        method: 'POST',
        url: `/login`,
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          this.email = ''
          this.password = ''
          this.setLogin()
        })
        .catch(err => {
          this.errors.push(err.response.data.message)
        })
    }
  }
}
</script>

<style scoped>
@import '../assets/css/style-login.css';
</style>
