<template>
  <div class="card d-flex flex-row bd-highlight">
    <div class="w-25 d-flex flex-column border justify-content-center align-items-center">
      <img :src="article.featured_image" style="height: 200px; width: 320px;" />
    </div>
    <div class="w-75 pl-4 pt-3 pr-4 pb-3 border d-flex flex-column align-items-start">
      <h3>{{ article.title }}</h3>
      <label><i class="fas fa-feather-alt mr-2 ml-3"></i> {{ article.author.username }} <label class="font-italic"> - {{ dateFormat(article.createdAt) }} </label></label>
      <p v-html="sliceArticle(article.content)"> </p>
        <a href @click.prevent="readMore(article)">Read More</a>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: ['article'],
  methods: {
    dateFormat(val) {
      return moment(val).format("MMM Do YYYY")
    },
    sliceArticle(val) {
      const a = val.slice(0, 370) + " ..."
      return a
    },
    readMore(val) {
      this.$emit('readMore', val)
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');

.card {
  box-shadow: 0 4px 8px 0 rgba(219, 169, 169, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.19) !important;
  
}

h3 {
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
}

.w-25 {
  overflow: hidden;
  object-fit: cover
}

label {
  color: #007bff
}

a, label {
  font-size: 0.9rem
}

</style>
