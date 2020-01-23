<template>
  <div class="card mb-3 p-0 mx-0">
    <img
      class="card-img-top"
      :src="article.image"
      alt="Card image cap"
      style="height: 300px; object-fit: cover;"
    />
    <div class="card-body">
      <h5 class="card-title">{{ article.title }}</h5>
      <div v-html="article.content"></div>
      <p class="card-text">
        <a class="btn btn-secondary cursorNya" role="button">Update</a>
        <a
          class="btn btn-danger cursorNya"
          role="button"
          @click.prevent="deleteArticle"
          >Delete</a
        >
        <small class="text-muted">By</small>
        <small class="text-muted">~Last updated 3 mins ago</small>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainCard',
  props: ['article'],
  methods: {
    deleteArticle() {
      axios({
        method: 'get',
        url: `http://localhost:3000/deleteArticle/${this.article._id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.cursorNya {
  cursor: pointer;
}
</style>
