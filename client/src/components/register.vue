<template>
  <!-- <div class="flex flex-col">
     <form class="flex flex-col font-semibold p-6 border border-indigo-200 shadow" @submit.prevent="submitFormRegister">
      <div class="mb-4 flex flex-col">
         <label class="mb-2 text-lg">Username</label>
         <input type="text" class="border-2 border-indigo-200" v-model="username">
      </div>

      <div class="mb-4 flex flex-col">
        <label class="mb-2 text-lg">Email</label>
        <input type="email" class="border-2 border-indigo-200" v-model="email">
      </div>

      <div class="mb-4 flex flex-col">
        <label class="mb-2 text-lg">Password</label>
        <input type="password" class="border-2 border-indigo-200" v-model="password">
      </div>
      
      <input type="submit" class="bg-teal-500 py-1 px-2 rounded text-white font-semibold" value="Register">
     </form>
  </div> -->
   <form class="flex flex-col shadow py-16 px-24 rounded bg-white" @submit.prevent="submitFormRegister">
      <label class="mb-4 font-medium text-xl text-gray-600 hover:text-teal-500 cursor-pointer" for="username">Username</label>
      <input type="text" id="username" class="py-1 mb-8 border-b-2" v-model="username">

      <label class="mb-4 font-medium text-xl text-gray-600 hover:text-teal-500 cursor-pointer" for="email">Email</label>
      <input type="email" id="email" class="py-1 mb-8 border-b-2" v-model="email">

      <label for="password" class="mb-4 font-medium text-xl text-gray-600 hover:text-teal-500 cursor-pointer">Password</label>
      <input type="password" id="password" class="py-1 mb-8 border-b-2" v-model="password">

      <input type="Submit" value="Register" class="px-3 py-2 bg-teal-500 rounded text-white font-semibold text-xl cursor-pointer">
   </form>
</template>

<script>
import axios from '../services/server'

export default {
   name: 'register',

   data() {
      return {
         username: '',
         email: '',
         password: ''
      }
   },

   methods: {
      submitFormRegister: async function() {
         try {
            const {data} = await axios.post('/author/register', {
               username: this.username,
               email: this.email,
               password: this.password
            })
            
            localStorage.token = data.token
            localStorage.authorId = data.authorId

            Swal.fire({
               position: 'center',
               icon: 'success',
               title: 'Registration success',
               showConfirmButton: false,
               timer: 1000
            })
            
            this.$emit('registerLoggingIn', true)
            this.$router.push({name: 'articleList'})
         }
         catch (error) {
            Swal.fire({
               position: 'center',
               icon: 'error',
               title: 'Registration has failed',
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