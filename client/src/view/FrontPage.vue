<template>
    <div>
        <Login v-if="!statusRegister" v-on:isLogin="isLogin" v-on:userData="userData" v-on:showRegister='showRegister'></Login>
        <Register v-else v-on:showLogin='showLogin'></Register>
    </div>
</template>

<script>
import Login from '../component/Login'
import Register from '../component/register'

export default {
    data(){
        return{
            statusRegister: false
        }
    },
    methods:{
        isLogin(payload){
            this.$emit('isLogin', payload)
        },
        showRegister(payload){
            this.statusRegister= payload
        },
        showLogin(payload){
            this.statusRegister= payload
        },
        userData(payload){
            this.$emit('userData', payload)
        }
    },
    components: {
        Login,
        Register
    }
}
</script>

<style>

</style>