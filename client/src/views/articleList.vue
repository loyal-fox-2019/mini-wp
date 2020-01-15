<template>
  <div class="">
     sdafnsiafnai
  </div>
</template>

<script>
import axios from '../services/server'

export default {
   name: 'ArticleList',

   data() {
      return {
         articles: []
      }
   },

   methods: {
      fetchArticles: async function() {
         try {
            const {data} = await axios.get('/article')
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
      console.log(3, localStorage.token)
      this.fetchArticles()
   }
}
</script>

<style>

</style>