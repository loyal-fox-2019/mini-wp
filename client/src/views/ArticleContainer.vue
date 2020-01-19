<template>
  <div class="content overflow-auto mt-2">
    <div
      v-if="filteredArticles.length === 0"
      class="custom-content text-center h-100 pt-2"
    >
      <h1 class="text-light">There is no article</h1>
      <h3 class="text-light">Let's create new one</h3>
      <b-button
        :to="{ path: '/user/add-article' }"
        variant="dark"
        squared
        class="custom-color lead mt-4"
        >Write article</b-button
      >
    </div>
    <ArticleCard
      v-for="article in filteredArticles"
      :key="article._id"
      :imgSrc="
        article.featuredImage
          ? article.featuredImage
          : 'https://placekitten.com/300/300'
      "
      :id="article._id"
      :title="article.title"
      :content="article.content"
      :createdAt="article.createdAt"
      :author="author"
      :tags="article.tags"
      :status="article.status"
      @updateArticleList="$emit('updateArticleList')"
    ></ArticleCard>
  </div>
</template>

<script>
import ArticleCard from '../components/ArticleCard.vue'

export default {
  name: 'article-container',
  data: function() {
    return {
      filteredArticles: [],
    }
  },
  components: {
    ArticleCard,
  },
  props: ['userArticles'],
  watch: {
    $route: {
      immediate: true,
      handler: function() {
        switch (this.$route.name) {
          case 'publishedArticles':
            this.filteredArticles = this.userArticles.filter(article => {
              return article.status
            })
            break

          case 'draftArticles':
            this.filteredArticles = this.userArticles.filter(article => {
              return !article.status
            })
            break

          default:
            this.filteredArticles = this.userArticles
            break
        }
      },
    },
    userArticles() {
      this.filteredArticles = this.userArticles
    },
  },
  computed: {
    author: function() {
      return localStorage.getItem('username')
    }
  }
}
</script>

<style scoped>
.content {
  height: 90vh;
}

.custom-content {
  background-color: rgb(0, 0, 0, 0.2) !important;
}

.custom-color {
  background-color: #6e8f8a !important;
  border: #6e8f8a !important;
  border-color: #6e8f8a !important;
}

.custom-color:hover {
  background-color: #a2b8b4 !important;
  border: #a2b8b4 !important;
  border-color: #a2b8b4 !important;
}
</style>
