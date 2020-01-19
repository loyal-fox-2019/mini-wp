<template>
  <div class="p-3" style="width: 400px; border: 1px solid black; border-radius: 10px">
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="exampleInputEmail1">Username</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          v-model="username"
        />
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
      <button type="submit" class="btn btn-primary">Register</button>
      <span>
        Already have account ?
        <a href @click.prevent="login">Login</a>
      </span>
    </form>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  data: function() {
    return {
      username: "",
      email: "",
      password: ""
    };
  },
  methods: {
    register() {
      axios({
        method: "post",
        url: "http://localhost:3000/register",
        data: {
          username: this.username,
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem("access_token", data.token);
          this.$emit("pageLogin", false);
          Swal.fire({
            icon: "success",
            title: `Welcome New Member`,
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
    login() {
      this.$emit("login", true);
    }
  }
};
</script>

<style>
</style>