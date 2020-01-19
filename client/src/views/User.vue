<template>
  <div>
    <div id="kotak-article">
      <div v-if="!$root.Search">
        <ArticleCard
          id="container"
          v-for="(article, index) in this.$root.myArticles"
          :key="index"
          :articleData="article"
        ></ArticleCard>
      </div>
      <div v-else>
        <ArticleCard
          id="container"
          v-for="(article, index) in this.$root.filteredArticle"
          :key="index"
          :articleData="article"
        ></ArticleCard>
      </div>
    </div>
    <div
      style="position: fixed; 
        right: 60px; 
        top: 150px; 
        background-color: rgba(211, 211, 211, 0.466);
        text-align:center;
        padding: 10px"
    >
      <h1>Hello {{authenticedArticle[0].creator.name}}</h1>
      <h2>This is your article</h2>
      <h3>you can edit or delete your own article from here</h3>
    </div>
  </div>
</template>
  <!-- untuk tampilan my article -->
<script>
import ArticleCard from "../components/ArticleCard";
export default {
  name: "UserPage",
  components: {
    ArticleCard
  },
  data() {
    return {
      authenticedArticle: []
    };
  },
  beforeCreate: function() {
    this.axios
      .get("/articles/mine", {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(({ data }) => {
        console.log(data);
        this.$root.myArticles = data;
        this.authenticedArticle = data;
      })
      .catch(err => {
        console.log(err);
        this.$swal.fire(err.response.data.message);
      });
  }
};
</script>

<style scoped>
#kotak-article {
  height: 90vh;
  overflow-y: scroll;
  margin-bottom: 30px;
}
</style>