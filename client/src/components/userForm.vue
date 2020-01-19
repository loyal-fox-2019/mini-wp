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
                        <div class="g-signin2" data-onsuccess="onSignIn"></div>
                    </div>
                </form>

            <div class="dropdown-divider"></div>
            <h6 class="card-title text-center" >New User?  <a id="showRegistrationForm" href="" @click.prevent="changeForm('registrationForm')">register</a>  now with us</h6>

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

            showForm: 'loginForm'
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
                console.log(`error @register - userForm.vue \n=========================================\n`, response)
                let errorMessage = ''
                response.data.message.forEach(element => {
                    errorMessage += `${element}; `
                });

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
        }
    




    }
}
</script>



<style>



</style>