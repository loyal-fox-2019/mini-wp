<template>
  <div>
    <b-navbar toggleable="lg" type="info" variant="light" class="ml-3 mr-3 mb-0">
      <b-navbar-brand href="#" @click.prevent="changePage('home')">HotBlog</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#" @click.prevent="changePage('articles')">Articles</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right v-if="loginstatus">
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              {{getName}}
            </template>
            <b-dropdown-item href="#"
            @click.prevent="changePage('Dashboard')">Dashboard</b-dropdown-item>
            <b-dropdown-item href="#"
            :params="googleSignInParams" :logoutButton=true @click.prevent="logoutMethod">
              Sign Out
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-button size="sm" variant="outline-primary" pill
            class="my-2 my-sm-0 ml-2" type="submit" @click.prevent="changePage('signin')" v-else>Sign In</b-button>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import GoogleLogin from 'vue-google-login';

export default {
  props: {
    loginstatus: {
      type: Boolean
    },
    fullname: {
      type: String,
    },
  },
  name: 'navbar',
  data() {
    return {
      message: 'Hello world',
      googleSignInParams: {
        client_id: '16331000744-eogg0oadrtbd8rlq0udpjujrh3qm4rin.apps.googleusercontent.com'
      },
    };
  },
  components: {
    GoogleLogin,
  },
  methods: {
    changePage(page) {
      this.$emit('navbarcontrol', page)
    },
    logoutMethod() {
      localStorage.removeItem('token');
      localStorage.removeItem('fullname');
      this.$emit('navbarlogout');
    },
  },
  computed: {
    getName: function() {
      const name = this.fullname.split(' ')
      return `${name[0]},`
    }
  },
};
</script>

<style scoped>
</style>