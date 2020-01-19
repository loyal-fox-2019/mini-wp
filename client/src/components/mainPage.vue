<template>
  <div>
    <navigation-bar @byTitle="searchResult" @gobackhome="backToHome" @udahLogout="suruhLogout"></navigation-bar>
    <div class="row no-gutters">
      <div class="col-2">
        <dashboard @myArticle="myArticle" @allArticles="changePageStatus" @writeArticle="write"></dashboard>
      </div>
      <div class="col-10 overflow-auto art justify-content-center">
        <div class="row" v-if="pageStatus == 'allArticle'">
          <articles
            v-for="(a, i) in articles"
            :data="a"
            :key="i"
            @edit="edit"
            @gobackhome="backToHome"
            @readmore="readmore"
            @backToHome="backToHome"
          ></articles>
        </div>
        <div class="row" v-else-if="pageStatus == 'writeArticle'">
          <create-article @backToHome="backToHome"></create-article>
        </div>
        <div class="row" v-else-if="pageStatus =='myArticle'">
          <articles
            v-for="(b, j) in myArticles"
            :data="b"
            :key="j"
            @edit="edit"
            @gobackhome="backToHome"
            @readmore="readmore"
            @backToHome="backToHome"
          ></articles>
        </div>
        <div class="row" v-else-if="pageStatus =='searchResult'">
          <articles
            v-for="(c, k) in searchResults"
            :data="c"
            :key="k"
            @edit="edit"
            @gobackhome="backToHome"
            @readmore="readmore"
            @backToHome="backToHome"
          ></articles>
        </div>

        <div class="row" v-else-if="pageStatus == 'seeMore'">
          <one-article :seeOne="toSee"></one-article>
        </div>

        <div class="row" v-else-if="pageStatus == 'editArticle'">
          <edit-form @goback="backToHome" :willEdit="toEdit"></edit-form>
        </div>
        <!-- <div class="row">
          <new-article></new-article>
        </div>-->

        <!-- <div class="row"> -->
        <!-- <new-article :data="toEdit"></new-article> -->
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import NavigationBar from "./NavigationBar.vue";
import dashboard from "./dashboard.vue";
import articles from "./articles.vue";
import newArticle from "./newArticle.vue";
import editForm from "./editForm.vue";
import createArticle from "./createArticle.vue";
import oneArticle from "./oneArticle.vue";
export default {
  name: "MAIN",
  components: {
    NavigationBar,
    dashboard,
    articles,
    newArticle,
    editForm,
    createArticle,
    oneArticle
  },
  data() {
    return {
      articles: [],
      myArticles: [],
      pageStatus: "allArticle",
      toEdit: null,
      baseUrl: "http://localhost:3000",
      toSee: null,
      searchResults: []
    };
  },
  methods: {
    suruhLogout() {
      this.$emit("logout");
    },
    searchResult(e) {
      this.pageStatus = "searchResult";
      for (let per of e.data) {
        this.searchResults.push(per);
      }
    },
    readmore(e) {
      console.log(e);
      this.toSee = e;
      this.pageStatus = "seeMore";
    },
    backToHome() {
      this.pageStatus = "allArticle";
      this.getArticles();
    },
    write() {
      this.pageStatus = "writeArticle";
    },
    edit(e) {
      console.log(e);
      this.toEdit = e;
      this.pageStatus = "editArticle";
    },
    changePageStatus() {
      this.pageStatus = "allArticle";
    },
    getArticles() {
      let base = this.baseUrl;
      let articles = this.articles;
      axios({
        method: "GET",
        url: `${base}/allArticles`
      })
        .then(allArticles => {
          console.log(allArticles);
          for (let article of allArticles.data) {
            articles.push(article);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    myArticle() {
      this.pageStatus = "myArticle";
      let base = this.baseUrl;
      let artikel = this.myArticles;
      axios({
        method: "GET",
        url: `${base}/myArticles`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(artikelKu => {
          for (let one of artikelKu.data) {
            artikel.push(one);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getArticles();
  }
};
</script>

<style scoped>
.art {
  height: 100vh;
}
</style>
    