<template>
  <div class="ui labeled inverted icon left inline vertical sidebar menu visible set-top" style>
    <a class="item" @click="$emit('menuClick','ListArticle')">
      <i class="file alternate icon"></i>
      My Article
    </a>
    <a class="item" @click="$emit('menuClick','FormArticle')">
      <i class="plus square icon"></i>
      Add New Article
    </a>
    <a class="item">
      <i class="search icon"></i>
      Search Article
    </a>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.set-top {
  top: 48px;
  background-color: #60ba86!Important;
}
</style>