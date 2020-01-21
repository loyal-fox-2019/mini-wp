<template>
<div>
  <Navbar></Navbar>
  <router-view></router-view>
</div>
</template>

<script>
import Navbar from './components/Navbar'
export default {
    name: "App",
    components:{
        Navbar
    },
    mounted(){
        // console.log(this.$root.nowLogin);
        // console.log(this.axios);
        // this.$root.testPrint('data')
        // console.log(this.VueAxios);
        // this.axios.get('/posts')
        // .then(({data}) => {
        //     console.log(data);
        // }).catch((err) => {
        //     console.log(err)
        //     alert(err)
        // });
    }
}
</script>

<style>

</style>