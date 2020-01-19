<template>
    <div>
        <loginRegis v-if="!isLogin" @loggedIn="loginDone"></loginRegis>
        <homePage v-if="isLogin" @logout="signOut"></homePage>
    </div>
</template>

<script>
import homePage from './components/homePage/homePage'
import loginRegis from './components/loginRegis/loginRegis'
import Swal from 'sweetalert2'
export default {
    name: "app",
    data(){
        return {
            isLogin: false,
            token: null
        }
    },
    components: {
        homePage,
        loginRegis
    },
    methods: {
        signOut: function(){
            localStorage.clear()
            this.token = null
            this.isLogin = false
            Swal.fire(
                'You are logged out!',
                '',
                'success'
            )
        },
        loginDone: function(){
            this.token = localStorage.getItem('token')
            this.isLogin = true
        }
    },
    created(){
        if(localStorage.getItem('token')){
            this.isLogin = true
            this.token = localStorage.getItem('token')
        }
        else {
            this.isLogin = false
        }
    }
}
</script>

<style scoped>

</style>