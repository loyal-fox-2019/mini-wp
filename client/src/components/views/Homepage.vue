<template>
  <div>
    <Navbar @toCreateArticle="toCreateArticle" @loggedIn="logout"></Navbar>

    <main class="container-fluid">
      <div class="row">
        <!-- Menu -->
        <Menu @toDashboard="toDashboard" @toMyArticles="toMyArticles"></Menu>
        <!-- End of Menu -->

        <div class="col-sm-10 bg-gray-300">
          <!-- Dashbboard -->
          <div v-if="navMenu.onDashboard">
            <Dashboard></Dashboard>
          </div>
          <!-- End of Dashboard -->

          <!-- Create Articles -->
          <div v-else-if="navMenu.onCreateArticle">
            <CreateArticle @toDashboard="toDashboard" :updateArticle="upcomingUpdateArticle"></CreateArticle>
          </div>
          <!-- End of create articles -->

          <!-- My Articles -->
          <div v-else-if="navMenu.onMyArticles">
            <MyArticles @editArticle="toUpdateArticle"></MyArticles>
          </div>
          <!-- End of My Articles -->

          <!-- Edit Article -->
          <div v-else-if="navMenu.onEditArticle">
            <EditArticle :articleData="upcomingUpdateArticle"></EditArticle>
          </div>
          <!-- End of Edit Article -->
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "./partials/Navbar";
import Menu from "./partials/Menu";
// Content
import CreateArticle from "./contents/CreateArticle";
import Dashboard from "./contents/Dashboard";
import MyArticles from "./contents/MyArticles";
import EditArticle from "./contents/EditArticle";
export default {
  name: "Homepage",
  data() {
    return {
      navMenu: {
        onCreateArticle: false,
        onDashboard: true,
        onMyArticles: false,
        onEditArticle: false
      },
      upcomingUpdateArticle: null
    };
  },
  components: {
    Navbar,
    Menu,
    CreateArticle,
    Dashboard,
    MyArticles,
    EditArticle
  },
  methods: {
    //   navMenu
    toCreateArticle() {
      this.navMenu.onCreateArticle = true;
      this.navMenu.onDashboard = false;
      this.navMenu.onMyArticles = false;
      this.navMenu.onEditArticle = false;
    },
    toDashboard() {
      this.navMenu.onCreateArticle = false;
      this.navMenu.onDashboard = true;
      this.navMenu.onMyArticles = false;
      this.navMenu.onEditArticle = false;
    },
    toMyArticles() {
      this.navMenu.onCreateArticle = false;
      this.navMenu.onDashboard = false;
      this.navMenu.onMyArticles = true;
      this.navMenu.onEditArticle = false;
    },
    // End of navMenu
    // update article
    toUpdateArticle(value) {
      this.upcomingUpdateArticle = value;

      this.navMenu.onCreateArticle = false;
      this.navMenu.onDashboard = false;
      this.navMenu.onMyArticles = false;
      this.navMenu.onEditArticle = true;
      // console.log(this.upcomingUpdateArticle);
    },
    // end of update article
    // logout
    logout(value) {
      this.$emit("loggedIn", value);
    }
  }
};
</script>

<style>
</style>