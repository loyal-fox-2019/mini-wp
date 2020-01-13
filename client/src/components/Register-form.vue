<template>
  <div class="container">
    <form class="form-signin" action="">
      <h2 class="form-signin-heading">register now</h2>
      <div class="login-wrap">
        <p>Enter your account details below</p>
        <input
          type="text"
          class="form-control"
          placeholder="User Name"
          autofocus=""
        />
        <input
          type="email"
          class="form-control"
          placeholder="Email"
          autofocus=""
        />
        <input type="password" class="form-control" placeholder="Password" />
        <input
          type="password"
          class="form-control"
          placeholder="Re-type Password"
        />
        <label class="checkbox">
          <input type="checkbox" value="agree this condition" /> I agree to
          the Terms of Service and Privacy Policy
        </label>
        <button class="btn btn-lg btn-login btn-block" type="submit">
          Submit
        </button>

        <div class="registration text-center">
          Already Registered?
          <a href="#" @click="setRegister">
            Login
          </a>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'RegisterForm',
  methods: {
    setRegister() {
      this.$emit('set-register')
    }
  }
}
</script>

<style scoped>
@import '../assets/css/style-login.css';
</style>
