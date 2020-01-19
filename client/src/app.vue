<template>
    <div>
        <LoginRegPage v-if="!isTokenSet" @isLogin="checkToken"></LoginRegPage>
        <Mainpage v-if="isTokenSet" @isLogout="checkToken"></Mainpage>
    </div>
</template>

<script>
    import Mainpage from "./components/Mainpage/index"
    import LoginRegPage from "./components/LoginRegPage/index"
    export default {
        name: "App",
        data() {
            return {
                isTokenSet: this.$cookies.isKey("token")
            }
        },
        methods: {
            checkToken() {
                this.isTokenSet = this.$cookies.isKey("token");
            }
        },
        components: {
            Mainpage,
            LoginRegPage
        }
    }
</script>

<style scoped>

</style>