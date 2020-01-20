<template>
  <div class="flex flex-col">
     <div id="navbar" class="flex justify-between items-center shadow py-3">
        <!-- <a href="#" class="font-semibold text-3xl pl-8 green-text">Clean WordPress</a> -->
        <router-link :to="{name: 'articleList'}" class="font-semibold text-3xl pl-8 green-text">Clean WordPress</router-link>
        <div class="pr-6 flex items-center items-center">
           <router-link
               v-if="!isLoggedIn"
               :to="{name: 'login'}"
               class="px-4 font-semibold text-xl text-gray-500 auth-links">Login</router-link>
           <router-link
               v-if="!isLoggedIn"
               :to="{name: 'register'}"
               class="px-4 font-semibold text-xl text-gray-500 auth-links">Register</router-link>
            <router-link class="flex justify-center items-center py-2 px-4 rounded text-teal-500 hover:bg-teal-500 hover:text-white cursor-pointer font-semibold text-xl"
               :to="{name: 'articleWrite'}"
               v-if="isLoggedIn"
            >
               <i class="fas fa-plus px-1"></i>
               <span class="px-1">New article</span>
            </router-link>
            <a @click.prevent="logOut"
               class="px-4 font-semibold text-xl text-gray-500 auth-links"
               v-if="isLoggedIn"
               href="#">Log out</a>
        </div>
     </div>

     <div class="flex">
         <div id="left-nav" class="flex flex-col items-end px-4 mt-10" v-if="isLoggedIn">
            <router-link :to="{name: 'articleList'}" class="mb-6 font-semibold text-xl text-gray-500 hover:text-teal-500">Article list</router-link>
            <router-link v-if="idExist" :to="{name: 'articleUpdate', params: {id: articleId}}" class="mb-6 font-semibold text-xl text-gray-500 hover:text-teal-500">Update article</router-link>
            <a
               href="#"
               class="mb-6 font-semibold text-xl text-gray-500 hover:text-teal-500"
               v-if="idExist"
               @click.prevent="deleteArticle">Delete article</a>
         </div>
         <router-view
            :key="$route.fullPath"
            @loggingIn="setIsLoggedIn($event)"
            @sendArticleId="articleId = $event"
            :class="{main: isLoggedIn}"></router-view>
         <div id="right-nav" class="flex flex-col px-4 ml-10 mt-10" v-if="isLoggedIn">
            <div class="bg-white rounded shadow border border-gray-300 py-3 px-4 mb-4">
               <h5 class="font-bold text-2xl text-gray-700 mb-4">Watch new tag</h5>
               <form @submit.prevent="watchNewTag" class="flex flex-col">
                  <input type="text" v-model="newTag" placeholder="e.g. history" class="border-b border-gray-700 py-1 px-2 mb-3">
                  <input type="submit" value="Watch" class="font-semibold rounded py-1 bg-gray-300 hover:bg-teal-500 hover:text-white cursor-pointer">
               </form>
            </div>
            <h5 class="font-bold text-2xl text-gray-700 mb-4">Watched tags</h5>
            <div v-for="tag in watchedTags" :key="tag">
               <router-link :to="{name: 'articleListByTag', params: {tag}}" class="font-semibold text-xl text-gray-500 hover:text-teal-500">{{tag}}</router-link>
            </div>
         </div>
     </div>
  </div>
</template>

<script>
import axios from './services/server'

export default {
   name: 'App',
   data() {
      return {
         isLoggedIn: !!localStorage.token,
         idExist: !!this.$route.params.id,
         newTag: '',
         watchedTags: [],
         isOwner: null,
         articleId: null
      }
   },

   components: {
      
   },

   methods: {
      setIsLoggedIn(value) {
         this.isLoggedIn = value
      },

      logOut() {
         localStorage.removeItem('token')
         this.isLoggedIn = false
         this.$router.push({name: 'login'})
      },

      watchNewTag: async function() {
         try {
            const {data} = await axios.patch(`/author/${localStorage.authorId}`, {
               tag: this.newTag
            })

            Swal.fire({
               position: 'center',
               icon: 'success',
               title: 'Adding new watched tag success',
               showConfirmButton: false,
               timer: 1000
            })

            this.fetchWatchedTags()
         }
         catch (error) {
            Swal.fire({
               position: 'center',
               icon: 'error',
               title: 'Adding new watched tag has failed',
               text: error.response.data.message,
               showConfirmButton: true,
               timer: 2300
            })
         }
      },

      fetchWatchedTags: async function() {
         try {
            const {data} = await axios.get(`/author/${localStorage.authorId}`)
            this.watchedTags = data.tags
         }
         catch (error) {
            Swal.fire({
               position: 'center',
               icon: 'error',
               title: 'Fetching author watched tags data has failed',
               text: error.response.data.message,
               showConfirmButton: true,
               timer: 2300
            })
         }
      },

      deleteArticle: async function() {
         try {
            const {data} = await axios.delete(`/article/${this.$route.params.id}`)

            Swal.fire({
               position: 'center',
               icon: 'success',
               title: 'Delete article success',
               showConfirmButton: false,
               timer: 1000
            })

            this.$router.push({name: 'articleList'})
         }
         catch(error) {
            Swal.fire({
               position: 'center',
               icon: 'error',
               title: 'Deleting article has failed',
               text: error.response.data.message,
               showConfirmButton: true,
               timer: 2300
            })
         }
      }
   },

   created() {
      this.fetchWatchedTags()
   },

   watch: {
      $route: function(to, from) {
         this.idExist = this.$route.params.id
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
   min-width: 50vw;
   max-width: 61.8vw;
   margin-left: 3.82rem;
   margin-top: 2.5rem;
}

</style>