<template>
  <div>
    <h2 class="header-font">Add Post</h2>
    <form class="mt-5">
      <div class="form-group">
        <input class="header-input mb-5" type="text" placeholder="Title...">
        <wysiwyg />
      </div>
    </form>
  </div>
</template>

<script>
import axios from '../../helpers/axios'

export default {
  methods: {
    getArticles() {
      axios({
        url: '/articles/',
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          console.log(data)
        })
        .catch(err => {
          console.log(err.response.data.message)
        })      
    }
  },
  created() {
    this.getArticles()
  }
}
</script>

<style scoped>
  .header-input {
    width: 100%;
    border: none;
    height: 3rem;
    font-size: 3rem;
  }
  .header-input:hover {
    box-shadow: none;
    border: none;
  }
  .header-input:focus {
    box-shadow: none;
    border: none;
  }
</style>