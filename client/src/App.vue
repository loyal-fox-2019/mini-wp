<template>
  <div class="flex flex-col">
     <div id="navbar" class="flex justify-between items-center shadow py-3">
        <a href="#" class="font-semibold text-3xl pl-8 green-text">Clean WordPress</a>
        <div class="pr-6">
           <router-link
               v-if="!isLoggedIn"
               :to="{name: 'login'}"
               class="px-4 font-semibold text-xl text-gray-500 auth-links">Login</router-link>
           <router-link
               v-if="!isLoggedIn"
               :to="{name: 'register'}"
               class="px-4 font-semibold text-xl text-gray-500 auth-links">Register</router-link>
            <a @click.prevent="logOut"
               class="px-4 font-semibold text-xl text-gray-500 auth-links"
               v-if="isLoggedIn"
               href="#">Log out</a>
        </div>
     </div>
      <router-view :key="$route.fullpath" @loggingIn="setIsLoggedIn($event)"></router-view>
  </div>
</template>

<script>
export default {
   data() {
      return {
         isLoggedIn: !!localStorage.token
      }
   },

   methods: {
      setIsLoggedIn(value) {
         this.isLoggedIn = value
      },

      logOut() {
         localStorage.removeItem('token')
         this.isLoggedIn = false
         this.$router.push({name: 'login'})
      }
   }
}
</script>

<style>

.white-bg {
   background-color: #F7FAFC;
}

.green-text {
   color: #38b2ac;
}

.auth-links:hover {
   color: #38b2ac;
}

</style>