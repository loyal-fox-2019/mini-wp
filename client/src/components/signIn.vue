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
        <b-form-input id="email" type="email" v-model="logEmail"></b-form-input>
        <label for="password">Password:</label>
        <b-form-input id="password" type="password" v-model="logPassword"></b-form-input>
        <br />
        <p>
          Don't have an account yet?
          <a href="#" @click="$bvModal.show('bv-modal-example')">register here</a>
        </p>
        <b-button variant="info" @click="webLogin">Sign In</b-button>

        <!-- Register Form -->
        <b-modal id="bv-modal-example" hide-footer>
          <template v-slot:modal-title>
            Register Form
          </template>
          <label for="nameRegist">name:</label>
        <b-form-input id="nameRegist" type="text" v-model="registName"></b-form-input>
          <label for="emailRegist">Email:</label>
        <b-form-input id="emailRegist" type="email" v-model="registEmail"></b-form-input>
        <label for="passwordRegist">Password:</label>
        <b-form-input id="passwordRegist" type="password" v-model="registPassword"></b-form-input>
        <br />
          <b-button class="mt-3" block variant="info" @click="userRegistration">Register</b-button>
          <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Close Me</b-button>
        </b-modal>
        <!-- Register Form -->

      </b-col>

      <b-col cols="4" class="border-test" id="otherSign" align-self="center">
        <h2>Or Sign in using:</h2>
        <center>
            <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
        </center>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import GoogleLogin from 'vue-google-login';

export default {
  name: "logForm",
  data() {
    return {
      loginButton: true,
      registerButton: false,
      registName: '',
      registEmail: '',
      registPassword: '',
      logEmail: '',
      logPassword: '',
      params: {
                    client_id: "774429400571-lkphm6n947cdn0tlbncaclpsn6guua7m.apps.googleusercontent.com"
                },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
          }
    };
  },
  components: {
        GoogleLogin
        },
  methods:{
      userRegistration(){
        axios({
          method: 'post',
          url: 'http://35.247.164.26:3000',
          data:{
            name: this.registName,
            email: this.registEmail,
            password: this.registPassword
          }
        })
        .then(({ data })=>{
          localStorage.setItem('token', data)
          this.registName= '',
          this.registEmail= '',
          this.registPassword= ''
          this.$emit('logged', true)
        })
        .catch(err=>{
          Swal.fire({
              icon: 'error',
              title: 'Registration Error',
              text: 'Please make sure your registration data is complete'
          })
        })
      },
      webLogin(){
        axios({
          method: 'post',
          url: 'http://35.247.164.26:3000/signIn',
          data:{
            email: this.logEmail,
            password: this.logPassword
          }
        })
        .then(({ data })=>{
          localStorage.setItem('token', data)
          this.logEmail= '',
          this.logPassword= ''
          this.$emit('logged', true)
        })
        .catch(err=>{
          Swal.fire({
              icon: 'error',
              title: 'Login Failed',
              text: 'Invalid Email / Password'
          })
        })
      },
      onSuccess(googleUser) {
            // console.log(googleUser);
 
            // This only gets the user information: id, name, imageUrl and email
            // console.log(googleUser.getBasicProfile());
            // console.log(googleUser.getAuthResponse().id_token);
            
            let token = googleUser.getAuthResponse().id_token
            axios({
              method: 'post',
              url: 'http://35.247.164.26:3000/googleSignIn',
              data:{
                googleToken : token
              }
            })
            .then(({ data })=>{
              localStorage.setItem('token', data)
              this.$emit('logged', true)
            })
            .catch(err=>{
              Swal.fire({
              icon: 'error',
              title: 'Login Failed',
              text: 'Login Failed'
          })
            })
        }
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