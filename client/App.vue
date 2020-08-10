<template>
  <div id="app">
    <Header v-bind:state="state" v-on:userSignOut="signOut"></Header>
    <b-alert :show="alert" variant="warning">{{ message }}</b-alert>

    <Login
      v-show="state === 0"
      v-on:userSignIn="signIn"
      v-on:goToRegisterPage="state = 1"
    ></Login>
    <Register
      v-show="state === 1"
      v-on:userRegister="register"
      v-on:goToLogInPage="state = 0"
    ></Register>
    <Profile v-bind:currUser="currUser" v-show="state === 2"></Profile>
    <!-- <ViewArticle v-show="state === 3"></ViewArticle> -->
    <!-- <EditArticle v-show="state === 4"></EditArticle> -->
    <CreateArticle v-show="state === 5"></CreateArticle>

    <!-- <Footer></Footer> -->
  </div>
</template>

<script>
import axios from 'axios';
import Header from './components/Header.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Profile from './components/Profile.vue';
import CreateArticle from './components/CreateArticle.vue';

/**
 * Data `state` adalah sebuah data untuk mengontrol halaman user
 * 0 -- login
 * 1 -- register
 * 2 -- view profile
 * 3 -- view article
 * 4 -- edit article
 * 5 -- create article
 */

export default {
  name: 'app',
  data() {
    return {
      state: 0,
      message: null,
      alert: false,
      currUser: null
    };
  },
  methods: {
    signIn(userData) {
      // kalau berhasil
      const { email, password } = userData;

      if (!email || !password) {
        console.log(`OK`);
        this.alert = true;
        this.message = '400 Email and password is required!';
      } else {
        this.alert = false;
        axios
          .post('http://localhost:3000/users/login', {
            email,
            password
          })
          .then(result => {
            const {
              data: { token },
              status
            } = result;

            if (status === 200) {
              // user berhasil login
              localStorage.setItem('token', token);
              this.state = 2;
            }
          })
          .catch(err => {
            this.alert = true;
            const {
              data: { message },
              status
            } = err.response;
            this.message = `${status} ${message}`;
          });
      }
    },
    signOut() {
      localStorage.removeItem('token');
      this.state = 0;
    },
    register(userData) {
      const { email, password } = userData;

      if (!email || !password) {
        console.log(`OK`);
        this.alert = true;
        this.message = '400 Email and password is required!';
      } else {
        this.alert = false;
        axios
          .post('http://localhost:3000/users/register', {
            email,
            password
          })
          .then(result => {
            const {
              data: { token },
              status
            } = result;
            if (status === 201) {
              // user berhasil login
              localStorage.setItem('token', token);
              this.state = 2;
            }
          })
          .catch(err => {
            this.alert = true;
            const {
              data: { message },
              status
            } = err.response;
            this.message = `${status} ${message}`;
          });
      }
    }
  },
  components: {
    Header,
    Profile,
    CreateArticle,
    Register,
    Login
  },
  created() {
    const token = localStorage.getItem('token');
    if (token) {
      this.state = 2;
    }

    axios
      .get('http://localhost:3000/users/', {
        headers: { token }
      })
      .then(result => {
        const { data, status } = result;
        if (status === 200) {
          this.currUser = data;

          return axios.get('http://localhost:3000/articles', {
            headers: { token }
          });
        }
      })
      .then(result => {
        const { data, status } = result;
        this.currUser.articles = data;
      })
      .catch(err => {
        const {
          data: { message },
          status
        } = err.response;
        console.log(`${status} ${message}`);
      });
  }
};
</script>

<style></style>
