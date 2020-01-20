<template>
  <div class="flex flex-col">
    <div class="mt-5">
      <b-form-input placeholder="Search"></b-form-input>
    </div>

    <div class="mt-5 flex flex-col">
      <!-- If No articles -->
      <div class="flex justify-center" v-if="articles.length == 0">
        <h2 class="jumbotron w-full text-center text-4xl font-bold">No Articles</h2>
      </div>

      <div class="container-fluid" v-else>
        <div v-for="article in articles" :key="article._id">
          <div class="row flex bg-gray-100 rounded-lg p-2">
            <div class="col-sm-12 col-md-12 col-lg-2 col-xl-2">
              <img :src="article.featured_image" alt="Article Image" />
            </div>
            <article class="col-sm-12 col-md-12 col-lg-10 col-xl-10 flex-col">
              <h2 class="text-center font-bold text-4xl">{{ article.title }}</h2>
              <p class="text-blue-600">by: {{ article.author }}</p>
              <div class="mt-3" v-html="article.content"></div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Dashboard",
  data() {
    return {
      articles: []
    };
  },
  mounted() {
    this.getArticle();
  },
  methods: {
    getArticle() {
      axios({
        method: "get",
        url: "http://localhost:3000/articles/",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          //   console.log(data);
          this.articles = data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>