<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">mini-wp</a>
        
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        </div>
        <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                <a class="btn btn-outline-primary ml-sm-2" href="#" v-on:click='logout'>log out</a>
        </form>
    </nav>
</template>

<script>
export default {
    methods: {
        logout(){
            localStorage.removeItem("token")
            this.user = null //emit
            this.cekLogin()
        }
    }
}
</script>

<style scoped>

</style>