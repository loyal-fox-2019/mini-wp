<template>

    <div class="gradient">
            <div class="container" style="border: solid 1px #C98BB9; width: 30vw; height: 80vh;border-radius: 10px;">
                    <div class="row justify-content-center" style="margin-top: 20%;">
                         <div class="col-md-4">
                             <h3>Log In</h3>
                         </div>
                    </div>
                    <div class="row justify-content-center" id="email">
                        <div class="col-md-3" style="text-align: left;">Email</div>
                        <div class="col-md-6">
                            <input type="email" v-model="email">
                        </div>
                    </div>
                    <div class="row justify-content-center" id="password">
                        <div class="col-md-3" style="text-align: left;">Password</div>
                        <div class="col-md-6">
                            <input type="password" v-model="password">
                        </div>
                    </div>
                <div class="row justify-content-center" id="login">
                    <div class="col-md-3">
                        <button type="submit" v-on:click.prevent="loginUser">Log In</button>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-md-8 justify-content-center">
                        <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess"></GoogleLogin>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-md-3 justify-content-center">
                        <a href="#" v-on:click="showRegister" style="text-align:center;">sign up</a>
                    </div>
                </div>
            </div>
    </div> 

</template>

<script src="https://apis.google.com/js/platform.js" async defer></script>
<script>
import boostrap from 'bootstrap'
import axios from 'axios'
import GoogleLogin from 'vue-google-login'
export default {
    name: 'registration',
    components: {
        GoogleLogin
    },
    data(){
        return{
            email: '',
            password: '',
            params: {
                    client_id: "1014814489310-p0qgrk4k8m0skfllva0q2nubat1aqgth.apps.googleusercontent.com"
                },
            renderParams: {
                width: 250,
                height: 50,
                longtitle: true
            }
        }
    },
    methods:{
        showRegister(){
            this.$emit('show-register', true)
        },
        loginUser(){
            // console.log('masuk login')
            axios({
                method: 'post',
                url: 'http://35.240.241.144:3000/users/login',
                data:{
                email: this.email,
                password: this.password
                }
            })
            .then(({data})=>{
                // console.log(data)
                localStorage.setItem('token', data.token)
                this.userData = {
                username: data.username,
                email: data.email,
                picture: data.picture
                }
                this.$emit('login-success', true)
            })
            .catch(err=>{
                console.log(err)
            })
        },
        onSuccess(googleUser){
            const profile = googleUser.getBasicProfile();
            const id_token = googleUser.getAuthResponse().id_token;
            // console.log(id_token)
            axios.post('http://35.240.241.144:3000/gsignin',{
                data: {
                    id_token
                }
                })
                .then(({data})=>{
                    localStorage.setItem('token', data.token)
                    this.$emit('login-success', true)
                })
                .catch(err=>{
                    console.log(err)
            })
        }
    }
}
</script>

<style>
.gradient {
  height: 100vh;
  padding-top: 10vh;
}
#email{
    margin-top: 15%;
}
.row{
    margin-bottom: 15px;
}

</style>