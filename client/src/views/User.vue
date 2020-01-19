<template>
  <div>
    <div id="kotak-article">
      <ArticleCard
        id="container"
        v-for="(article, index) in this.$root.myArticles"
        :key="index"
        :articleData="article"
      ></ArticleCard>
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