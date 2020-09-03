<template>
  <div>
    <b-navbar toggleable="lg" type="dark">
      <b-navbar-brand @click.prevent="changePage('showAllArticle')"><i class="fas fa-hat-wizard mr-2"></i> Mini Worpress</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item @click.prevent="changePage('createArticle')"><i class="fas fa-plus-circle mr-2"></i>Add article</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item @click.prevent="changePage('showArticle')"><i class="fas fa-newspaper mr-2"></i>My article</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form @submit.prevent="searchContent">
            <b-form-input v-model="search" size="sm" class="mr-sm-2" placeholder="Search article tag"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" variant="primary" type="submit">Search</b-button>
          </b-nav-form>

          <b-nav-item :params="googleSignInParams" :logoutButton=true @click.prevent="logout" class="ml-3"><i class="fas fa-sign-out-alt"></i> Logout</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div class="line">
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert2'
import axios from '../server'
import GoogleLogin from 'vue-google-login'

export default {
  components: {
    GoogleLogin
  },
  data () {
    return {
      search: '',
      googleSignInParams: {
        client_id: '389858522728-c94a09athmmeo7jhkpsfcahqrt0gl4a3.apps.googleusercontent.com'
      },
    }
  },
  methods: {
    searchContent() {
      this.$emit('searchContent', this.search)
    },
    changePage(e) {
      this.$emit("changePage", e);
    },
    logout() {
      swal.fire({
        title: "Are you sure to Logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Logout!"
      }).then(result => {
        if (result.value) {
          swal.fire({
            title: "Success!",
            text: "See you soon.....",
            icon: "success",
            confirmButtonText: "Oke"
          });
          const auth2 = gapi.auth2.getAuthInstance();
          auth2.signOut()
          localStorage.removeItem("token");
          this.$emit("loginStatus", false);
        }
      });
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');

nav {
  background-color: #ba111f !important;
  width: 100%;
  font-family: 'Open Sans', sans-serif;

}

.line {
  height: 0.4rem;
  border-bottom: 3px solid #007bff
}
.navbar-dark .navbar-brand {
  cursor: pointer !important;
}
</style>
