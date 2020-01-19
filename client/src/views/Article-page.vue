<template>
  <div class="container">
    <edit-page v-show="editPage" :article="article" @back-to-detail="finishEdit"></edit-page>
    <div class="single-post" v-show="!editPage">
      <div class="post-thumbnail d-flex justify-content-center">
        <img
          :src="article.featured_image"
          alt="..."
          class="img-fluid d-flex"
        />
      </div>
      <div class="post-details">
        <h1 class="text-center my-5">
          {{article.title}}
          <a href="#" @click.prevent="editPage=true" v-if="editable">
            <i class="fa fa-edit"></i>
          </a>
          <a href="#" v-if="editable">
            <i class="fa fa-trash"></i>
          </a>
        </h1>
        <div class="post-body">
          <span v-html="article.content"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditPage from '../components/Edit-article'
export default {
  name: 'ArticlePage',
  components: {
    EditPage
  },
  props: {
    detail: Object
  },
  data() {
    return {
      editPage: false,
      editable: localStorage.getItem('token'),
      article: this.detail,
    }
  },
  methods: {
    finishEdit(payload) {
      this.editPage = false
      this.article = payload
    }
  }
}
</script>

<style>

</style>
