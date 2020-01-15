<template>
   <form class="flex flex-col shadow p-16 rounded bg-white" @submit.prevent="submitFormLogin">
      <label class="mb-4 font-medium text-xl text-gray-600 hover:text-teal-500 cursor-pointer" for="email">Email</label>
      <input type="email" id="email" class="py-1 mb-8 border-b-2" v-model="email">

      <label for="password" class="mb-4 font-medium text-xl text-gray-600 hover:text-teal-500 cursor-pointer">Password</label>
      <input type="password" id="password" class="py-1 mb-8 border-b-2" v-model="password">

      <input type="Submit" value="Login" class="px-3 py-2 bg-teal-500 rounded text-white font-semibold text-xl cursor-pointer">
   </form>
</template>

<script>
import axios from '../services/server'

export default {
   name: 'login',

   data() {
      return {
         email: '',
         password: ''
      }
   },

   methods: {
      submitFormLogin: async function() {
         console.log(axios)
         try {
            const {data} = await axios.post('/author/login', {
               email: this.email,
               password: this.password
            })

            localStorage.token = data.token
            console.log(1, localStorage.token)
            Swal.fire({
               position: 'center',
               icon: 'success',
               title: 'Login success',
               showConfirmButton: false,
               timer: 1000
            })
            console.log(2, localStorage.token)

            this.$emit('loginLoggingIn', true)
            this.$router.push({name: 'articleList'})
         }
         catch (error) {
            Swal.fire({
               position: 'center',
               icon: 'error',
               title: 'Login has failed',
               text: error.response.data.message,
               showConfirmButton: false,
               timer: 2300
            })
         }
      }
   }
}
</script>

<style scoped>

</style>