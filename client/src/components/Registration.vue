<template>

    <div>
            <div class="container" style="border: solid 1px black; width: 30vw; height: 80vh;border-radius: 10px;">
                <form method="post" enctype="multipart/form-data">
                    <div class="row justify-content-center" id="username">
                        <div class="col-md-3" style="text-align: left;" >Username</div>
                        <div class="col-md-6">
                            <input type="text" v-model="username">
                        </div>
                    </div>
                    <div class="row justify-content-center" id="nemail">
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
                    <div class="row justify-content-center" id="upload">
                        <div class="col-md-4">
                            <input type="file" v-on:change="uploadPicture">
                        </div>
                    </div>
                </form>
                <div class="row justify-content-center" id="register">
                    <div class="col-md-4">
                        <button type="submit" v-on:click.prevent="registerUser">Register</button>
                    </div>
                </div>
                <div class="row justify-content-center" id="google">
                    <div class="col-md-7">
                        <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" ></GoogleLogin>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <a href="#" v-on:click="switchToLogin">already have an account?</a>
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
            username:'',
            email: '',
            password: '',
            picture: '',
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
        switchToLogin(){
            this.$emit('switchto-login', true)
        },
        uploadPicture(){
            this.picture = event.target.files[0]
        },
        registerUser(){
            const formData = new FormData()
            formData.append('username', this.username)
            formData.append('email', this.email)
            formData.append('password', this.password)
            formData.append('picture', this.picture)
            axios({
                method: 'post',
                url: 'http://34.87.21.93:3000/users/register',
                data: formData
            })
            .then(({data})=>{
                // console.log(data,'register user')
                localStorage.setItem('token', data.token)
                this.userData = {
                username: data.username,
                email: data.email,
                picture: data.picture
                }
                this.$emit('regist-success', true)
            })
            .catch(err=>{
                console.log(err)
            })
        },
        onSuccess(googleUser){
            const profile = googleUser.getBasicProfile();
            const id_token = googleUser.getAuthResponse().id_token;
            axios.post('http://34.87.21.93:3000/gsignin',{
                data: {
                    id_token
                }
                })
                .then(({data})=>{
                    // console.log(data)
                    localStorage.setItem('token', data.token)
                    this.$emit('regist-success', true)
                })
                .catch(err=>{
                    console.log(err)
            })
        }
    }
}
</script>

<style>

#username{
    margin-top: 20%;
}

</style>