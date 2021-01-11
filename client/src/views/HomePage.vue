<template>
  <div class="mx-5 mt-3">
    <MainCard v-for="(article, key) in articles" :key="key" :article="article"></MainCard>
  </div>
</template>

<script>
import MainCard from "../components/MainCard";
export default {
  name: "HomePage",
  props: ['articles'],
  components: {
    MainCard
  }
};
</script>

<style>
</style>