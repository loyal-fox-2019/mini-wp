<template>
     <nav class="navbar navbar-dark sticky-top flex-md-nowrap p-0" v-if= "login == true">
        <div class="navbar-brand col-sm-3 col-md-2 mr-0 bg-dark">
            <img id="logo" src="../../../assets/logo.png" alt="logo">
            <a href="#">My Sites</a>
        </div>
        <div class="col-sm-6 col-md-9">
            <span>Reader</span>
        </div>
        
        <div class="col-sm-3 col-md-1">
            <button class="btn btn-primary">Log In</button>
        </div>
     </nav>
</template>

<script>
export default {
    name: "navBar"
}
</script>

<style scoped>

</style>>
