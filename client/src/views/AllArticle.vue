<template>
  <div class="container">
    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
        <h2 class="mt-3">All Article</h2>
        <nav class="navbar navbar-light bg-primary mt-2 justify-content-end">
          <div>
            <form class="form-inline">
              <input
                class="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                v-model="search"
              />
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
                <i class="fas fa-search"></i>
              </button>
            </form>
          </div>
        </nav>
        <div class="container" v-if="articles.length">
          <div class="row" v-for="article in resultQuery">
            <Article :card="article" @page="specificArticle($event)" />
          </div>
        </div>
        <!-- <div id="draftsArticle">
                Drafts
        </div>-->
      </div>
      <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">Profile</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Article from "../components/Article";

export default {
  data: function() {
    return {
      articles: [],
      search: ""
    };
  },
  computed: {
    resultQuery() {
      if (this.search) {
        return this.articles.filter(item => {
          return this.search
            .toLowerCase()
            .split(" ")
            .every(v => item.title.toLowerCase().includes(v));
        });
      } else {
        return this.articles;
      }
    }
  },
  created() {
    this.allArticle();
  },
  methods: {
    specificArticle: function(params) {
      this.$emit("article", params);
    },
    allArticle: function() {
      axios({
        method: "get",
        url: "http://localhost:3000/article",
        headers: {
          token: localStorage.getItem("access_token")
        }
      })
        .then(({ data }) => {
          data.forEach(element => {
            this.articles.push(element);
          });
        })
        .catch(err => {
          console.log(err.response.data.message);
        });
    }
  },
  components: {
    Article
  }
};
</script>

<style>
</style>