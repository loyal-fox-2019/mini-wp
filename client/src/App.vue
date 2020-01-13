<template>
  <navbar></navbar>
</template>

<script>
import navbar from './components/navbar.vue';

export default {
  data() {
    return {
      message: 'Hello world',
    };
  },
  components: {
    navbar
  },
};
</script>

<style scoped>
</style