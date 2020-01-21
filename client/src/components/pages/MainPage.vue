<template>
  <div>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Mini WP</a>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#" @click.prevent="signOut">Sign out</a>
        </li>
      </ul>
    </nav>

    <div class="container-fluid pt-5">
      <div class="row">
        <nav class="col-md-2 d-none d-md-block bg-light sidebar">
          <div class="sidebar-sticky">
            <ul class="nav flex-column">
              <li class="nav-item">
                <a class="nav-link active" href="#" @click.prevent="changePage('Dashboard')">
                  <span data-feather="home"></span>
                  Dashboard
                  <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" @click.prevent="changePage('Article')">
                  <span data-feather="file"></span>
                  Article
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" @click.prevent="changePage('Profile')">
                  <span data-feather="file"></span>
                  Profile
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <Dashboard-View v-if="activePage === 'Dashboard'"></Dashboard-View>
          <Article-List-View v-if="activePage === 'Article'"></Article-List-View>
          <Profile-View v-if="activePage === 'Profile'"></Profile-View>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardView from '../DashboardView'
import ArticleListView from '../ArticleListView'
import ProfileView from '../ProfileView'

export default {
  name: "main-page",
  components: {
      DashboardView,
      ArticleListView,
      ProfileView
  },
  data: function() {
    return {
      activePage: "Dashboard"
    };
  },
  props: ["currentPage"],
  methods: {
    signOut() {
      localStorage.removeItem("access_token");
      this.$emit("check-login-lagi");
    },
    changePage(page) {
      this.activePage = page;
    }
  },
  watch: {
    activePage: function() {
        
    }
  },

  created() {}
};
</script>
 
<style>
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
@import "https://getbootstrap.com/docs/4.4/examples/dashboard/dashboard.css";
</style>