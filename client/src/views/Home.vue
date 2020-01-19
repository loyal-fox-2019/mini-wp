<template>
  <div>
    <div>
      <ArticleCard v-for="(article, index) in this.allArticle" :key="index" :articleData="article"></ArticleCard>
    </div>
  </div>
</template>
  <!-- untuk tampilan halaman utama -->
<script>
import ArticleCard from "../components/ArticleCard";

export default {
  name: "Home",
  components: {
    ArticleCard
  },
  beforeCreate: function() {
    this.axios
      .get("/articles")
      .then(({ data }) => {
        console.log(data);
        this.allArticle = data
        this.$root.Articles = data;
      })
      .catch(err => {
        console.log(err.response);
      });
  },
  data(){
    return {
      allArticle: []
    }
  }
};
</script>

<style scoped>
#ArticleCart{
  border: 5px solid black;
}
</style>