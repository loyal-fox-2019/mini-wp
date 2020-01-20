<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-2 bg-white responseVertical" id="col-left">
          <div
            class="nav flex-column nav-pills"
            id="v-list-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            <a
              class="nav-link active"
              id="blogPost-tab"
              data-toggle="pill"
              href="#blogPost"
              role="tab"
              aria-controls="blogPost"
              aria-selected="false"
            >Blog Posts</a>
          </div>
        </div>

        <div class="col-10 bg-light responseVertical">
          <div class="contentRight p-5">
            <div
              class="tab-pane fade show active"
              id="blogPost"
              role="tabpanel"
              aria-labelledby="blogPost-tab"
            >
              <h4>Posts</h4>
              <div class="navPosts">
                <div class="box border">
                  <ul class="nav nav-pills" id="pills-tab" role="tablist">
                    <li class="nav-item">
                      <a
                        class="nav-link active"
                        id="pills-published-tab"
                        data-toggle="pill"
                        href="#pills-published"
                        role="tab"
                        aria-controls="pills-published"
                        aria-selected="true"
                      >Published</a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        id="pills-draft-tab"
                        data-toggle="pill"
                        href="#pills-drafts"
                        role="tab"
                        aria-controls="pills-draft"
                        aria-selected="false"
                      >Drafts</a>
                    </li>
                    <li class="nav-item-search">
                      <input v-model="search" type="text" class="form-control" placeholder="🔍" />
                    </li>
                  </ul>
                </div>
              </div>

              <div class="tab-content">
                <div
                  class="tab-pane fade show active"
                  id="pills-published"
                  role="tabpanel"
                  aria-labelledby="pills-published-tab"
                >
                  <div class="list-group-item section-header is-compact">
                    <div class="sectionHeaderLabel">
                      <span>Posts</span>
                    </div>
                    <div class="button sectionHeaderAction">
                      <button
                        class="btn btn-danger"
                        @click="addArticle"
                        data-toggle="modal"
                      >add new article</button>
                    </div>
                  </div>
                  <div
                    v-for="(article, index) in filterArticle"
                    :key="index"
                    class="card post is-compact justify-content-between"
                  >
                    <img
                      v-bind:src="article.featured_image"
                      alt="..."
                      class="img-thumbnail"
                      width="150"
                    />
                    <div class="postMain d-flex" style="height: auto; max-width: 600px;">
                      <a class="postTitle" href>{{article.title}}</a>
                      <p class="text-truncate" style="font-size: 12px;">{{article.content}}</p>
                      <div class="postCardInfo">
                        <span class="postInfoItem">
                          <img
                            src="https://image.flaticon.com/icons/png/512/37/37663.png"
                            alt="..."
                            class="rounded-circle"
                          />
                          <span>{{formatDate(article.createdAt)}}</span>
                        </span>
                      </div>
                    </div>
                    <div>
                      <div class="buttonContent mt-5">
                        <button
                          @click="findOne(article._id)"
                          type="button"
                          class="btn btn-secondary"
                          data-toggle="modal"
                        >Update</button>
                        <button
                          v-on:click.prevent="deleteArticle(article._id)"
                          type="button"
                          class="btn btn-danger"
                        >Delete</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  class="tab-pane fade"
                  id="pills-drafts"
                  role="tabpanel"
                  aria-labelledby="pills-drafts-tab"
                >
                  <div class="empty-content text-center">
                    <img
                      src="https://angialand.com.vn/wp-content/uploads/2018/04/404-not-found.png"
                      alt="page"
                      class="mt-5"
                    />
                    <h4 class="my-3">No Posts Found</h4>
                    <a href="#" class="btn btn-danger btn-s small">Add New Post</a>
                  </div>
                </div>
              </div>
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
  data() {
    return {
      search: ""
    };
  },
  created() {
    this.getAllArticle();
  },
  computed: {
    filterArticle() {
      if (this.search.length > 0) {
        const regex = new RegExp(this.search, "i");
        const filterArticles = this.$root.articles.filter(article => {
          return regex.test(article.title);
        });
        return filterArticles;
      } else {
        return this.$root.articles;
      }
    }
  },
  methods: {
    getAllArticle() {
      axios({
        url: "http://localhost:3000/articles",
        method: "GET",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.$root.articles = data;
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.message
          });
        });
    },
    addArticle() {
      this.$emit("submitArticle");
    },
    deleteArticle(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      })
        .then(result => {
          if (result.value) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            return axios({
              url: `http://localhost:3000/articles/${id}`,
              method: "DELETE",
              headers: {
                token: localStorage.getItem("token")
              }
            });
          }
        })
        .then(() => {
          this.getAllArticle();
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.message
          });
        });
    },
    findOne(id) {
      axios({
        url: `http://localhost:3000/articles/${id}`,
        method: "GET",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.$root.articleId = data._id;
          this.$root.articleTitle = data.title;
          this.$root.articleContent = data.content;
          this.$root.articleFeatured_image = data.featured_image;
          this.$emit("updateArticle");
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.message
          });
        });
    },
    formatDate(date) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

body {
  line-height: 1.5;
}

header .bg-wordpress {
  background: #006088;
}

header .navbar-brand {
  padding: 12px 7px;
  background: #002c40;
}

.responseVertical {
  overflow-y: auto;
  height: 625px;
}

.responseVertical #v-list-tab a {
  color: black;
}

.responseVertical a:hover {
  background-color: #ccc;
}

.responseVertical a:active {
  background-color: #c5d9ed;
}

.nav-pills .nav-link {
  border-radius: 0;
}

.nav-pills .nav-link.active {
  background-color: #c5d9ed;
}

.nav {
  background: white;
}

.navPosts {
  position: relative;
  width: 100%;
  padding: 0;
  margin: 0 0 17px;
}

#col-left {
  padding: 0;
}

.contentRight h4 {
  margin: 0 0 16px;
}

.section-header.card {
  display: flex;
  flex-direction: row;
  line-height: 28px;
  padding: 11px 11px 11px;
  position: relative;
}

.sectionHeaderLabel {
  display: flex;
  align-items: center;
  flex-grow: 1;
  position: relative;
  overflow: hidden;
}

.sectionHeaderAction .btn {
  font-size: 12px;
  border-radius: 0;
  background-color: #c9356e;
}

.post {
  display: flex;
  align-items: center;
  flex-direction: row;
}

.card.is-compact {
  padding: 16px;
}

.postMain {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.list-group-item {
  display: flex;
}

.postMain .postTitle {
  font-size: 18px;
  font-weight: bold;
  color: #000;
}

.postJudulItem {
  vertical-align: middle;
  padding: 2px 10px;
}

.postCardInfo {
  margin: 5px;
  font-size: 12px;
  color: #646970;
  display: flex;
  flex-direction: column;
}

.postCardInfo img {
  height: 13px;
  margin-right: 5px;
}

.nav-item-search {
  display: flex;
  flex: auto;
  padding: 7px;
}

.nav-item-search input {
  height: 25px;
  display: flex;
  flex-direction: row-reverse;
  /* margin: 6px 4px 6px */
}
.buttonContent {
  align-self: flex-end;
}
</style>