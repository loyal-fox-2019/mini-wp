<template>
  <div class="form d-flex justify-content-center align-items-center">
    <div class="w-75">
    <form v-if="status == 'login'" @submit.prevent="login">
      <div class="form-group">
        <label>Email</label>
        <input v-model="email" type="email" class="form-control"  aria-describedby="emailHelp">
      </div>
      <div class="form-group w-100">
        <label>Password</label>
        <input v-model="password" type="password" class="form-control w-100" >
      </div>
      <div class="d-flex justify-content-between align-items-center mt-4">
        <button type="submit" class="btn btn-primary">Login</button>
        <label > or </label>
        <GoogleLogin :params="googleSignInParams" :renderParams="renderParams" :onSuccess="onSuccess"></GoogleLogin>
      </div>
    </form>
    <form v-else-if="status == 'register'" @submit.prevent="register">
      <div class="form-group">
        <label>Username</label>
        <input v-model="username" type="text" class="form-control" >
      </div>
      <div class="form-group">
        <label>Email</label>
        <input v-model="email" type="email" class="form-control"  aria-describedby="emailHelp">
      </div>
      <div class="form-group w-100">
        <label>Password</label>
        <input v-model="password" type="password" class="form-control w-100" >
      </div>
      <div class="d-flex justify-content-between align-items-center mt-4">
        <button type="submit" class="btn btn-primary">Register</button>
      </div>
    </form>
    </div>
      <div class="mt-3 register-account">
        <label v-if="status == 'login'" class="register"> Don't have an account? <a @click.prevent="change('register')">Register</a> </label>
        <label v-else-if="status == 'register'" class="register"> Have an account? <a @click.prevent="change('login')">Login</a> </label>
      </div>
  </div>
</template>

<script>
import axios from '../server'
import swal from 'sweetalert2'
import GoogleLogin from 'vue-google-login'

export default {
  name: 'LeandingPage',
  data () {
    return {
      status: "login",
      email: "",
      password: "",
      username: "",
      googleSignInParams: {
        client_id: '389858522728-c94a09athmmeo7jhkpsfcahqrt0gl4a3.apps.googleusercontent.com'
      },
      renderParams: {
        // longtitle: true,
        theme: 'dark',
      },
    }
  },
  components: {
    GoogleLogin
  },
  created() {
    this.status = 'login'
    this.email = ""
    this.password = ""
    this.username = ""
  },
  methods: {
    onSuccess(googleUser) {
      const idToken = googleUser.getAuthResponse().id_token;
      axios({
        method: 'POST',
        url: 'users/gsign',
        data: {
          idToken
        }
      })
      .then(({data}) => {
        swal.fire({
          title: "Success!",
          text: `Welcome to Mini Wordpress ${data.username}`,
          icon: "success",
          confirmButtonText: "Ok"
        });
        localStorage.setItem('token', data.token)
        this.$emit('loginStatus', true)
      })
      .catch(err => {
        swal.fire({
          title: "Error!",
          text: err.response.data.message,
          icon: "error",
          confirmButtonText: "Ok"
        });
      })
    },
    change(e) {
      this.status = e
      this.email = ""
      this.password = ""
      this.username = ""
    },
    register() {
      axios({
        method: 'POST',
        url: 'users/register',
        data: {
          email: this.email,
          password: this.password,
          username: this.username
        }
      })
      .then(({data}) => {
        swal.fire({
          title: "Success!",
          text: `Welcome to Mini Wordpress ${data.username}`,
          icon: "success",
          confirmButtonText: "Ok"
        });
        localStorage.setItem('token', data.token)
        this.$emit('loginStatus', true)
      })
      .catch(err => {
        swal.fire({
          title: "Error!",
          text: err.response.data.message,
          icon: "error",
          confirmButtonText: "Ok"
        });
      })
    },
    login() {
      axios({
        method: 'POST',
        url: 'users/login',
        data: {
          email: this.email,
          password: this.password
        }
      })
      .then(({data}) => {
        swal.fire({
          title: "Success!",
          text: `Welcome to Mini Wordpress ${data.username}`,
          icon: "success",
          confirmButtonText: "Ok"
        });
        localStorage.setItem('token', data.token)
        this.$emit('loginStatus', true)
      })
      .catch(err => {
        swal.fire({
          title: "Error!",
          text: err.response.data.message,
          icon: "error",
          confirmButtonText: "Ok"
        });
      })
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');
.form {
  width: 100vw;
  height: 100vh;
  background-color: white;
  border-top: 6px solid #007bff;
  position: relative;
}

input, button {
  border-radius: 0px;
  font-family: 'Open Sans', sans-serif;
}

label {
  font-size: 0.8rem;
}

.register {
  font-size: 0.7rem !important
}

.register-account {
  position: absolute;
  bottom: 3rem;
  /* left: 3rem; */
}

a {
  color: #007bff !important;
  cursor: pointer;
}

</style>
