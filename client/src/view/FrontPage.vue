<template>
    <div>
        <Login v-if="!showRegister"></Login>
        <Register v-else></Register>
    </div>
</template>

<script>
import Login from '../component/Login'
import Register from '../component/register'

export default {
    data(){
        return{
            showRegister: false
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