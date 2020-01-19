<template>
    <div>
        <div class="landing-page">
            <div class="page-content">
                <div id="information" v-show="!started">
                    <h1>Mini Personary</h1>
                    <p><i>Share your story with everyone or just keep it yourself.</i></p>
                    <a href="#" @click.prevent="getStarted">Get Started </a>
                </div>
                <!-- Register Form -->
                <div id="register-form" v-show="started && !loginPage">
                    <form>
                        <h1>Register</h1>
                        <div class="form-group">
                            <label for="register-name">Full Name or Initial Name</label>
                            <input type="text" class="form-control text-center" id="register-namel" v-model="registerData.name">
                        </div>
                        <div class="form-group">
                            <label for="register-email">Email address</label>
                            <input type="email" class="form-control text-center" id="register-email" aria-describedby="emailHelp" v-model="registerData.email">
                        </div>
                        <div class="form-group">
                            <label for="register-password">Password</label>
                            <input type="password" class="form-control text-center" id="register-password" v-model="registerData.password">
                        </div>
                        <button type="submit" class="btn btn-primary mb-3" @click.prevent="$emit('userRegister', registerData)">Register</button><br>
                        <h5>Already have an account? <span @click.prevent="changePage">Login Here</span></h5>
                        <g-signin-button
                            :params="googleSignInParams"
                            @success="onSignInSuccess"
                            @error="onSignInError">
                            Sign in with Google
                        </g-signin-button>
                    </form>
                </div>
                <!-- Login Form -->
                <div id="login-form" v-show="loginPage">
                    <form>
                        <h1>Login</h1>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control text-center" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="loginData.email">
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control text-center" id="exampleInputPassword1" v-model="loginData.password">
                        </div>
                        <button type="submit" class="btn btn-primary mb-3" @click.prevent="$emit('userLogin', loginData)">Login</button>
                        <h5>Dont have an account? <span @click.prevent="changePage">Register Here</span></h5>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import GSignInButton from 'vue-google-signin-button'

export default {
    data() {
        return {
            started: false,
            loginPage: false,
            loginData: {
                email: '',
                password: ''
            },
            registerData: {
                name: '',
                email: '',
                password: ''
            },
            googleSignInParams: {
                client_id: '724335900212-4180pkjn7o56k4jt4vr938asgrq9rf3b.apps.googleusercontent.com'
            }
        }
    },
    props: ["params"],
    methods: {
        getStarted: function(){
            this.started = !this.started
        },
        changePage: function(){
            this.loginPage = !this.loginPage
        },
        onSignInSuccess (googleUser) {
            // `googleUser` is the GoogleUser object that represents the just-signed-in user.
            // See https://developers.google.com/identity/sign-in/web/reference#users
            const profile = googleUser.getBasicProfile() // etc etc
            const id_token = googleUser.getAuthResponse().id_token;
            axios.post('http://localhost:3000/user/google', {id_token: id_token})
                .then(data => {
                    console.log('Login berhasil', data)
                    localStorage.setItem('token', data.data.token)
                    return this.$emit('hasLoggedIn', true)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        onSignInError (error) {
            // `error` contains any error occurred.
            console.log('OH NOES', error)
        }
    },
}
</script>

<style lang="css" scoped>
  *{
      margin: 0;
      padding: 0;
      font-family: "monteserrat", sans-serif;
  }
  .landing-page{
      width: 100%;
      height: 100vh;
      background: #000;
  }
  .landing-page::after{
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: url('../../assets/bg.jpg');
      background-size: cover;
      opacity: .4;
  }
  .page-content{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      z-index: 1;
      width: 100%;
      max-width: 800px;
      padding: 0 40px;
      text-align: center;
      box-sizing: border-box;
  }
  .page-content h1{
      color: #fdcb6e;
      text-transform: uppercase;
      font-size: 48px;
      font-weight: 700;
      margin-bottom: 20px;
      letter-spacing: 10px
  }
  .page-content p{
      color: #ffffff;
      margin-bottom: 20px;
      font-size: 20px;
  }
  .page-content a{
      display: inline-block;
      text-decoration: none;
      color: #fdcb6e;
      border: 2px solid #fdcb6e;
      text-transform: uppercase;
      padding: 10px 20px;
      transition: 0.4s linear;
      font-weight: 700;
  }
  .page-content a:hover{
      color: #000;
      background-color: #fdcb6e;
  }
  form label{
      color: #fdcb6e;
      margin-bottom: 8px;
      font-size: 20px;
  }
  form button{
      color: #fdcb6e !important;
      font-size: 20px;
      font-weight: 700;
      padding: 10px 50px;
      background-color: transparent !important;
      border: 2px solid #fdcb6e;
  }
  form button:hover{
      color: #000 !important;
      background-color: #fdcb6e !important;
      border: 2px solid #fdcb6e !important;
      transition: 0.4 linear;
  }
  #register-form, #login-form{
      padding: 20px 80px;
      border: 2px solid #fdcb6e;
  }
  form h5{
      color: #fdcb6e;
      font-weight: 500;
  }
  form h5 span{
      font-weight: 800;
      cursor: pointer;
      text-decoration: underline;
  }
  form h5 span:hover{
      color: black;
  }
  .form-control{
      font-size: 20px;
  }
</style>