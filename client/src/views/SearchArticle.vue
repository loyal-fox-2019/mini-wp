<template>
  <div class="search-article">
    <h3>All Article</h3>
    <hr />
    <div class="ui search mb-3">
      <div class="ui icon input">
        <input class="prompt" type="text" placeholder="Search Article" v-model="searchBar" />
        <i class="search icon"></i>
      </div>
      <div class="results"></div>
    </div>
    <div class="ui four column grid mr-0">
      <ArticleCard
        v-for="(item, i) in searchArticle"
        v-bind:key="i"
        :id="item._id"
        :thumbnail="item.thumbnail"
        :title="item.title"
        :content="item.content"
        :date="item.created_at"
        :user="item.author.name"
        :button="false"
      ></ArticleCard>
    </div>
  </div>
</template>

<script>
import ArticleCard from "../components/ArticleCard";
export default {
  computed: {
    searchArticle() {
      return this.listAllArticle.filter(element =>
        element.title.toLowerCase().includes(this.searchBar.toLowerCase())
      );
    }
  },
  components: {
    ArticleCard
  },
  data() {
    return {
      searchBar: "",
      listAllArticle: []
    };
  },
  methods: {
    fetchData() {
      axios({
        method: "get",
        headers: {
          token: localStorage.getItem("token")
        },
        url: "http://localhost:3000/articles/all"
      })
        .then(({ data }) => {
          for (let i = 0; i < data.length; i++) {
            let content = data[i].content;
            let title = data[i].title;
            let date = moment(data[i].created_at).format("DD MMMM YYYY");
            data[i].content = content.substring(0, 50);
            data[i].title = title.substring(0, 20);
            data[i].created_at = date;
            if (!data[i].author.name) {
              data[i].author.name = "User Deleted";
            }
          }
          this.listAllArticle = data;
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
.search-article {
  padding: 15px 5px;
  height: calc(100vh - 49px);
  width: 100%;
  overflow-y: scroll;
}
</style>