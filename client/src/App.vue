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
     <div class="flex">
         <div id="left-nav" class="flex flex-col items-end px-4 mt-10" v-if="isLoggedIn">
            <router-link :to="{name: 'articleList'}" class="font-semibold text-xl text-gray-500 hover:text-teal-500">Article list</router-link>
            <!-- <router-link :to=""></router-link>
            <router-link :to=""></router-link>
            <router-link :to=""></router-link> -->
         </div>
         <router-view :key="$route.fullPath" @loggingIn="setIsLoggedIn($event)" :class="{main: isLoggedIn}"></router-view>
         <div id="right-nav" class="flex flex-col px-4 mt-10" v-if="isLoggedIn">
            <h5 class="font-bold text-2xl text-gray-700 mb-4">Watched tags</h5>

            <router-link :to="{name: 'articleListByTag', params: {tag: 'Adventure'}}" class="font-semibold text-xl text-gray-500 hover:text-teal-500">Adventure</router-link>
         </div>
     </div>
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

#left-nav,
#right-nav {
   min-width: 13rem;
}

.main {
   min-width: 70vw;
   margin-left: 3.82rem;
   margin-top: 2.5rem;
}

</style>