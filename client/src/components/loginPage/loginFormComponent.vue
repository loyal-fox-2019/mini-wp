<template>
    <form class="ui form login" @submit.prevent="login">
        <h1>Sign In</h1>
        <p></p>
        <div class="field">
            <label>Email</label>
            <div class="ui left icon input">
                <input type="email" placeholder="Email" v-model="email" required>
                <i class="mail icon"></i>
            </div>
        </div>
        <div class="field">
            <label>Password</label>
            <div class="ui left icon input">
                <input type="password" placeholder="Password" v-model="password" required>
                <i class="lock icon"></i>
            </div>
        </div>
        <div>
            <button type="submit" class="ui blue labeled icon button">
                Sign In
                <i class="lock icon"></i>
            </button>
            <!-- Google signin -->
            <g-signin-button class="ui red labeled icon button"
                             :params="googleSignInParams"
                             @success="onSignInSuccess"
                             @error="onSignInError">
                Sign In
                <i class="google icon"></i>
            </g-signin-button>
            <p></p>
            <!-- end google signin -->
        </div>

    </form>

</template>

<script>
    import {instance} from "../../config/axiosConfig";

    export default {
        name: "loginFormComponent",
        data() {
            return {
                email: null,
                password: null,
                googleSignInParams: {
                    client_id: this.$googleId
                },
                header: null,
                content: null,
            }
        },
        methods: {
            login: function () {
                instance({
                    method: 'post',
                    url: '/authors/login',
                    data: {
                        email: this.email,
                        password: this.password
                    }
                }).then(({data}) => {
                    localStorage.token = data.token;
                    location.reload();
                }).catch(err => {
                    this.$toast.error({
                        title:'Error Sign In',
                        message:err.response.data.message
                    });
                });
            },
            onSignInSuccess: function (googleUser) {
                let googleToken = googleUser.getAuthResponse().id_token;

                instance({
                    method: 'post',
                    url: `authors/login/oauth/${googleToken}`
                }).then(({data}) => {
                    if (data) {
                        this.header = "Sign In Success";
                        this.content = data.message;
                        localStorage.token = data.token;
                        location.reload();
                    }
                }).catch(err => {
                    this.$toast.error({
                        title:'Error Sign In',
                        message:err.response.data.message
                    });
                });
            },
            onSignInError(error) {
                // `error` contains any error occurred.
                this.$toast.error({
                    title:'Error Sign In',
                    message:err.response.data.message
                });
            }
        }
    }
</script>

<style scoped>
    .button {
        display: inline-block;
    }
</style>