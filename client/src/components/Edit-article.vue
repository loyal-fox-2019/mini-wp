<template>
  <div class="add-post container">
    <header class="text-center m-4">
      <h3 class="h3">Edit Article</h3>
    </header>
    <form action="#" class="commenting-form" @submit.prevent="editArticle" enctype="multipart/form-data">
      <div class="row">
        <div v-for="(error, i) in errors" :key="i" class="alert alert-danger text-center" role="alert">
          {{error}}
        </div>
        <div class="form-group col-md-6">
          <input type="text" name="title" id="title" placeholder="Title" class="form-control" v-model="title">
        </div>
        <div class="form-group col-md-6">
          <b-form-tags
            v-model="tags"
            tag-variant="primary"
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
  name: 'EditArticle',
  data: function () {
    return {
      content: '',
      title: '',
      tags: [],
      featured_image: null,
      errors: []
    }
  },
  props: {
    article: Object
  },
  beforeMount() {
    this.content = this.article.content
    this.title = this.article.title
    this.tags = this.article.tags
  },
  methods: {
    editArticle() {
      this.errors = []
      const formData = new FormData()
      formData.set('title', this.title)
      formData.set('content', this.content)
      formData.set('tags', this.tags)
      formData.set('featured_image', this.featured_image)
      axios({
        method: 'put',
        url: `/articles/${this.article._id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: formData
      })
        .then(({ data }) => {
          this.title = ''
          this.content = ''
          // this.featured_image = ''
          this.tags = []
          this.$emit('back-to-detail', data)
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
