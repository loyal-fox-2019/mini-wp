<template>
  <div class="p-3" style="width: 400px; border: 1px solid black; border-radius: 10px">
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          v-model="email"
        />
        <small
          id="emailHelp"
          class="form-text text-muted"
        >We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" v-model="password" />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
      <span>
        Dont have account yet ?
        <a href @click.prevent="register">Register</a>
        <!-- <div class="g-signin2" data-onsuccess="onSignIn"></div>
        <a href @click="signOut;">Sign out</a>-->
      </span>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      axios({
        method: "post",
        url: "http://localhost:3000/login",
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem("access_token", data.token);
          this.$emit("login", false);
          Swal.fire({
            icon: "success",
            title: `Welcomeback`,
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(err => {
          console.log(err.response.data.message);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.response.data.message
          });
        });
    },
    register() {
      this.$emit("register", false);
    },
    onSignIn(googleUser) {
      console.log("ok");
      var profile = googleUser.getBasicProfile();
      var id_token = googleUser.getAuthResponse().id_token;
      axios({
        url: `http://localhost:3000/login-google`,
        method: "post",
        data: {
          google_token: id_token,
          email: profile.U3
        }
      })
        .then(({ data }) => {
          console.log(data);
          localStorage.setItem("access_token", data.token);
          console.log(localStorage.getItem("access_token"));
          this.$emit("login", false);
        })
        .catch(err => {
          console.log(err.response.data.message);
        });
    },
    signOut() {
      console.log("ok");
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function() {
        localStorage.clear();
        console.log("User signed out.");
      });
    }
  }
};
</script>

<style>
</style>