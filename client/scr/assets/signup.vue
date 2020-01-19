<template>
    <div>
        
    <b-container id="login">
        <h2 id="cen">Sign Up</h2>
        <hr>
        <b-form @submit.prevent="signin">
            <b-alert show variant="danger" v-if="data">Email already use!</b-alert>
            <b-form-group label='Email'>
                <b-input-group class="mb-2">
                    <b-input-group-prepend is-text>
                    <b-icon-person font-scale="1"></b-icon-person>
                    </b-input-group-prepend>
                    <b-form-input placeholder="Your Email" v-model="email" required type="email"></b-form-input>
                </b-input-group>
            </b-form-group>
            
            <b-form-group label='First Name'>
                <b-input-group class="mb-2">
                    <b-input-group-prepend is-text>
                    <b-icon-pen font-scale="1"></b-icon-pen>
                    </b-input-group-prepend>
                    <b-form-input placeholder="Your First Name" v-model="first_name" required></b-form-input>
                </b-input-group>
            </b-form-group>

            <b-form-group label='Last Name'>
                <b-input-group class="mb-2">
                    <b-input-group-prepend is-text>
                    <b-icon-pencil font-scale="1"></b-icon-pencil>
                    </b-input-group-prepend>
                    <b-form-input placeholder="Your Last Name" v-model="last_name" required></b-form-input>
                </b-input-group>
            </b-form-group>

            <b-form-group label='Password'>
                <b-input-group class="mb-2">
                    <b-input-group-prepend is-text>
                    <b-icon-lock font-scale="1"></b-icon-lock>
                    </b-input-group-prepend>
                    <b-form-input type="password" placeholder="Your Password" v-model="password" required></b-form-input>
                </b-input-group>
            </b-form-group>
            <b-button type="submit" variant="outline-info">Create Account</b-button>
        </b-form>
    </b-container>
    </div>
</template>

<script>
export default {
    props:['data'],
    data(){
        return{
            email: '',
            password: '',
            first_name: '',
            last_name:''
        }
    },
    methods:{
        signin: function(){
            let data = {
                password: this.password,
                email: this.email,
                first_name: this.first_name,
                last_name: this.last_name
            }
            this.$emit('signup', data)
        }
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