<template>
  <div>
    <login-form v-if="!registered" @set-login="setLogin" @set-register="setRegister"></login-form>
    <register-form v-if="registered" @set-register="setRegister" @set-login="setLogin"></register-form>
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
