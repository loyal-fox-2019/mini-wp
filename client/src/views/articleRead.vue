<template>
  <div class="mb-6 rounded bg-white shadow py-6 px-10">
     <div :style="backgroundImage" class="mb-4 bg-image">
        <img :src="article.featured_image" class="invisible">
     </div>
     <div class="content mb-4">
         <p class="mb-2 leading-normal font-semibold text-gray-600 text-2xl">{{article.title}}</p>
         <p v-html="article.content"
            class="leading-normal"></p>
      </div>
     <div class="flex">
        <div v-for="tag in article.tags" :key="tag" class="mx-3 py-1 px-3 bg-gray-300 hover:bg-teal-500 hover:text-white rounded-lg">
           <router-link :to="{name: 'articleListByTag', params: {tag}}">{{tag}}</router-link>
         </div>
      </div>
  </div>
</template>

<script>
import axios from '../services/server'

export default {
   name: 'ArticleRead',
   
   data() {
      return {
         article: {},
         backgroundImage: ''
      }
   },

   computed: {
   },

   methods: {
      fetchArticle: async function() {
         try {
            const {data} = await axios.get(`/article/${this.$route.params.id}`)
            this.article = data.article
            this.backgroundImage = `background: url(\'${data.article.featured_image}\') no-repeat center center/contain;`

            this.$emit('sendArticleId', this.$route.params.id)
         }
         catch (error) {
            Swal.fire({
               position: 'center',
               icon: 'error',
               title: 'Fetching article has failed',
               text: error.response.data.message,
               showConfirmButton: true,
               timer: 1000
            })
         }
      }
   },

   created() {
      this.fetchArticle()
   }
}
</script>

<style scoped>
   .bg-image {
      min-height: 382px;
      max-height: 1080px;
   }
</style>