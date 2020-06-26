<template>
    <div @loggedIn="console.log($event)">
        <router-view name="header" :isLogin="isLogin"></router-view>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "App",
    data: function() {
        return {
            isLogin: false,
            token: null
        }
    },
    created() {
        if (localStorage.length > 0) {
            this.token = localStorage.getItem("token");
            this.isLogin = true;
        }
    }
}
</script>

<style scoped>

</style>