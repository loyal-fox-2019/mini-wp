<template>
    <div>
        <login-page-component v-if="!isLogin"/>
        <home-page-component v-if="isLogin" :token="token"/>
    </div>
</template>

<script>
    import loginPageComponent from "./components/loginPage/loginPageComponent";
    import homePageComponent from "./components/homePage/homePageComponent";

    export default {
        name: "app",
        data() {
            return {
                isLogin: false,
                token: null
            }
        },
        components: {
            loginPageComponent,
            homePageComponent
        },
        created() {
            if (localStorage.token) {
                this.isLogin = true;
                this.token = localStorage.token;
            }
        }
    }
</script>

<style scoped>
</style>