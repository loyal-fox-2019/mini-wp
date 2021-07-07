<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">mini-wp</a>
        
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            
        </div>
        <span class="mr-sm-3">welcome back {{userName}}</span>
        <a class="btn btn-outline-primary ml-sm-2" href="#" v-on:click='logout'>log out</a>
        
    </nav>
</template>

<script>
export default {
    data(){
        return{
            userName: localStorage.getItem('name'),
            searchFilter:''
        }
    },
    methods: {
        logout(){
            localStorage.removeItem("token")
        },
        searchWord(){
            this.$emit('searchFilter', this.searchFilter)
        }
    }
}
</script>

<style scoped>

</style>