<template>
  <div id="signInPage">
    <b-row class="justify-content-md-center">
      <h1>Welcome to Blog-Center!</h1>
    </b-row>
    <b-row id="logForm" class="justify-content-md-center mt-5">
      <b-col cols="4" class="border-test" id="signForm" align-self="center">
        <h2>Sign In</h2>
        <br />
        <label for="email">Email:</label>
        <b-form-input id="email" type="email"></b-form-input>
        <label for="password">Password:</label>
        <b-form-input id="password" type="password"></b-form-input>
        <br />
        <p>
          Don't have an account yet?
          <a href="#" @click="$bvModal.show('bv-modal-example')">register here</a>
        </p>
        <b-button variant="info">Sign In</b-button>

        <!-- Register Form -->
        <b-modal id="bv-modal-example" hide-footer>
          <template v-slot:modal-title>
            Register Form
          </template>
          <label for="emailRegist">Email:</label>
        <b-form-input id="emailRegist" type="email"></b-form-input>
        <label for="passwordRegist">Password:</label>
        <b-form-input id="passwordRegist" type="password"></b-form-input>
        <br />
          <b-button class="mt-3" block variant="info">Register</b-button>
          <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Close Me</b-button>
        </b-modal>
        <!-- Register Form -->

      </b-col>

      <b-col cols="4" class="border-test" id="otherSign" align-self="center">
        <h2>Or Sign in using:</h2>
        <center>
        <div id="google-signin-button"></div>
        </center>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "logForm",
  data() {
    return {
      loginButton: true,
      registerButton: false
    };
  },
  methods:{
      onSignIn(googleUser) {
            axios({
              method: 'post',
              url: 'http://localhost:3000/googleSign',
              data:{
                googleToken : googleUser.getAuthResponse().id_token
              }
            })
            .then(token=>{
              // console.log('test')
            })
            .catch(err=>{
              console.log(err)
            })
            }
  },
  mounted() {
    gapi.signin2.render('google-signin-button', { // this is the button "id"
      onsuccess: this.onSignIn // note, no "()" here
    })
  }
};
</script>

<style scoped>
#signForm {
  height: 100%;
  text-align: center;
  padding-top: 2%;
}
#otherSign {
  height: 100%;
  text-align: center;
  padding-top: 7%;
  border-left: black solid 2px;
}
#signInPage {
  margin-left: 2%;
}
#logForm {
  height: 50vh;
}
</style>