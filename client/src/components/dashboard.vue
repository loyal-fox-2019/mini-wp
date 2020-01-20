<template>
  <div>
    <!-- <div class="row"> -->
    <div class="dashboard overflow-auto">
      <div class="catDashBoard">
        <h6>All</h6>
      </div>
      <div class="my-4 row titDash">
        <div class="col-2">
          <i class="far fa-newspaper fa-lg"></i>
        </div>
        <div class="col-10" v-on:click="allArticles">
          <h6>All Articles</h6>
        </div>
      </div>
      <div class="catDashBoard">
        <h6>Manage</h6>
      </div>
      <div class="menus">
        <div class="my-4 row titDash">
          <div class="col-2">
            <i class="fas fa-file-alt fa-lg"></i>
          </div>
          <div class="col-10" v-on:click="writeArticle">
            <h6>Write New Article</h6>
          </div>
        </div>
      </div>
      <div class="my-4 row titDash">
        <div class="col-2">
          <i class="fas fa-lg fa-align-left"></i>
        </div>
        <div class="col-10" v-on:click="myArticle">
          <h6>My Articles</h6>
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
export default {
  name: "dashboard",
  methods: {
    myArticle() {
      this.$emit("myArticle", "myArticle");
    },
    allArticles() {
      this.$emit("allArticles", "allArticles");
    },
    writeArticle() {
      this.$emit("writeArticle", "writeArticle");
    }
  }
};
</script>

<style scoped>
.dashboard {
  height: 100vh;
  /* width: 20px; */
  background-color: #ebe6e6;
}
.catDashBoard h6 {
  font-size: 20px;
  font-weight: 600;
  opacity: 0.8;
}

.titDash {
  max-width: 200px;
  margin-left: 5px;
}
.titDash h6 {
  font-size: 15;
  font-weight: 600;
}

.titDash:hover {
  color: white;
  background-color: #4d4646;
  cursor: pointer;
}
.kananDash h6 {
  font-size: 15;
  font-weight: bold;
}
.isiDashboard {
  padding: 10px;
  background-color: white;
  justify-content: center;
  align-self: center;
  /* width: 100%; */
}
.tombolDash {
  padding: 0 0;
}
</style>