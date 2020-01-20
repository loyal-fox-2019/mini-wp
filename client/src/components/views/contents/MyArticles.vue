<template>
  <div class="flex flex-col">
    <div class="mt-5 flex flex-col">
      <h2 class="text-center text-4xl font-bold mb-4">MY ARTICLES</h2>
      <!-- If No articles -->
      <div class="flex justify-center" v-if="myArticles.length == 0">
        <h2 class="jumbotron w-full text-center text-4xl font-bold">You Have No Articles</h2>
      </div>

      <div class="container-fluid" v-else>
        <div v-for="(article, index) in myArticles" :key="article._id">
          <div class="row flex bg-gray-100 rounded-lg p-2">
            <div class="col-sm-12 col-md-12 col-lg-2 col-xl-2">
              <img :src="article.featured_image" alt="Article Image" />
            </div>
            <article class="col-sm-12 col-md-12 col-lg-10 col-xl-10 flex-col">
              <h2 class="text-center font-bold text-4xl">{{ article.title }}</h2>
              <p class="text-blue-600">by: {{ article.author }}</p>
              <div class="mt-3" v-html="article.content"></div>
            </article>
            <div class="my-3 w-full text-right">
              <a class="mr-2 text-blue-700" href="#" @click="editArticle(article._id, index)">Update</a>
              <a
                class="mr-2 text-blue-700"
                href="#"
                @click="deleteArticle(article._id, index)"
              >Delete</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "MyArticles",
  data() {
    return {
      myArticles: []
    };
  },
  mounted() {
    this.getMyArticles();
  },
  methods: {
    getMyArticles() {
      axios({
        method: "get",
        url: "http://localhost:3000/articles/myarticles",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          //   console.log("my articles: ", data);
          this.myArticles = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    editArticle(id, index) {
      this.$emit("editArticle", this.myArticles[index]);
    },
    deleteArticle(id, index) {
      axios({
        method: "delete",
        url: `http://localhost:3000/delete/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          //   console.log(data);
          this.myArticles.splice(index, 1);
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