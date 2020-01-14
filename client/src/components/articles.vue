<template>
  <div id="main-div">
    <div class="text-center" id="loading" v-if="loading">
      <b-spinner
      style="width: 8rem; height: 8rem;"
      variant="primary" label="Text Centered"></b-spinner>
    </div>
    <div v-else>
      nampil ini
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
    }
  },
  data() {
    return {
      message: 'Hello world',
    };
  },
};
</script>

<style scoped>
#loading {
  margin-top: 15%
}
</style>