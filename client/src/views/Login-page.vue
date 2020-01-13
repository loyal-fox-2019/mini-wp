<template>
  <div>
    <login-form v-show="!registered" @set-login="setLogin" @set-register="setRegister"></login-form>
    <register-form v-show="registered" @set-register="setRegister"></register-form>
  </div>
</template>

<script>
import LoginForm from '../components/Login-form.vue'
import RegisterForm from '../components/Register-form.vue'
export default {
  name: 'LoginPage',
  components: {
    LoginForm,
    RegisterForm
  },
  data() {
    return {
      registered: false
    }
  },
  methods: {
    setLogin() {
      this.$emit('set-login')
    },
    setRegister() {
      this.registered = !this.registered
    }
  }
}
</script>

<style scoped>
</style>
