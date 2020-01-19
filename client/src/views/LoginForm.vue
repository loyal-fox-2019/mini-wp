<template>
  <div class="p-2 m-2 d-flex justify-content-center">
    <div class="custom-form">
      <b-form class="py-2 px-5" @submit.prevent="login">
        <div class="text-center">
          <h1 class="text-light mb-0">Let's Write A</h1>
          <h1
            class="text-light"
            style="font-family: 'Times New Roman', Times, serif;"
          >
            Masterpiece
          </h1>
        </div>
        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
          class="text-light"
        >
          <b-form-input
            id="input-1"
            type="email"
            v-model="email"
            required
            placeholder="Enter email"
            autocomplete="off"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Password:"
          label-for="input-2"
          class="text-light"
        >
          <b-form-input
            id="input-2"
            type="password"
            placeholder="Password"
            v-model="password"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" squared class="custom-color">Login</b-button>
      </b-form>
      <div class="px-5 text-center">
        <div class="row">
          <div class="col-5">
            <hr style="border: 0.1rem solid white;" />
          </div>
          <div class="col-2">
            <p class="lead text-light">or</p>
          </div>
          <div class="col-5">
            <hr style="border: 0.1rem solid white;" />
          </div>
        </div>
        <GoogleLogin :params="params" :onSuccess="onSuccess" :onFailure="onFailure" class="btn btn-light btn-block rounded-0"><span class="fab fa-google"></span> Continue with google</GoogleLogin>
        <b-button squared block variant="primary"><span class="fab fa-twitter"></span> Continue with Twitter</b-button>
        <b-button squared block variant="dark"><span class="fab fa-github"></span> Continue with Github</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api'
import errorHandler from '../helpers/error-handler.js'
import GoogleLogin from 'vue-google-login'

export default {
  name: 'login-form',
  data: function() {
    return {
      params: {
        client_id:
          '379332147243-cl1vsiut4mb3e680cmvqo5em2um9355m.apps.googleusercontent.com',
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true,
      },
      email: '',
      password: '',
    }
  },
  components: {
    GoogleLogin,
  },
  methods: {
    onSuccess(googleUser) {
      this.$swal.fire({
        title: 'Login...',
        onBeforeOpen: () => {
          this.$swal.showLoading()
        }
      })

      const googleToken = googleUser.getAuthResponse().id_token

      api.post('/third-api/login-google', { googleToken })
        .then(({ data }) => {
          this.$swal.fire({
            title: 'Login success',
            timer: 1500,
            icon: 'success',
            showConfirmButton: false
          })

          this.$emit('updateUserStatus', {
            token: data.token,
            username: data.username,
            type: 'login'
          })
        })
        .catch(err => {
          this.$swal.close()
          const self = this
          errorHandler(err, self)
        })
    },
    onFailure(err) {
      this.$bvToast.toast('Failed to continue with google account', {
        title: 'Error happened',
        autoHideDelay: 3000,
        appendToast: true,
        solid: true,
        variant: 'danger'
      })
    },
    login() {
      this.$swal.fire({
        title: 'Login...',
        onBeforeOpen: () => {
          this.$swal.showLoading()
        }
      })

      api.post('/login', {
        email: this.email,
        password: this.password
      })
        .then(({ data }) => {
          this.$swal.fire({
            title: 'Login success',
            timer: 1500,
            icon: 'success',
            showConfirmButton: false
          })

          this.$emit('updateUserStatus', {
            token: data.token,
            username: data.username,
            type: 'login'
          })
        })
        .catch(err => {
          this.$swal.close()
          const self = this
          errorHandler(err, self)
        })
    },
  },
}
</script>

<style scoped>
.custom-color {
  background-color: #6e8f8a !important;
  border: #6e8f8a !important;
  border-color: #6e8f8a !important;
}

.custom-color:hover {
  background-color: #a2b8b4 !important;
  border: #a2b8b4 !important;
  border-color: #a2b8b4 !important;
}

.custom-form {
  background-color: rgb(0, 0, 0, 0.1) !important;
  width: 40%;
  height: 62%;
}
</style>
