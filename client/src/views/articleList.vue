<template>
  <div class="flex flex-col">
     <div class="mb-6 bg-white border-gray-300 shadow py-3 px-4">
        <div class="flex items-center">
            <p class="mx-3 text-lg font-medium text-gray-600">See public post</p>
            <div class="border border-gray-200 shadow rounded py-2 px-3 flex items-center text-lg font-medium text-gray-600">
               <input type="radio" class="" name="seePublic" v-model="seePublic" value="yes">&nbsp;Yes&nbsp;&nbsp;&nbsp;
               <input type="radio" class="" name="seePublic" v-model="seePublic" value="no">&nbsp;No
            </div>
        </div>
         <!-- pagination -->
        <div></div>
     </div>
     <div v-if="seePublic == 'yes'">
         <ArticleCard
            v-for="article in articles" :key="article._id" :propArticle="article"
         ></ArticleCard>
     </div>
     <div v-else>
        <ArticleCard
            v-for="article in privateArticles" :key="article._id" :propArticle="article"
        ></ArticleCard>
     </div>
  </div>
</template>

<script>
import axios from '../services/server'
import ArticleCard from '../components/articleListCard'

export default {
   name: 'ArticleList',

   components: {
      ArticleCard
   },

   data() {
      return {
         articles: [],
         seePublic: 'no'
      }
   },

   methods: {
      fetchArticles: async function() {
         try {
            const {data} = await axios.get('/article')

            this.articles = data.articles
         } catch (error) {
            Swal.fire({
               position: 'center',
               icon: 'error',
               title: 'Fetching-articles has failed',
               text: error.response.data.message,
               showConfirmButton: false,
               timer: 2300
            })
         }
      }
   },

   created() {
      this.fetchArticles()
   },

   computed: {
      privateArticles: function() {
         return this.articles.filter(article => article.audience == 'private')
      }
   }
}
</script>

<style>

</style>