<template>
  <div class="p-2 m-2 d-flex justify-content-center">
    <div class="custom-form">
      <b-form class="py-2 px-5" @submit.prevent="register">
        <div class="text-center">
          <h1 class="text-light">Register For Free</h1>
          <h1 class="text-light">Forever</h1>
        </div>
        <b-form-group
          id="input-group-1"
          label="Username:"
          label-for="input-1"
          class="text-light"
        >
          <b-form-input
            id="input-1"
            type="text"
            required
            placeholder="Enter username"
            v-model="username"
            autocomplete="off"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
          class="text-light"
        >
          <b-form-input
            id="input-1"
            type="email"
            required
            placeholder="Enter email"
            v-model="email"
            autocomplete="off"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Password:" label-for="input-2" class="text-light">
          <b-form-input
            id="input-2"
            type="password"
            placeholder="Password"
            v-model="password"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" squared class="custom-color">Register</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import api from '../api'
import errorHandler from '../helpers/error-handler.js'

export default {
  name: 'login-form',
  data: function() {
    return {
      username: '',
      email: '',
      password: '',
    }
  },
  methods: {
    register() {
      this.$swal.fire({
        title: 'Register...',
        onBeforeOpen: () => {
          this.$swal.showLoading()
        }
      })

      api.post('/register', {
        username: this.username,
        email: this.email,
        password: this.password
      })
        .then(({ data }) => {
          this.$swal.fire({
            title: 'Register success',
            timer: 1500,
            icon: 'success',
            showConfirmButton: false
          })

          console.log(data)
        })
        .catch(err => {
          this.$swal.close()
          const self = this
          errorHandler(err, self)
        })
    }
  }
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
  height: 50%;
}
</style>
