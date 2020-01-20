<template>
  <div id="user-login">
        <div class="row h-100">
            <div class="col-12 d-flex justify-content-center align-items-center">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-3 col-md-2"></div>
                        <div class="col-lg-6 col-md-8 login-box">
                            <div class="col-lg-12 login-key">
                                <i class="p-3 fa fa-key" aria-hidden="true"></i>
                            </div>

                            <div class="col-lg-12 login-form">
                                <div class="col-lg-12 login-form">
                                    <form>
                                        <div class="form-group">
                                            <label class="form-control-label">EMAIL</label>
                                            <input v-model="email" type="text" class="form-control login-input">
                                        </div>
                                        <div class="form-group">
                                            <label class="form-control-label">PASSWORD</label>
                                            <input v-model="password" type="password" class="form-control login-input" i>
                                        </div>

                                        <div class="col-lg-12 loginbttm">
                                            <div class="col-lg-6 login-btm login-text">
                                                <!-- Error Message -->
                                            </div>
                                            <div class="col-lg-12 d-flex justify-content-center login-btm login-button">
                                                <h1 @click="login" type="submit" class="btn m-1 btn-outline-secondary">LOGIN</h1>
                                                <h1 @click="register" type="submit" class="btn m-1 btn-outline-secondary">REGISTER</h1>
                                                <!-- <h1 @click="google" type="submit" class="btn m-1 btn-outline-secondary"> <i class="fab fa-google"></i> GOOGLE</h1> -->
                                                <GoogleLogin 
                                                    :renderParams="renderParams" 
                                                    :params="params" 
                                                    :onSuccess="onSuccess" 
                                                    :onFailure="onFailure">
                                                    Login
                                                </GoogleLogin>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        <div class="col-lg-3 col-md-2"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import GoogleLogin from "vue-google-login";

export default {
    data(){
        return{
            email : '',
            password : '',
            renderParams: {
                width: 250,
                height: 40,
                longtitle: true
            },
            params: {
                client_id:"92257054271-6h8tb6po12s2300rj531qup6kgp7dc67.apps.googleusercontent.com"
            }
        }
    },
    components : {
        GoogleLogin
    },
    methods : {
        onSuccess(googleUser) {
            let id_token = googleUser.getAuthResponse().id_token
            axios.post('http://localhost:3000/user/google/', {token : id_token})
            .then(({data})=>{
                console.log("berhasil login")
                console.log(data)
                localStorage.setItem('token', data.token)
                localStorage.setItem('author', data.author)
                this.$emit('loginSuccessful')
            })
            .catch(({response})=>{
                console.log(response)
            })
        },
        login(){
            console.log('masuk login')
            axios({
                url : 'http://localhost:3000/user/login/',
                method : 'post',
                data : {
                    email : this.email,
                    password : this.password
                }
            })
            .then(({data})=>{
                console.log("berhasil login")
                console.log(data)
                localStorage.setItem('token', data)
                localStorage.setItem('author', this.email)
                this.$emit('loginSuccessful')
            })
            .catch(({response})=>{
                console.log(response.data)
            })
        },
        register(){
            console.log('masuk register')
            axios({
                url : 'http://localhost:3000/user/register/',
                method : 'post',
                data : {
                    email : this.email,
                    password : this.password
                }
            })
            .then(({data})=>{
                console.log("berhasil register")
                console.log(data)
                localStorage.setItem('token', data)
                localStorage.setItem('email', this.email)
                this.$emit('loginSuccessful')
            })
            .catch(({response})=>{
                console.log(response.data)
            })
        },
    }
}
</script>

<style>

#user-login{
    height: 93%;
}

.login-box {
    margin-top: 75px;
    height: auto;
    background: rgb(49, 50, 51);
    text-align: center;
    border-radius: .5rem;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.login-key {
    height: 80px;
    font-size: 60px;
    line-height: 100px;
    background: -webkit-linear-gradient(#27EF9F, #0DB8DE);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.login-title {
    margin-top: 15px;
    text-align: center;
    font-size: 30px;
    letter-spacing: 2px;
    margin-top: 15px;
    font-weight: bold;
}

.login-form {
    margin-top: 25px;
    text-align: left;
}

.login-input[type=text] {
    background-color: rgb(49, 50, 51);
    border: none;
    border-bottom: 2px solid rgb(124, 124, 124);
    border-top: 0px;
    border-radius: 0px;
    font-weight: bold;
    outline: 0;
    margin-bottom: 20px;
    padding-left: 0px;
    color: #ECF0F5;
}

input[type=password] {
    background-color: rgb(49, 50, 51);
    border: none;
    border-bottom: 2px solid rgb(124, 124, 124);
    border-top: 0px;
    border-radius: 0px;
    font-weight: bold;
    outline: 0;
    padding-left: 0px;
    margin-bottom: 20px;
    color: #ECF0F5;
}

.form-group {
    margin-bottom: 40px;
    outline: 0px;
}

.form-control:focus {
    border-color: inherit;
    -webkit-box-shadow: none;
    box-shadow: none;
    border-bottom: 2px solid #0DB8DE;
    outline: 0;
    background-color: #1A2226;
    color: #ECF0F5;
}

input:focus {
    outline: none;
    box-shadow: 0 0 0;
}

label {
    margin-bottom: 0px;
}

.form-control-label {
    font-size: 10px;
    color: #6C6C6C;
    font-weight: bold;
    letter-spacing: 1px;
}

.btn-outline-primary {
    border-color: #0DB8DE;
    color: #0DB8DE;
    border-radius: 0px;
    font-weight: bold;
    letter-spacing: 1px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.btn-outline-primary:hover {
    background-color: #0DB8DE;
    right: 0px;
}

.login-btm {
    float: left;
}

.login-button {
    padding-right: 0px;
    text-align: right;
    margin-bottom: 25px;
}

.login-text {
    text-align: left;
    padding-left: 0px;
    color: #A2A4A4;
}

.loginbttm {
    padding: 0px;
}

</style>