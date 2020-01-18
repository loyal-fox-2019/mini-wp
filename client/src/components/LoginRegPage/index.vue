<template>
    <div>
        <Login @switchRegister="toggleLogReg" @isLogin="isLogin" v-if="showLogin"></Login>
        <Register @switchLogin="toggleLogReg" @isLogin="isLogin" v-if="!showLogin"></Register>
    </div>
</template>

<script>
    import Login from "./login.vue"
    import Register from "./register.vue"
    export default {
        name: "LoginRegPage",
        data() {
            return {
                showLogin: true
            }
        },
        methods: {
            toggleLogReg() {
                this.showLogin = !this.showLogin;
            },
            isLogin() {
                this.$emit("isLogin");
            }
        },
        components: {
            Login,
            Register
        }
    }
</script>

<style scoped>

</style>