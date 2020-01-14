<template>
  <div id="root">
    <navbar :loginstatus="isLogin" @navbarlogout="logoutAttempt"
    @navbarcontrol="changePage" :fullname="fullname"
    ></navbar>
    <homepage v-show="page === 'home'"></homepage>
    <loginpage :loading="loading"
    @signupattempt="singupAttempt"
    @loginattempt="loginAttempt"
    v-show="page === 'signin'" @googlelogin="google"></loginpage>
    <articles v-show="page === 'articles'" :loading="loading"></articles>
  </div>
</template>

<script>
import axios from '../api/server';
import navbar from './components/navbar.vue';
import homepage from './components/homepage.vue';
import loginpage from './components/loginPage.vue';
import articles from './components/articles.vue';

export default {
  data() {
    return {
      page: 'home',
      message: 'Hello world',
      isLogin: false,
      fullname: null,
      newestArticles: [],
      loading: false,
    };
  },
  methods: {
    loginAttempt(value) {
      this.loading = true;
      axios
        .post('/user', value)
        .then(({ data }) => {
          const { accessToken, fullname } = data;
          localStorage.setItem('token', accessToken);
          localStorage.setItem('fullname', fullname);
          this.checkLogin();
        })
        .catch((error) => {
          if (!error.response.data.errors) {
            this.$swal(
              'Something went wrong with the Server.',
              "i'm sorry but, i might screwed up now :(",
              'error'
            )
          }
          const errors = error.response.data.errors;
          let text = '';
          if (errors.length === 1) {
            text = `${errors[0]}.`;
          } else {
            errors.forEach((err, i) => {
              if(i === errors.length-1 && error.length > 1) {
                let str = `and ${err}.`;
                text += str;
              } else {
                let str = `${err}, `;
                text += str;
              }
            });
          }
          this.$swal(
            'Validation Error',
            text,
            'error'
          );
        })
        .finally(() => this.loading = false)
    },
    singupAttempt(value) {
      this.loading = true;
      axios
        .post('/user/register', value)
        .then(({ data }) => {
          const { accessToken, fullname } = data;
          localStorage.setItem('token', accessToken);
          localStorage.setItem('fullname', fullname);
          this.checkLogin();
        })
        .catch((error) => {
          if (!error.response.data.errors) {
            this.$swal(
              'Something went wrong with the Server.',
              "i'm sorry but, i might screwed up now :(",
              'error'
            )
          }
          const errors = error.response.data.errors;
          let text = '';
          if (errors.length === 1) {
            text = `${errors[0]}.`;
          } else {
            errors.forEach((err, i) => {
              if(i === errors.length-1 && error.length > 1) {
                let str = `and ${err}.`;
                text += str;
              } else {
                let str = `${err}, `;
                text += str;
              }
            });
          }
          this.$swal(
            'Validation Error',
            text,
            'error'
          );
        })
        .finally(() => this.loading = false)
    },
    checkLogin() {
      if (localStorage.getItem('token')) {
        this.fullname = localStorage.getItem('fullname')
        this.isLogin = true;
        this.page = 'home'
        this.fetchData();
      } else {
        this.isLogin = false;
        this.page = 'home'
      }
    },
    fetchData() {
      this.loading = true
    },
    changePage(value) {
      if (value === 'articles') {
        this.fetchData();
      }
      this.pageController(value);
    },
    pageController(value) {
      this.page = value;
    },
    google(idToken) {
      console.log('Please wait...')
      axios
        .post('/user/google-signin', { idToken }, { headers: { token: 'test' } })
        .then(({ data }) => {
          const { accessToken, fullname } = data;
          localStorage.setItem('token', accessToken);
          localStorage.setItem('fullname', fullname);
          this.checkLogin();
        })
        .catch((error) => {
          if (!error.response.data.errors) {
            this.$swal(
              'Something went wrong with the Server.',
              "i'm sorry but, i might screwed up now :(",
              'error'
            )
          }
          const errors = error.response.data.errors;
          let text = '';
          if (errors.length === 1) {
            text = `${errors[0]}.`;
          } else {
            errors.forEach((err, i) => {
              if(i === errors.length-1 && error.length > 1) {
                let str = `and ${err}.`;
                text += str;
              } else {
                let str = `${err}, `;
                text += str;
              }
            });
          }
          this.$swal(
            'Validation Error',
            text,
            'error'
          );
        })
        .finally(() => this.loading = false)
    },
    logoutAttempt() {
      this.checkLogin();
    },
  },
  components: {
    navbar,
    homepage,
    loginpage,
    articles,
  },
  created() {
    this.checkLogin();
    if (localStorage.getItem('accessToken')) {
      this.fullname = localStorage.getItem('fullname')
    } else {
      this.isLogin = false;
      this.fullname = 'User'
    }
  },
  mounted() {
    console.log('Checking...')
    this.checkLogin();
  },
};
</script>

<style scoped>
#root {
  overflow-x: hidden;
  width: 100vw;
  height: 100vh;
}
</style>