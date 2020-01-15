<template>
  <div class="flex justify-center items-center">
     <div class="flex h-screen">
        <div class="w-1/2 splash">
            <img src="../assets/splash.jpg" class="invisible">
        </div>
        <div class="w-1/2 flex justify-center items-center h-full">
            <div class="pb-32">
               <login v-if="page == 'login'" @loginLoggingIn="$emit('loggingIn', $event)"></login>
               <register v-if="page == 'register'" @registerLoggingIn="$emit('loggingIn', $event)"></register>
            </div>
        </div>
     </div>
  </div>
</template>

<script>
import Login from '../components/login.vue'
import Register from '../components/register.vue'
import Swal from 'sweetalert2'

export default {
   name: 'Auth',

   data() {
      return {
         page: this.$route.name
      }
   },

   components: {
      login: Login,
      register: Register
   },

   mounted() {
      
   },

   methods: {
      asd(val) {
         console.log(val)
      }
   },

   watch: {
      // $route(to, from) {
      //    this.page = to.name
      // }
   }
}
</script>

<style scoped>
   .half {
      width: 50%;
   }
   .splash {
      background: url('../assets/unsplash1.jpg') no-repeat center center/cover;
   }
</style>