<template>
  <div>
    <div>
      <b-navbar toggleable="sm" type="dark" variant="light" style="border-bottom: 3px double black">
        <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

        <b-navbar-brand>
          <b-link to="/" class="text-dark border-info">
            <b-button variant="outline-dark" class="ml-3">Slim WP</b-button>
          </b-link>
        </b-navbar-brand>

        <b-navbar-nav class="ml-auto">
          <b-nav-form class="mr-5">
            <b-form-input class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button variant="outline-success" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>
          <b-collapse id="nav-text-collapse" is-nav v-show="!this.$root.nowLogin">
            <b-navbar-nav v-show="!this.$root.nowLogin">
              <b-nav-text>
                <b-link to="/login" class="text-dark border-info">
                  <b-button variant="outline-dark">Login/Register</b-button>
                </b-link>
              </b-nav-text>
            </b-navbar-nav>
          </b-collapse>
          <b-collapse id="nav-text-collapse" is-nav v-show="this.$root.nowLogin">
            <b-navbar-nav>
              <b-nav-text>
                <b-link
                  to="/user"
                  v-if="this.$root.nowLogin"
                  class="text-dark border-warning"
                ><b-button variant="outline-primary">My Article</b-button></b-link>
                <b-button
                  @click.prevent="logout"
                  v-if="this.$root.nowLogin"
                  class="border-info ml-4 mr-5"
                  variant="outline-danger"
                >Logout</b-button>
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
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style>
</style>