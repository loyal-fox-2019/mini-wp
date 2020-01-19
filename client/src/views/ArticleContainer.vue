<template>
  <div class="content overflow-auto mt-2">
    <h1 class="text-light">Dummy card</h1>
  </div>
</template>

<script>
import AddArticleForm from './AddArticleForm.vue'
export default {
  name: 'article-container',
  data: function() {
    return {
      whatToDisplay: '',
      filteredArticles: [],
    }
  },
  components: {
    AddArticleForm,
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
  height: 100%;
}
</style>
