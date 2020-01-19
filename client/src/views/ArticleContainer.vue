<template>
  <div class="content overflow-auto mt-2">
    <ArticleCard v-for="number in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]" :key="number" :imgSrc="'https://placekitten.com/300/300'"></ArticleCard>
  </div>
</template>

<script>
import ArticleCard from '../components/ArticleCard.vue'

export default {
  name: 'article-container',
  data: function() {
    return {
      whatToDisplay: '',
      filteredArticles: [],
    }
  },
  components: {
    ArticleCard,
  },
  watch: {
    $route: {
      immediate: true,
      handler: function() {
        switch (this.$route.name) {
          case 'publishedArticles':
            console.log('filter article yang statusnya published')
            break

          case 'draftArticles':
            console.log('filter artcile yang statusnya draft')
            break

          default:
            console.log('tampilin semua')
            break
        }
      },
    },
  },
}
</script>

<style scoped>
.content {
  height: 90vh;
}
</style>
