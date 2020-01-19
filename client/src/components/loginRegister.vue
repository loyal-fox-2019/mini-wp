<template>
  <div class="w-full max-w-xs">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <!-- Login -->
    <div v-if="form==='login'">
        <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Username
        </label>
        <input v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="email">
        </div>
        <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
        </label>
        <input v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password">
        </div>
        <div class="flex items-center justify-between">
        <button class="bg-gray-900 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" @click.prevent="login">
            Sign In
        </button>
        </div>
        <hr class="mt-5">
        <p class="text-center mt-1 text-gray-600 text-sm">Doesn't have an account yet?</p>
        <p class="text-center text-blue-400 text-sm hover:text-blue-700 cursor-pointer" @click="changeForm(register)">Register</p>
        <p class="text-center text-gray-600 text-sm">or</p>
        <g-signin-button :params="googleSignInParams" @success="onSignInSuccess" @error="onSignInError">Sign in with Google         </g-signin-button>
    </div>

    <!-- Register -->
    <div v-else>
        <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Username
        </label>
        <input v-model="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username">
        </div>
        <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Email
        </label>
        <input v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email">
        </div>
        <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
        </label>
        <input v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password">
        </div>
        <div class="flex justify-center">
        <button @click.prevent="register()" class="bg-gray-900 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Register
        </button>
        </div>
    </div>
  </form>
    <p class="text-center text-gray-500 text-xs">
        &copy;2020 Mini Wordpress. All rights reserved.
    </p>
    </div>
</template>

<script>
let baseUrl = 'http://localhost:3000'

export default {
    data() {
        return {
            form: 'login',
            name: '',
            email: '',
            password: '',
            googleSignInParams: {
                client_id: '766396306385-t7lci7ah0ejn599mns2avhvqhtpovva6.apps.googleusercontent.com'
            }
        }
    },
    methods: {
        changeForm(form) {
            this.form = form
        },
        register() {
            axios({
                method: 'post',
                url: `${baseUrl}/user/register`,
                data: {
                    name:this.name,
                    email:this.email,
                    password:this.password
                }
            })
                .then( ({data}) => {
                    localStorage.setItem('access_token',data.token)
                    this.name = '',
                    this.email = '',
                    this.password = ''
                    Swal.fire({
                        icon: 'success',
                        title: 'Register success.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.$emit('register')
                })
                .catch( err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Register failed.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
        },
        login(){
            axios({
                method:'post',
                url: `${baseUrl}/user/login`,
                data: {
                    email: this.email,
                    password: this.password
                }
            })
                .then( ({data}) => {
                    localStorage.setItem('access_token',data.token)
                    this.name = '',
                    this.email = '',
                    this.password = ''
                    Swal.fire({
                        icon: 'success',
                        title: 'Login success.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.$emit('register')
                })
                .catch( err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Register failed.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }) 
        },
        onSignInSuccess(googleUser) {
            var id_token = googleUser.getAuthResponse().id_token;
            axios({
                method: "post",
                url: "http://localhost:3000/user/googleSignIn",
                data: { token: id_token }
            })
                .then(({data}) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Login success.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    localStorage.setItem("access_token", data.token);
                    this.$emit('register')
                })
                .catch(err => console.log(err.message));
        },
        onSignInError (error) {
            // `error` contains any error occurred.
            console.log('OH NOES', error)
        }

    }
}
</script>

<style>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
  cursor: pointer;
}
</style>