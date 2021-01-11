<template>
  <div class="container">
    <form class="form-signin" @submit.prevent="register">
      <h2 class="form-signin-heading">register now</h2>
      <div class="login-wrap">
        <div v-for="(error, i) in errors" :key="i" class="alert alert-danger text-center" role="alert">
          {{error}}
        </div>
        <p>Enter your account details below</p>
        <input
          type="text"
          class="form-control"
          placeholder="User Name"
          autofocus=""
          required
          v-model="username"
        />
        <input
          type="email"
          class="form-control"
          placeholder="Email"
          autofocus=""
          required
          v-model="email"
        />
        <input type="password" class="form-control" placeholder="Password" required v-model="password"/>
        <input
          type="password"
          class="form-control"
          placeholder="Re-type Password"
          required
          v-model="retype"
        />
        <label class="checkbox">
          <input type="checkbox" v-model="tos" value="agree this condition" /> I agree to
          the Terms of Service and Privacy Policy
        </label>
        <button class="btn btn-lg btn-login btn-block" type="submit">
          Submit
        </button>

        <div class="registration text-center">
          Already Registered?
          <a href="login" @click.prevent="setRegister">
            Login
          </a>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from '../config/api'
export default {
  name: 'RegisterForm',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      retype: '',
      tos: null,
      errors: []
    }
  },
  methods: {
    setLogin() {
      this.$emit("set-login");
    },
    setRegister() {
      this.$emit('set-register')
    },
    register() {
      this.errors = []
      if(!this.tos) {
        this.errors.push('you have to agree to our term of services')
      }
      if(this.password != this.retype) {
        this.errors.push('retype corect password')
      }
      if(this.errors.length > 0) {
        return
      }
      axios({
          method: 'POST',
          url: `/register`,
          data: {
            username: this.username,
            email: this.email,
            password: this.password
          }
        })
          .then(({ data }) => {
            this.username = ''
            this.email = ''
            this.password = ''
            this.retype = ''
            this.tos = false
            localStorage.setItem("token", data.token)
            this.setLogin()
            // this.setRegister()
          })
          .catch(err => {
            this.errors = err.response.data.message
          })
    }
  }
}
</script>

<style scoped>
@import '../assets/css/style-login.css';
</style>
