<template>
    <div>
        
    <b-container id="login">
        <h2 id="cen">Sign In</h2>
        <hr>
        <b-form>
             <b-alert show variant="danger" v-if="data">Wrong Email/Password</b-alert>
            <b-form-group label='Email'>
                <b-input-group class="mb-2">
                    <b-input-group-prepend is-text>
                    <b-icon-person font-scale="1"></b-icon-person>
                    </b-input-group-prepend>
                    <b-form-input placeholder="Your Email" v-model="email"></b-form-input>
                </b-input-group>
            </b-form-group>
            <b-form-group label='Password'>
                <b-input-group class="mb-2">
                    <b-input-group-prepend is-text>
                    <b-icon-lock font-scale="1"></b-icon-lock>
                    </b-input-group-prepend>
                    <b-form-input type="password" placeholder="Your Password" v-model="password"></b-form-input>
                </b-input-group>
            </b-form-group>
            <b-button variant="outline-info" @click="signin">Login</b-button>
            <p>Or Signin With:</p>
            <span @click="sccss">
                <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
            </span>
            <br>
            <a @click.prevent="regis" href="">Create Account</a>
        </b-form>
    </b-container>
    </div>
</template>

<script>
import axios from 'axios'
import GoogleLogin from 'vue-google-login';
 
export default {
    data(){
        return{
            email: '',
            password: '',
            first_name:'',
            last_name: '',
            params: {
                    client_id: "743446764204-2unp8cup503visgto4helr8u9f1lj9e3.apps.googleusercontent.com"
                },
             renderParams: {
                    width: 250,
                    height: 50,
                    longtitle: true
                }
        }
    },
    props: ['data'],
    methods:{
        signin: function(){
            let data = {
                password: this.password,
                email: this.email
            }
            this.$emit('signin', data)
        },
        regis: function(){
            this.$emit('regis')
        },
        onSuccess:(googleUser)=>{
            localStorage.setItem('email', googleUser.getBasicProfile().getEmail())
            localStorage.setItem('firstName', googleUser.getBasicProfile().getGivenName())
            localStorage.setItem('lastName', googleUser.getBasicProfile().getFamilyName())
        },
        sccss:function(){
            let data = {
                email: localStorage.getItem('email'),
                first_name: localStorage.getItem('firstName'),
                last_name: localStorage.getItem('lastName')
            }
            if(data.email !== null){
                this.$emit('gg', data)
            }
            
        }
    },
    components: {
            GoogleLogin
        }
}
</script>

<style>
#login{
    width: 30%;
    margin-top: 10%;
    border: solid rgb(165, 161, 161) 1px;
    padding: 2%;
    border-radius: 5%;
}

#cen{
    text-align: center;
}
</style>