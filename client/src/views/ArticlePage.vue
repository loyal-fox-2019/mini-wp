<template>
  <div class="container border border-primary">
    <SearchBar class="mt-2" @updateArticle="updateArticle"></SearchBar>
  </div>
</template>

<script>
import api from '../api'
import errorHandler from '../helpers/error-handler.js'
import SearchBar from '../components/SearchBar.vue'

export default {
  name: 'article-page',
  data: function() {
    return {
      articles: [],
    }
  },
  components: {
    SearchBar,
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
}
</script>

<style></style>
