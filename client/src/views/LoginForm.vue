<template>
  <div class="p-2 m-2 d-flex justify-content-center">
    <div class="custom-form">
      <b-form class="py-2 px-5">
        <div class="text-center">
          <h1 class="text-light mb-0">Let's write a</h1>
          <h1
            class="text-light"
            style="font-family: 'Times New Roman', Times, serif;"
          >
            masterpiece
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
            required
            placeholder="Enter email"
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
        <b-button squared block>Continue with google</b-button>
        <b-button squared block>Continue with Github</b-button>
        <b-button squared block>Continue with Twitter</b-button>
        <GoogleLogin
          :params="params"
          :renderParams="renderParams"
          :onSuccess="onSuccess"
          :onFailure="onFailure"
        ></GoogleLogin>
      </div>
    </div>
  </div>
</template>

<script>
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
    }
  },
  components: {
    GoogleLogin,
  },
  methods: {
    onSuccess(googleUser) {
      console.log(googleUser)
      console.log(googleUser.getBasicProfile())
    },
    onFailure(err) {
      console.log(err)
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
  height: 72%;
}
</style>
