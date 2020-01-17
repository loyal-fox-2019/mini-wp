<template>
  <div class="home container">
    <div class="row">
      <main class="post blog-post col-lg-8">
        <div class="container">
          <div class="post-single">
            <div v-for="(error, i) in errors" :key="i" class="alert alert-danger text-center" role="alert">
              {{error}}
            </div>
            <article-item @show-detail="showDetail" v-for="article in articles" :key="article._id" :article="article"></article-item>
          </div>
        </div>
      </main>
      <side-bar></side-bar>
    </div>
  </div>
</template>

<script>
import axios from '../config/api'
import ArticleItem from '../components/Article-item'
import SideBar from "../components/Side-bar";
export default {
  name: "Main-Page",
  components: {
    SideBar,
    ArticleItem
  },
  data() {
    return {
      articles: [],
      errors: []
    }
  },
  methods: {
    showDetail() {
      this.$emit('show-detail')
    },
    fetchArticles() {
      this.errors = []
      axios({
        method: 'get',
        url: `/articles`
      })
        .then(({ data }) => {
          this.articles = data
        })
        .catch(err => {
          this.errors.push(err.response.data.message)
        })
    }
  },
  created() {
    this.fetchArticles()
  }
};
</script>

<style>
</style>
