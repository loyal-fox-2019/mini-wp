<template>
<div id="hadeh">
  <form-article><form-article>
</div>
</template>

<script>
import FormArticle from '../components/FormArticle.vue'
export default {
name: 'CreatePage',
components:{
    FormArticle
},
beforeCreate(){
    if(!this.$root.nowLogin) this.$router.push('/')
}
}
</script>

<style scoped>
#hadeh{
    background-color: rgba(240, 248, 255, 0.438);
    overflow-y: auto;
    width: 100vw;
    height: 90vh;
    padding: 5vh 5vh 10vh 5vh;
}
</style>