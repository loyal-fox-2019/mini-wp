<template>
  <div class="list-article">
    <h3>My Article</h3>
    <hr />
    <div class="ui four column grid mr-0">
      <ArticleCard
        v-for="(item, i) in listArticle"
        v-bind:key="i"
        :id="item._id"
        :thumbnail="item.thumbnail"
        :title="item.title"
        :content="item.content"
        :date="item.created_at"
        @refreshData="fetchData"
      ></ArticleCard>
    </div>
  </div>
</template>

<script>
import ArticleCard from "../components/ArticleCard";
export default {
  components: {
    ArticleCard
  },
  data() {
    return {
      listArticle: []
    };
  },
  methods: {
    fetchData() {
      axios({
        method: "get",
        headers: {
          token: localStorage.getItem("token")
        },
        url: "http://localhost:3000/articles"
      })
        .then(({ data }) => {
          for (let i = 0; i < data.length; i++) {
            let content = data[i].content;
            let title = data[i].title;
            let date = moment(data[i].created_at).format("DD MMMM YYYY");
            data[i].content = content.substring(0, 50);
            data[i].title = title.substring(0, 20);
            data[i].created_at = date;
          }
          this.listArticle = data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style scoped>
.list-article {
  padding: 15px 5px;
  height: calc(100vh - 49px);
  width: 100%;
  overflow-y: scroll;
}
</style>