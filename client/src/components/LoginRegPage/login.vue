<template>
    <div>
        <form class="form-signin" @submit.prevent="loginUser">
        <h1 class="h3 mb-3 font-weight-normal">Sign in</h1>

        <input type="text" v-model="username" class="form-control" placeholder="Username" required autofocus>       
        <input type="password" v-model="password" class="form-control" placeholder="Password" required>
        
        <button class="btn btn-lg btn-primary btn-block" type="submit" id="std-signin">Sign in</button>
        <div id="error-msg">{{error}}</div><br>

        <div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>

        <a class="btn btn-block switch-signinup" @click="switchRegister">
            Sign up 
        </a>
    </form>
    </div>
</template>

<script>
    import axiosReq from "../../config/axiosReq";
    export default {
        name: "Login",
        data() {
            return {
                username: "",
                password: ""
            }
        },
        methods: {
            switchRegister() {
                this.$emit("switchRegister");
            },
            loginUser() {
                axiosReq({
                    method: "POST",
                    url: "/api/users/login",
                    data: {
                        username: this.username,
                        password: this.password
                    }
                })
                .then(({data}) => {
                    this.$cookies.set('token',data.token);
                    this.$cookies.set('username',data.username);
                    this.username = "";
                    this.password = "";
                    this.error = "";
                    this.$emit("isLogin");
                })
                .catch((err) => {
                    console.log(err);                    
                    this.password = "";
                    this.error = "Wrong username/password";
                })
            }
        }
    }
</script>

<style scoped>
    div {
        width: 20%;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
    }

    .switch-signinup {
        border: 1px solid black;
    }
</style>