<template>
   <div class="article-card flex flex-col py-4 px-6 bg-white shadow mb-6 border border-gray-300 cursor-pointer" @click="toRead">
      <div :style="backgroundImage"
         class="card-bg-img mb-4">
      </div>
      <div class="content mb-4">
         <p class="mb-2 leading-normal font-semibold text-gray-600 text-xl">{{article.title}}</p>
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
export default {
   name: 'ArticleListCard',

   data() {
      return {
         article: this.propArticle,
         backgroundImage: `background: url(\'${this.propArticle.featured_image}\') no-repeat center center/cover;`
      }
   },

   props: {
      propArticle: {
         type: Object,
         default: {
            title: 'title1',
            content: 'content1',
            image: 'https://zoezachary.s3.ap-southeast-1.amazonaws.com/Screenshot%20from%202020-01-13%2005-03-42.png',
            tags: ['satu', 'dua'],
            audience: 'private'
         }
      }
   },

   methods: {
      toRead() {
         // this.$router.push({name: 'articleRead', params: {id: this.article._id}})
         this.$router.push({path: `/read/${this.article._id}`})
      }
   },

   watch: {
      $route: (to, from) => {
         console.log(to.name)
      }
   }
}
</script>

<style scoped>
   .article-card {
      max-height: 612px !important;
      overflow: hidden;
   }

   .card-bg-img {
      min-height: 382px;
   }

   .content {
      max-height: 10rem;
      overflow: hidden;
   }
</style>