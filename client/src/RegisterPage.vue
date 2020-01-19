<template>
  <div>
    <b-container fluid class="vh-100" style="background-color:#006088;">
      <b-row class="justify-content-center">
        <b-col cols="3" class="mt-5 text-center text-light">
          <i class="fab fa-vuejs fa-3x"></i>
          <h2 class="mt-3 text-center font-weight-light">Let's get started</h2>
          <p style="font-size:16px;" class="font-weight-light">First, create your minivipi account.</p>
        </b-col>
      </b-row>
      <b-row class="justify-content-center">
        <b-col cols="3">
          <b-card>
            <b-form @submit.prevent="onSubmit">
              <b-form-group
                id="input-group-1"
                label="Your Name"
                label-for="name"
                style="font-size:13px"
                class="font-weight-bolder"
              >

                <b-input-group>
                  <b-form-input aria-label="First name" id="name" v-model="form.firstName" placeholder="First Name" required></b-form-input>
                  <b-form-input aria-label="Last name" v-model="form.lastName" placeholder="Last Name"></b-form-input>
                </b-input-group>
              </b-form-group>

              <b-form-group
                id="input-group-1"
                label="Your email address"
                label-for="email"
                style="font-size:13px"
                class="font-weight-bolder"
              >
                <b-form-input
                  id="email"
                  v-model="form.email"
                  type="text"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="Choose a username"
                label-for="username"
                style="font-size:13px"
                class="font-weight-bolder"
              >
                <b-form-input
                  id="username"
                  v-model="form.username"
                  type="text"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-3"
                label="Choose a password"
                label-for="password"
                style="font-size:13px"
                class="font-weight-bolder"
              >
                <b-form-input
                  id="password"
                  v-model="form.password"
                  type="password"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-4"
                label="Confirm password"
                label-for="confirmPassword"
                style="font-size:13px"
                class="font-weight-bolder"
              >
                <b-form-input
                  id="confirmPassword"
                  v-model="form.confirmPassword"
                  type="password"
                  required
                ></b-form-input>
              </b-form-group>

              <p class="text-center" style="font-size:10px;">
                By register, you agree to our <a href="https://wordpress.com/tos/">Terms of Service.</a>
              </p>

              <b-button type="submit" variant="danger" class="shadow-sm btn-block">Register</b-button>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
      <b-row align-h="center">
        <b-col cols="3" class="text-center">
          <div class="my-2 text-light">
            <span style="font-size:14px;opacity:0.7;">
              &boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&nbsp; or &nbsp;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;
            </span>
          </div>
        </b-col>
      </b-row>
      <b-row class="justify-content-center">
        <b-col cols="3" class="text-center">
          <a href="#" @click.prevent="login" style="font-size:13px;" class="text-light py-3">Log in to your existing account.</a>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
    }
  },
  methods: {
    onSubmit(evt) {
      if (this.form.password != this.form.confirmPassword) {
        this.$swal(
          'Incorrect',
          'Confirm Password and Password are different',
          'error'
        );
      } else {
        axios({
          method: 'POST',
          url: `${this.$baseUrl}/user/register`,
          data: this.form
        })
          .then(({data}) => {
            localStorage.token = data.token;
            localStorage.name = data.name;
            this.userPage();
          }).catch((err) => {
            console.log(err);
            this.$swal(
              'Forbidden',
              'Username or Email already taken',
              'error'
            );
          });
      }
    },
    userPage(){
      const Toast = this.$swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', this.$swal.stopTimer)
          toast.addEventListener('mouseleave', this.$swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'success',
        title: 'Registration successfully'
      });

      this.$router.replace({ name: "user-page" });
      this.$emit("authenticated", true);
    },
    login() {
      this.$router.replace({ name: "login-page" });
    },
  },
}
</script>

<style scoped>

</style>