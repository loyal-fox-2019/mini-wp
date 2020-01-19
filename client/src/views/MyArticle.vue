<template>
  <div class="container">
    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
        <h2 class="mt-3">My Article</h2>
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
        <div class="container">
          <div class="row" v-for="article in resultQuery">
            <div style="width: 80%">
              <Article :card="article" @page="specificArticle($event)" />
            </div>
            <div class="col mt-2">
              <button @click="deleteArticle(article._id)">Delete</button>
              <button @click="changeToUpdate(article._id)">update</button>
            </div>
          </div>
        </div>
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
    this.myArticle();
  },
  methods: {
    specificArticle: function(params) {
      this.$emit("article", params);
    },
    myArticle: function() {
      axios({
        method: "get",
        url: `http://localhost:3000/article/mine`,
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
    },
    deleteArticle: function(id) {
      axios({
        method: "delete",
        url: `http://localhost:3000/article/${id}`,
        headers: {
          token: localStorage.getItem("access_token")
        }
      })
        .then(({ data }) => {
          let index = this.articles.filter(el => {
            return el._id !== id;
          });
          this.articles = index;
          Swal.fire({
            icon: "success",
            title: `Berhasil menhapus article`,
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(err => {
          console.log(err.response.data);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.response.data.message
          });
        });
    },
    changeToUpdate: function(id) {
      this.$emit("page", id);
    }
  },
  components: {
    Article
  }
};
</script>

<style>
</style>