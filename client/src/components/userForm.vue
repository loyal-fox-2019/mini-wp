<template>
    <div class="divIdentifier" >
        <!-- <h5 class="elementIdentifier">user form components</h5> -->
        <!-- start of Login Form -->
        <div id="loginFormDiv" class="card userForm" v-if="showForm === 'loginForm'">
            <h5 class="card-header text-center">Login</h5>
            <div class="card-body">

                <form id="loginForm" @submit.prevent="login">
                    <div class="form-group">
                    <label for="email">Email address</label>
                    <input type="email" class="form-control" id="emailLogin" v-model="loginEmail" aria-describedby="emailHelp" required>
                    </div>
                    <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="passwordLogin" v-model="loginPassword" required>
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary">Login</button>
                        <!-- <button type="submit" class="btn btn-primary">gSignIn</button> -->
                        <!-- <div class="g-signin2" data-onsuccess="onSignIn"></div> -->
                    </div>
                </form>

            <div class="dropdown-divider"></div>
            <h6 class="card-title text-center" >New User?  <a id="showRegistrationForm" href="" @click.prevent="changeForm('registrationForm')">register</a>  now with us</h6>
            <div style="text-align:center">
                <g-signin-button
                :params="googleSignInParams"
                @success="onSignInSuccess"
                @error="onSignInError"
                >
                Sign in with Google
            </g-signin-button>
            </div>
            </div>
        </div>
        <!-- end of Login Form -->


        <!-- start of Registration Form -->
        <div id="registrationFormDiv" class="card userForm" v-if="showForm === 'registrationForm'">
            <h5 class="card-header text-center">Registration</h5>
            <div class="card-body">

                <form id="registrationForm" @submit.prevent="register">
                    <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" class="form-control" id="usernameRegistration" aria-describedby="" v-model="registrationUsername" placeholder="Username is permanent" required>
                    </div>
                    <div class="form-group">
                    <label for="firstName">First Name</label>
                    <input type="text" class="form-control" id="firstNameRegistration" aria-describedby="" v-model="registrationFirstName" required>
                    </div>
                    <div class="form-group">
                    <label for="lastName">Last Name</label>
                    <input type="text" class="form-control" id="lastNameRegistration" aria-describedby="" v-model="registrationLastName" required>
                    </div>
                    <div class="form-group">
                    <label for="email">Email address</label>
                    <input type="email" class="form-control" id="emailRegistration" aria-describedby="emailHelp" v-model="registrationEmail" required>
                    </div>
                    <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="passwordRegistration" v-model="registrationPassword" required>
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary">register</button>
                    </div>
                </form>


            <div class="dropdown-divider"></div>
            <h6 class="card-title text-center" >Already registered? click <a id="showLoginForm" href="" @click.prevent="changeForm('loginForm')">here</a> to login</h6>

            </div>
        </div>
        <!-- end of Registration Form -->


    </div>
</template>


<script>
import Swal from 'sweetalert2'
import axios from '../../config/axios'

export default {
    name:'userForm',
    data: function(){
        return{
            loginEmail:'',
            loginPassword:'',

            registrationUsername:'',
            registrationFirstName:'',
            registrationLastName:'',
            registrationEmail:'',
            registrationPassword:'',

            showForm: 'loginForm',
            googleSignInParams: {
                client_id: '681306908139-ujg2f44e6n0bf252bd2qsskl7o86cn10.apps.googleusercontent.com'
            }
        }
    },
    methods:{
        // setters
        setAllInputToDefault(){
            this.loginEmail = ''
            this.loginPassword = ''

            this.registrationUsername = ''
            this.registrationFirstName = ''
            this.registrationLastName = ''
            this.registrationEmail = ''
            this.registrationPassword = ''
        },
        changeForm(form){
            this.setAllInputToDefault()
            this.showForm = form
        },
        register(){
            axios({
                method: 'post',
                url: '/users/registration',
                data:{
                    username : this.registrationUsername,
                    firstName : this.registrationFirstName,
                    lastName : this.registrationLastName,
                    email : this.registrationEmail,
                    password : this.registrationPassword
                }
            })
            .then( ({ data })=>{
                Swal.fire(
                    'Registration Succesfull',
                    `Thankyou for registering with us ${data.username}`
                )
                localStorage.setItem('token', data.token)
                this.setAllInputToDefault()
                this.$emit('login', true)
            })
            .catch( ({ response })=>{
                console.log(`error @register - userForm.vue \n=========================================\n`, response.data.message)
                let errorMessage = ''
                if(typeof(response.data.message === 'string'))
                    errorMessage = response.data.message
                else
                  {
                    response.data.message.forEach(element => {
                        errorMessage += `${element}; `
                    });
                  }
                

                Swal.fire(
                    'Error',
                    errorMessage,
                    'error'
                )
            })
        },
        login(){
            axios({
                method: 'post',
                url: '/users/login',
                data:{
                    email: this.loginEmail,
                    password: this.loginPassword
                }
            })
            .then( ({ data })=>{
                Swal.fire(
                    'Login Successful',
                    `Welcome back ${data.username}`
                )
                localStorage.setItem('token', data.token)
                this.setAllInputToDefault()
                this.$emit('login', true)
            })
            .catch( ({ response })=>{
                console.log(`error @login - userForm.vue \n=========================================\n`, response.data.message)
                Swal.fire(
                    "Error",
                    response.data.message,
                    'error'
                )
            })
        },
        onSignInSuccess (googleUser) {
            const id_token = googleUser.getAuthResponse().id_token;
            // console.log("TCL: onSignIn -> id_token", id_token)
            
            var profile = googleUser.getBasicProfile();
            // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
            // console.log('Name: ' + profile.getName());
            // console.log('Image URL: ' + profile.getImageUrl());
            // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

            axios({
                method: 'post',
                url: 'http://localhost:3000/users/gsignin',
                data:{
                    id_token
                }
            })
            .then( ({data})=>{
                console.log(' \n======================\n', data)
                Swal.fire(
                    'Login Successful',
                    `Welcome back ${data.username}`
                )
                localStorage.setItem('token', data.token)
                this.setAllInputToDefault()
                this.$emit('login', true)
            })
            .catch( ({response})=>{   
                console.log(`error @onSignInSuccess - userForm.vue \n=========================================\n`, response.data.message)
                Swal.fire(
                    "Error",
                    response.data.message,
                    'error'
                )
            })
            
        },
        onSignInError (error) {
            console.log('onSignInError', error)
            Swal.fire(
                'error',
                error,
                'error'
            )
        }
  
        
    




    }
}
</script>



<style scoped>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}


</style>