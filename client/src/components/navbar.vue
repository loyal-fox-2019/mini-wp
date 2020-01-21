<template>
    <nav class="navbar navbar-light justify-content-between">
        <div class="navbar-left d-flex">
            <div class="my-site" v-on:click="toHome()">
                <i class="icon-navbar-left fab fa-wordpress"></i>
                <span class="navbar-left-text text-white mr-3">My Site</span>
            </div>
            <div class="reader" v-on:click="toArticle()">
                <i class="icon-navbar-left far fa-newspaper"></i>
                <span class="navbar-left-text text-white mr-3">Reader</span>
            </div>
            <div v-if="page === 'article'" v-on:click="toCreateArticle()" class="new-article">
                <i class="icon-navbar-left fas fa-clipboard"></i>
                <span class="navbar-left-text text-white mr-3">New Article</span>
            </div>
        </div>
        <div class="navbar-right d-flex">
            <img src="../assets/img/user.png" class="mr-5" width="40" height="40" style="border: 1px solid #ffff; border-radius: 50%;">
            <i class="fas fa-bell mr-5"></i>
            <h3 class="text-danger" style="cursor: pointer;" v-on:click="logout()">Logout</h3>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'navbar',
    props: ['page'],
    data: function() {
        return {

        }
    },
    methods: {
        toArticle: function() {
            this.$emit('changePageAfterLogin', 'article');
        },
        toHome: function() {
            this.$emit('changePageAfterLogin', 'home');
        },
        toCreateArticle: function() {
            this.$emit('changePageToCreateArticle');
        },
        logout: function() {
            this.$emit('logout')
        }
    }
}
</script>

<style scoped>
.navbar {
    height: 60px;
    background-color: #006088;
}

.my-site {
    cursor: pointer;
}

.reader {
    cursor: pointer;
}

.new-article {
    cursor: pointer;
}

.icon-navbar-left {
    font-size: 32px !important;
    padding-right: 5px;
    vertical-align: middle;
    color: white;
}

.navbar-left-text {
    font-size: 18px !important;
}

.navbar-right i {
    font-size: 38px !important;
    color: #FFF;
    position: relative;
    top: 1.2px;
}
</style>