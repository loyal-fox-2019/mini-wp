<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">Profile</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group mr-2"></div>
      </div>
    </div>
    <div>
      <div class="row">
        <div class="col-md-4"></div>
        <form class="col-md-8" @submit.prevent="editProfile">
          <div class="alert alert-success" role="alert" v-if="successMessage">{{successMessage}}</div>
          <div class="alert alert-danger" role="alert" v-if="errorMessage">{{errorMessage}}</div>
          <div class="form-group">
            <label for="inputEditName">Name</label>
            <input type="text" class="form-control" id="inputEditName" v-model="name" required />
          </div>
          <div class="form-group">
            <label for="inputEditEmail">Email</label>
            <input type="email" class="form-control" id="inputEditEmail" v-model="email" required />
          </div>
          <input type="submit" class="btn btn-primary" value="Edit" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../axios-config";

export default {
  name: "ProfileView",
  data() {
    return {
      name: "",
      email: "",
      successMessage: "",
      errorMessage: ""
    };
  },
  methods: {
    editProfile() {
      const access_token = localStorage.getItem("access_token");
      axios({
        method: "POST",
        url: "users/profile",
        headers: {
          access_token: access_token
        },
        data: {
          name: this.name,
          email: this.email
        }
      })
        .then(({ data }) => {
            this.successMessage = "User Profile Has Been Updated!";
          this.name = data.user.name;
          this.email = data.user.email;
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  },
  created() {
    this.successMessage = "";
    this.errorMessage = "";
    const access_token = localStorage.getItem("access_token");
    axios({
      method: "GET",
      url: "users",
      headers: {
        access_token: access_token
      }
    })
      .then(({ data }) => {
        
        this.name = data.user.name;
        this.email = data.user.email;
      })
      .catch(err => {
        console.log(err.response)
      });
  }
};
</script>

<style scoped>
</style>