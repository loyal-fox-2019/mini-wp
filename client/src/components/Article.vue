<template>
  <div class="col bg-light mt-2">
    <div class="row">
      <div class="col-8" style="max-height: 200px;">
        <a href="#" v-on:click="goToArticle(card._id)" class="stretched-link"></a>
        <h2>{{ card.title }}</h2>
        <p class="text-truncate" v-html="card.content"></p>
        <p>{{ card.created_at}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["card"],
  methods: {
    goToArticle: function(params) {
      this.$emit("page", params);
    }
  }
};
</script>

<style>
</style>