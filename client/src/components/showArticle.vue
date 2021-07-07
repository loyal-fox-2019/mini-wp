<template>
  <div>
    <b-container>
      <b-row>
        <div class="article-wrapper">
          <h1 class="header-font">{{title}}</h1>
          <hr class="mb-5" />
          <p><span v-html="content"></span></p>
          <hr class="mt-5" />
          <div class="tag-wrapper mt-3">
            <b-badge 
              v-for="tag in tags" 
              :key="tag.id"
              variant="light"
              style="border: 1px solid #ccc" 
              pill 
              class="mr-2">{{tag}}</b-badge>
          </div>
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from '../../helpers/axios'

export default {
  props: ['idArticle'],
  data() {
    return {
      date: '',
      title: '',
      content: '',
      tags: [],
      imgPreview: ''
    }
  },
  methods: {
    getArticle() {
      axios({
        url: `/articles/${this.idArticle}`,
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }        
      })
        .then(({data}) => {
          this.date = data.createdAt
          this.title = data.title
          this.content = data.content
          this.tags = data.tags
          this.imgPreview = data.image
        })
        .catch(err => {
          this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message
          })
        })
    }
  },
  created() {
    this.getArticle()
  }
}
</script>

<style>
.tag-wrapper {
  display: flex;
  flex-wrap: wrap;
}
.article-wrapper {
  padding: 2rem;
  width: 100%
}
</style>