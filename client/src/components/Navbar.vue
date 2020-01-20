<template>
  <div>
    <div>
      <b-navbar toggleable="sm" type="light" variant="dark" style="border-bottom: 3px double black">
        <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

        <b-navbar-brand>
          <b-link to="/" class="text-dark border-info">
            <b-button variant="outline-light" class="ml-3">
              Slim WP
              <i class="book icon"></i>
            </b-button>
          </b-link>
          <button class="positive ui button ml-5" @click.prevent="goCreate">
            <i class="plus icon"></i>Create
          </button>
        </b-navbar-brand>

        <b-navbar-nav class="ml-auto">
          <div class="mt-2 mr-5">
            <div class="ui search">
              <div class="ui icon input">
                <input
                  class="prompt"
                  type="text"
                  placeholder="Search article..."
                  v-model="$root.Search"
                />
                <i class="search icon"></i>
              </div>
              <div class="results"></div>
            </div>
          </div>
          <b-collapse id="nav-text-collapse" is-nav v-show="!this.$root.nowLogin">
            <b-navbar-nav v-show="!this.$root.nowLogin">
              <b-nav-text>
                <b-link to="/login" class="text-dark border-info">
                  <sui-button animated inverted>
                    <sui-button-content visible color="black" inverted class="signsign">Sign in/up</sui-button-content>
                    <sui-button-content hidden>
                      <sui-icon name="right arrow" />
                    </sui-button-content>
                  </sui-button>
                </b-link>
              </b-nav-text>
            </b-navbar-nav>
          </b-collapse>
          <b-collapse id="nav-text-collapse" is-nav v-show="this.$root.nowLogin">
            <b-navbar-nav>
              <b-nav-text>
                <b-link to="/user" v-if="this.$root.nowLogin" class="text-dark border-warning">
                  <b-button variant="outline-primary">
                    My Article
                    <b-icon-person variant="light"></b-icon-person>
                  </b-button>
                </b-link>
                <b-button
                  @click.prevent="logout"
                  v-if="this.$root.nowLogin"
                  class="border-info ml-4 mr-5"
                  variant="outline-danger"
                >
                  Logout
                  <i class="sign-out icon"></i>
                </b-button>
              </b-nav-text>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar-nav>
      </b-navbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {};
  },
  created() {},
  compute: {},
  methods: {
    logout() {
      this.$root.nowLogin = false;
      localStorage.removeItem("token");
      function signOut() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function() {
          console.log("User signed out.");
        });
      }
      this.$router.push({ path: "/login" });
    },
    goCreate() {
      if (this.$root.nowLogin === false) {
        this.$swal.fire({
          icon: "error",
          title: "Sorry..",
          text: "You need login first before create an article!"
        });
        this.$router.push("/login");
      } else {
        this.$router.push("/create");
      }
    }
  }
};
</script>

<style scoped>
</style>