<template>
  <div class="flex flex-col">
     <div id="navbar">
        <a href="#">asd</a>
     </div>

     <router-view :key="$route.fullpath"></router-view>
  </div>
</template>

<script>
export default {
   data() {
      return {
         isLoggedIn: false

      }
   },

   methods: {

   }
}
</script>

<style>

</style>