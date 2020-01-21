<template>
  <div class="text-center col-md-3 mt-5 mx-auto mt-5" id="form-login-wrapper">
    <form class="form-signin" @submit.prevent="login" v-show="currentForm=='loginForm'">
      <h1 class="h3 mb-3 font-weight-normal">Login</h1>
      <div class="alert alert-danger" role="alert" v-if="errorMessage">{{errorMessage}}</div>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control my-2 my-2"
        placeholder="Email address"
        required
        autofocus
        v-model="loginEmail"
      />
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control my-2 my-2"
        placeholder="Password"
        required
        v-model="loginPassword"
      />
      <input class="btn btn-sm btn-primary btn-block" type="submit" value="Login" />
      <span class="mt-3">
        Don't have account ?
        <br />let's
        <a href="#" @click.prevent="toggleForm">register</a>
        <br />
        <hr />
        <!-- <Google-Signin-Button @click.prevent="googleSignin"></Google-Signin-Button> -->
      </span>
      <div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
      <p class="mt-5 mb-3 text-muted">MINI-WP &copy; 2019</p>
    </form>
    <form class="form-signin" @submit.prevent="register" v-show="currentForm=='registerForm'">
      <h1 class="h3 mb-3 font-weight-normal">Register</h1>
      <div class="alert alert-danger" role="alert" v-if="errorMessage">{{errorMessage}}</div>
      <label for="inputName" class="sr-only">Name</label>
      <input
        type="text"
        id="inputName"
        class="form-control my-2"
        placeholder="Full Name"
        required
        autofocus
        v-model="registerName"
      />
      <label for="inputEmail" class="sr-only">Email address</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control my-2"
        placeholder="Email address"
        required
        v-model="registerEmail"
      />
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control my-2"
        placeholder="Password"
        required
        v-model="registerPassword"
      />
      <input class="btn btn-sm btn-primary btn-block" type="submit" value="Login" />
      <span class="my-3">
        Already have account ?
        <br />let's
        <a href="#" @click.prevent="toggleForm">login</a>
      </span>
      <p class="mt-5 mb-3 text-muted">MINI-WP &copy; 2019</p>
    </form>
  </div>
</template>

<script>
import axios from "../../axios-config";
import GoogleSigninButton from "../GoogleSigninButton";

export default {
  name: "loginPage",
  components: {
    GoogleSigninButton
  },
  data: function() {
    return {
      registerName: "",
      registerEmail: "",
      registerPassword: "",
      loginEmail: "",
      loginPassword: "",
      errorMessage: "",
      currentForm: "loginForm",
      googleSignInParams: {
        client_id: this.$googleId
      }
    };
  },
  props: {
    currentPage: String
  },
  methods: {
    login() {
      axios({
        method: "POST",
        url: "login",
        data: {
          email: this.loginEmail,
          password: this.loginPassword
        }
      })
        .then(({ data }) => {
          localStorage.setItem("access_token", data.access_token);
          this.$emit("check-login-lagi");
        })
        .catch(err => {
          this.errorMessage = err.response.data.message;
        });
    },

    register() {
      axios({
        method: "POST",
        url: "register",
        data: {
          name: this.registerName,
          email: this.registerEmail,
          password: this.registerPassword
        }
      })
        .then(({ data }) => {
          localStorage.setItem("access_token", data.access_token);
          this.$emit("check-login-lagi");
        })
        .catch(err => {
          this.errorMessage = err.response.data.message;
        });
    },

    toggleForm() {
      this.errorMessage = null;
      if (this.currentForm == "loginForm") {
        this.currentForm = "registerForm";
      } else if (this.currentForm == "registerForm") {
        this.currentForm = "loginForm";
      }
    },

    onSignInSuccess: function(googleUser) {
      let googleToken = googleUser.getAuthResponse().id_token;
      axios({
        method: "post",
        url: `authors/login/oauth/${googleToken}`
      })
        .then(({ data }) => {
          if (data) {
            this.header = "Sign In Success";
            this.content = data.message;
            localStorage.token = data.token;
            location.reload();
          }
        })
        .catch(err => {
          this.$toast.error({
            title: "Error Sign In",
            message: err.response.data.message
          });
        });
    },
    onSignInError(error) {
      // `error` contains any error occurred.
      this.$toast.error({
        title: "Error Sign In",
        message: err.response.data.message
      });
    }
  }
};
</script>

<style scoped>
#form-login-wrapper {
  -webkit-box-shadow: 3px 3px 5px 6px #ccc; /* Safari 3-4, iOS 4.0.2 - 4.2, Android 2.3+ */
  -moz-box-shadow: 3px 3px 5px 6px #ccc; /* Firefox 3.5 - 3.6 */
  box-shadow: 3px 3px 5px 6px #ccc;
  padding: 50px;
  border-radius: 25px;
}
</style>