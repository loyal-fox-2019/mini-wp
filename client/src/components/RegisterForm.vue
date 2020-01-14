<template>
  <div class="container mx-auto h-screen flex">
    <div class="mx-auto self-center w-full max-w-xs">
      <h4 class="text-center p-4 font-bold text-gray-700">Register a new account</h4>
      <form
        @submit.prevent="submitRegister"
        @keyup.enter="submitRegister"
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2" 
            for="reg-username"
            > Username
          </label>
          <input
            id="reg-username" 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text" 
            placeholder="username"
            v-model="username">
        </div>
        <div class="mb-4">
          <label 
            for="reg-email"
            class="block text-gray-700 text-sm font-bold mb-2"
            > Email
          </label>
          <input 
            id="reg-email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="example@mail.com"
            v-model="email">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2"
            for="reg-password">
            Password
          </label>
          <input
            id="reg-password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="******"
            autocomplete="on"
            v-model="password">
        </div>
        <div class="flex-col items-center justify-between">
          <button
            @click.prevent="submitRegister"
            class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
            type="button"
            > Register
          </button>
        </div>
        <div class="flex items-center mt-4">
          <span
            class="mx-auto text-sm text-gray-500"
            >Already have an account? 
            <a href="#"
              class="text-blue-500 hover:text-blue-900"
              @click.prevent="toLogin"
              > Log in
            </a>
          </span>
        </div>
      </form>
      <p class="text-center text-gray-500 text-xs"
       > &copy;2019 Deprak. All rights reserved.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  components: {
  },
  data () {
    return {
      username: '',
      email: '',
      password: '',
      warning: false,
      errorMsg: ''
    }
  },
  methods: {
    toLogin() {
      this.$emit('setForm', 'login')
    },
    submitRegister() {
      ax({
        method: 'post',
        url: '/user/register',
        data: {
          username: this.username,
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          this.$emit('setIsLogin', true)
        })
        .catch(({ response })  => {
          console.log(response.data.errors.message, '<<<')
          this.errorMsg = errorHandler(response)
          this.warning = true
        })
    },
    closeWarning() {
      this.warning = false
    }
  }
}
</script>

<style>

</style>