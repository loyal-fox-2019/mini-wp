<template>
  <div>
    <b-card>
      <b-form @submit.prevent="onSubmit" v-if="show">
        <b-form-group
          id="input-group-1"
          label="Username or Email"
          label-for="username"
          style="font-size:15px"
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
          id="input-group-1"
          label="Password"
          label-for="password"
          style="font-size:15px"
          class="font-weight-bolder"
        >
          <b-form-input
            id="password"
            v-model="form.password"
            type="password"
            required
          ></b-form-input>
        </b-form-group>

        <p class="text-center" style="font-size:10px;">
          By login, you agree to our <a href="https://wordpress.com/tos/">Terms of Service.</a>
        </p>

        <b-button type="submit" variant="danger" class="shadow-sm btn-block">Login</b-button>
        <div class="text-center my-2">
          <span style="font-size:14px;opacity:0.7;">
            &boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&nbsp; OR &nbsp;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;
          </span>
        </div>
        <g-login-button @authenticated="getAuth"></g-login-button>
        <p class="text-center my-3" style="font-size:10px;">
          If you continue with Google and don't already have a minivipi account, you are creating an account and you agree to our <a href="https://wordpress.com/tos/">Terms of Service.</a>.
        </p>
      </b-form>
    </b-card>
  </div>
</template>

<script>
  import GLoginButton from './GLoginButton';
  import axios from 'axios';

  export default {
    data() {
      return {
        form: {
          username: '',
          password: ''
        },
        show: true,
        googleUser: null
      }
    },
    methods: {
      onSubmit(evt) {
        const {username, password} = this.form;
        
        axios({
          method: 'POST',
          url: `${this.$baseUrl}/user/login`,
          data: {
            username, password
          }
        })
          .then(({data}) => {
            localStorage.token = data.token;
            localStorage.name = data.name;
            this.getAuth(true);
          }).catch((err) => {
            console.log(err);

            this.$swal.fire(
              'Forbidden',
              'Incorrect Username or Password',
              'error'
            )
          });
      },
      getAuth(val) {
        if (val) {
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
            title: 'Signed in successfully'
          });

          this.$emit("authenticated", true);
        }
      }
    },
    components: {
      GLoginButton,      
    },
  }
</script>

<style scoped>

</style>