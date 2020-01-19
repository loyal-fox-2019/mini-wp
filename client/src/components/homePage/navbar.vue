<template>
    <nav class="navbar navbar-fixed-top navbar-light bg-dark text-light justify-content-between">
        <a class="navbar-brand"><i class="fab fa-wordpress-simple fa-lg"></i> Mini WP</a>
        <form class="form-inline">
        <i class="far fa-user-circle fa-2x" id="user-img"></i>
        <button class="btn btn-outline-danger my-2 my-sm-0 font-weight-bold" @click="logout">Logout</button>
        </form>
    </nav>
</template>

<script>
export default {
    name: 'navbar',
    methods: {
        logout: function(){
            this.$emit('signOut')
        }
    }
}
</script>

<style scoped>
    .navbar-brand{
        color: white !important;
    }
    #user-img {
        color: white !important;
        padding: 0 20px;
        transition: transform .5s;
    }

    #user-img:hover {
        transform: rotateY(180deg);
        cursor: pointer;
    }
</style>