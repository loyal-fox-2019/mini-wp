<template>
  <div class="container border border-primary">
    <SearchBar class="mt-2" @updateArticle="updateArticle"></SearchBar>
    <div class="article-content border border-info overflow-auto pt-2">
      <ArticleCard v-for="article in articles"
        :key="article._id"
        :imgSrc = "article.featuredImage ? article.featuredImage : 'https://placekitten.com/300/300'"
        :id="article._id"
        :title="article.title"
        :content="article.content"
        :createdAt="article.createdAt"
        :author="article.author"
        :tags="article.tag"
        ></ArticleCard>
    </div>
  </div>
</template>

<script>
import api from '../api'
import errorHandler from '../helpers/error-handler.js'
import SearchBar from '../components/SearchBar.vue'
import ArticleCard from '../components/CustomArticleCard.vue'

export default {
  name: 'article-page',
  data: function() {
    return {
      articles: [],
    }
  },
  components: {
    SearchBar,
    ArticleCard
  },
  methods: {
    updateArticle(payload) {
      this.articles = payload.articles
    },
    fetchAllArticles() {
      this.$swal.fire({
        title: 'Fetching all articles',
        onBeforeOpen: () => {
          this.$swal.showLoading()
        },
      })

      api
        .get('/articles')
        .then(({ data }) => {
          this.$swal.close()
          this.updateArticle(data)
        })
        .catch(err => {
          this.$swal.close()
          const self = this
          errorHandler(err, self)
        })
    },
  },
  created() {
    this.fetchAllArticles()
  },
}
</script>

<style scoped>
.article-content {
  height: 93%;
}
</style>
