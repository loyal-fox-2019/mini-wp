<template>
  <div class="home container">
    <div class="row">
      <main class="post blog-post col-lg-8">
        <div class="container">
          <div class="post-single">
            <article-item @show-detail="showDetail"></article-item>
            <article-item></article-item>
            <article-item></article-item>
            <article-item></article-item>
          </div>
        </div>
      </main>
      <side-bar></side-bar>
    </div>
  </div>
</template>

<script>
import ArticleItem from '../components/Article-item'
import SideBar from "../components/Side-bar";
export default {
  name: "Main-Page",
  components: {
    SideBar,
    ArticleItem
  },
  methods: {
    showDetail() {
      this.$emit('show-detail')
    }
  }
};
</script>

<style>
</style>
