<template>
    <div>
        <form class="form-signin" @submit.prevent="registerUser">
        <h1 class="h3 mb-3 font-weight-normal">Sign up</h1>

        <input type="text" class="form-control" placeholder="Username" pattern="^[a-zA-Z0-9_]*$" v-model="username" required autofocus>       
        <input type="password" v-model="password" class="form-control" placeholder="Password (at least 6 characters)" minlength="6" required>
        
        <button class="btn btn-lg btn-primary btn-block" type="submit" id="std-signup">Sign up</button><br>
        *Only alphanumeric and underscores allowed for username.
        <div id="error-msg">{{error}}</div>
        <a class="btn btn-block switch-signinup" @click="switchLogin">
            Sign in 
        </a>
    </form>
    </div>
</template>

<script>
    import axiosReq from "../../config/axiosReq";
    export default {
        name: "Register",
        data() {
            return {
                username: "",
                password: "",
                error: ""
            }
        },
        methods: {
            switchLogin() {
                this.$emit("switchLogin");
            },
            registerUser() {
                axiosReq({
                    method: "POST",
                    url: "/api/users/register",
                    data: {
                        username: this.username,
                        password: this.password
                    }
                })
                .then(() => {
                    return axiosReq({
                        method: "POST",
                        url: "/api/users/login",
                        data: {
                            username: this.username,
                            password: this.password
                        }
                    })
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
                    this.error = "Sign up failed. Please try again.";
                })
            }
        }
    }
</script>

<style scoped>
    div {
        width: 20vw;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
    }

    .switch-signinup {
        border: 1px solid black;
    }

    #error-msg {
        color: red;
    }
</style>