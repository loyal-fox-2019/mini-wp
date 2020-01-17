<template>
  <section id="login-page">
    <div id="picture">
      <img id="image" src="../assets/signin.svg" alt="">
    </div>

    <div id="form">
      <section id="box" class="text-center">
        <div id="header">
          <!-- sign in with email & password -->
          <div v-if="page === 'signin'" class="mt-5 ml-5 mr-5">
            <span>Welcome back to HotBLOG.</span>
            <b-form-input v-model="email"
            class="mt-2"
            type="email"
            placeholder="Enter your email"></b-form-input>
            <b-form-input v-model="password"
            class="mt-2"
            type="password" placeholder="Enter your password"></b-form-input>
            <div id="button-holder" class="mt-3 mb-2">
              <b-button pill @click="loginAttempt" variant="primary">Sign In</b-button>
              <b-button pill @click.prevent="changePage('signup')" variant="primary">Sign Up</b-button>
            </div>
          </div>
          <!-- End of sign in with email & password -->


          <!-- Sign up form -->
          <div v-if="page === 'signup'" class="mt-3 ml-5 mr-5">
            <span>Sign Up is always free!</span>
            <b-form-input v-model="fullname"
            class="mt-3 my-form"
            type="text"
            placeholder="Enter your fullname" required></b-form-input>
            <b-form-input v-model="email"
            class="mt-1 my-form"
            type="email"
            placeholder="Enter your email" required></b-form-input>
            <password v-model="password"
            id="passwordchecker"
            class="mt-1"
            :toggle="true"
            :secureLength="6"
            :badge="false"
            :required="true"
            @score="showScore"
            ></password>
            <div id="button-holder" class="mt-0 mb-2" v-if="!loading">
              <b-button pill @click="changePage('signin')" variant="primary">Sign In</b-button>
              <b-button pill disabled variant="primary" v-show="!isPasswordAllowed">Sign Up</b-button>
              <b-button pill @click.prevent="signUpAttempt"
              v-show="isPasswordAllowed"
              variant="primary">Sign Up</b-button>
            </div>
            <div class="text-center mt-3 mb-2" v-else>
              <b-spinner variant="primary" label="Text Centered"></b-spinner>
            </div>
          </div>
          <!-- End of sign up form -->
        </div>

        <div id="footer">
          <!-- Sign in with google -->
          <hr class="mt-3">
            or
          <br>
          <b-button variant="outline">
            <GoogleLogin
            :params="googleSignInParams" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
          </b-button>
          <!-- End of sign in with google -->
        </div>



      </section>
    </div>
  </section>
</template>

<script>
import GoogleLogin from 'vue-google-login';
import axios from '../../api/server.js';
import Password from 'vue-password-strength-meter'

export default {
  name: 'loginPage',
  props: {
    loading: {
      type: Boolean,
    },
    lockLogin: {
      type: Boolean,
    },
  },
  data() {
    return {
      isPasswordAllowed: false,
      type: 'password',
      fullname: '',
      email: '',
      password: '',
      page: 'signin',
      googleSignInParams: {
        client_id: '507377424775-f3825a1cf4ldhi585infn32s27di00pq.apps.googleusercontent.com'
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true,
        theme: 'dark',
      },
    };
  },
  methods: {
    loginAttempt() {
      const docs = {
        email: this.email,
        password: this.password,
      };
      this.password = '';
      this.$emit('loginattempt', docs);
    },
    onSuccess(googleUser) {
      const id_token = googleUser.getAuthResponse().id_token;
      this.$emit('googlelogin', id_token);
    },
    onFailure(error) {
      console.log(err);
    },
    changePage(value) {
      this.page = value;
    },
    signUpAttempt() {
      const docs = {
        fullname: this.fullname,
        email: this.email,
        password: this.password,
      };
      this.$emit('signupattempt', docs);
      this.fullname = '';
      this.email = '';
      this.password = '';
    },
    showScore (score) {
      if (score < 2) {
        this.isPasswordAllowed = false;
      } else {
        this.isPasswordAllowed = true;
      }
    },
  },
  components: {
    GoogleLogin,
    Password,
  },
};
</script>

<style scoped>

#login-page {
  display: inline-flex;
}
#image {
  position: relative;
  top: 14%;
  width: 60vw;
  height: 80vh;
}
#box {
  border-radius: 1rem;
  width: 25vw;
  height: 60vh;
  position: relative;
  left: 40%;
  transform: translate(0, 50%);
  bottom: 20%;
}

#header {
  border-radius: 1rem;
  border: 1px solid #007bff;
  height: 40vh;
}

.my-form {
  /* border: none; */
  background-color: #f1f1f1;
  border: 1px solid #f1f1f1;
}

#passwordchecker {
  height: calc(1.5em + 0.75rem + 2px) !important;
}

</style>
