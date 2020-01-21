<template>
  <div style="overflow-y: auto">
    <div id="kotak-article">
      <div v-if="!$root.Search && !$root.tagSearch">
        <ArticleCard
          id="container"
          v-for="(article, index) in this.$root.allArticles"
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
    <TagBox id="tagBoxy"></TagBox>
    <div></div>
  </div>
</template>
  <!-- untuk tampilan halaman utama -->
<script>
import ArticleCard from "../components/ArticleCard";
import TagBox from "../components/TagBox";

export default {
  name: "Home",
  components: {
    ArticleCard,
    TagBox
  },
  beforeCreate: function() {
    this.axios
      .get("/articles")
      .then(({ data }) => {
        console.log(data);
        this.allArticle = data;
        this.$root.Articles = data;
        this.$root.bookTheTags();
      })
      .catch(err => {
        console.log(err);
      });
  },
  data() {
    return {
      allArticle: []
    };
  },
  computed: {}
};
</script>

<style scoped>
#kotak-article {
  height: 90vh;
  overflow-y: scroll;
  margin-bottom: 30px;
}
#container {
  width: 60wv;
}
#tagBoxy {
  position: absolute;
  top: 23vh;
  right: 3vw;
  width: 30vw;
  /* overflow: auto; */
}
</style>