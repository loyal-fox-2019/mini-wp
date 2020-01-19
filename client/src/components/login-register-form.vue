<template>
    <div id="login-register-form" class="container-fluid">
        <div class="row h-100 justify-content-center align-items-center"> 
            <div class="col-lg-5">
                <div class="card-form">
                    <h2>{{ formTitle }}</h2>
                    <form class="user-form" v-on:submit.prevent="actionButton()">
                        <div class="form-group">
                            <input type="email" v-model="email" class="form-control" v-bind:placeholder="inputPlaceholder[0]">
                        </div>
                        <div class="form-group mt-4" v-if="page === 'register'">
                            <input type="text" v-model="name" class="form-control" v-bind:placeholder="inputPlaceholder[1]">
                        </div>
                        <div class="form-group mt-4">
                            <input type="password" v-model="password" class="form-control" v-bind:placeholder="inputPlaceholder[inputPlaceholder.length - 1]">
                        </div>
                        <div class="button-container-login mt-5" v-if="page === 'login'">
                            <button type="submit" class="btn btn-warning btn-lg">Login</button>
                            <button type="submit" v-on:click.prevent="movePage()" class="btn btn-dark btn-lg mt-3">Register</button>
                        </div>
                        <div class="button-container-register mt-5" v-else-if="page === 'register'">
                            <button type="submit" class="btn btn-dark btn-lg mb-3">Sign Up</button>
                            <a class="mt-5" href="#" v-on:click.prevent="movePage()">Already have an Account? Click here!</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoginRegisterForm',
    props: ['page'],
    data: function() {
        return {
            title: '',
            placeholder: [],
            email: '',
            name: '',
            password: ''
        }
    },
    computed: {
        formTitle: function() {
            if(this.page === 'login') {
                return this.title = 'Sign In';
            } else {
                return this.title = 'Register'
            }
        },
        inputPlaceholder: function() {
            if(this.page === 'login') {
                return this.placeholder = ['Enter Email', 'Enter Password']
            } else {
                return this.placeholder = ['Input Your Email Here', 'Input Your Name Here', 'Input Your Password Here']
            }
        }
    },
    methods: {
        movePage: function() {
            if(this.page === 'login') {
                this.$emit('changePage', 'register');
            } else {
                this.$emit('changePage', 'login');
            }
        },
        actionButton: function() {
            if(this.page === 'login') {
                this.$emit('login', {email: this.email, password: this.password})
            } else {
                this.$emit('register', {email: this.email, name: this.name, password: this.password})
            }
        }
    }
}
</script>

<style scoped>
#login-register-form {
    height: 100vh;
    background: linear-gradient(rgba(0, 0, 0, 0.4), 
    rgba(0, 0, 0, 0.4)), url('../assets/img/login-background.jpg') no-repeat center;
    background-size: cover;
}

.card-form {
    box-shadow: 0 0 3px grey;
    padding: 80px 0;
    background-color: black;
    border-radius: 4px;
}

.card-form h2 {
    text-align: center;
    letter-spacing: 3px;
    color: white;
    padding-bottom: 30px;
}

.user-form {
    padding: 0 65px;
}

.form-group input {
    border-top: none;
    border-left: none;
    border-right: none;
    padding-left: 4px;
    background-color: black;
    font-size: 18px;
    color: white;
}

::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  color: black;
  font-size: 18px;
}
::-moz-placeholder { /* Firefox 19+ */
  color: pink;
  font-size: 18px;
}
:-ms-input-placeholder { /* IE 10+ */
  color: pink;
  font-size: 18px;
}
:-moz-placeholder { /* Firefox 18- */
  color: pink;
  font-size: 18px;
}

.button-container-login {
    text-align: center
}

.button-container-login button {
    width: 100%;
    font-size: 23px;
    color: white;
    font-weight: bold;
}

.button-container-register {
    text-align: center
}

.button-container-register button {
    width: 100%;
    font-size: 23px;
    color: white;
    font-weight: bold;
}

.button-container-register a {
    width: 25%;
    font-size: 23px;
    color: white;
    font-weight: bold;
    text-align: center;
    padding-top: 20px;
}
</style>