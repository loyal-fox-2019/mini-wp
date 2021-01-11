<template>
  <div class="add-post container">
    <header class="text-center m-4">
      <h3 class="h3">Add Article</h3>
    </header>
    <form action="#" class="commenting-form" @submit.prevent="addArticle" enctype="multipart/form-data">
      <div class="row">
        <div v-for="(error, i) in errors" :key="i" class="alert alert-danger text-center" role="alert">
          {{error}}
        </div>
        <div class="form-group col-md-6">
          <input type="text" required name="title" id="title" placeholder="Title" class="form-control" v-model="title">
        </div>
        <div class="form-group col-md-6">
          <b-form-tags
            v-model="tags"
            tag-variant="secondary"
            required
            tag-pills
            separator=" "
            placeholder="Tags separated by space"
            class="mb-2"
          ></b-form-tags>
        </div>
        <div class="form-group col-md-12">
           <b-form-file
              v-model="featured_image"
              :state="Boolean(featured_image)"
              placeholder="Featured image"
              drop-placeholder="Drop file here..."
              required
            ></b-form-file>
        </div>
        <div class="form-group col-md-12">
          <wysiwyg v-model="content" />
        </div>
        <div class="form-group col-md-12 text-right">
          <button type="submit" class="btn btn-secondary">Submit</button>
        </div>
      </div>
    </form>
    <div>
      <h4>Preview: </h4>
      <div class="text-center">
        <h5 class="h3">{{title}}</h5>
      </div>
      <span v-html="content"></span>
    </div>
  </div>
</template>

<script>
import axios from '../config/api'
export default {
  name: 'AddArticle',
  data: function () {
    return {
      content: '',
      title: '',
      tags: [],
      featured_image: null,
      errors: []
    }
  },
  methods: {
    addArticle() {
      this.errors = []
      const formData = new FormData()
      formData.set('title', this.title)
      formData.set('content', this.content)
      formData.set('tags', this.tags)
      formData.set('featured_image', this.featured_image)
      axios({
        method: 'POST',
        url: `/articles`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: formData
      })
        .then(({ data }) => {
          this.title = ''
          this.content = ''
          this.featured_image = ''
          this.tags = []
          this.$emit('show-home')
        })
        .catch(err => {
          this.errors[0] = err.response.data.message
        })
    }
  }
}
</script>

<style scoped>
.add-post {
  max-width: 50vw;
}
</style>
