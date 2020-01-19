<template>
  <div class="card mb-2 custom-card">
    <div class="row no-gutters">
      <div class="col-md-3" :style="styles">
      </div>
      <div class="col-md-9 text-light border border-primary">
        <div class="card-body pb-1">
          <b-row>
            <b-col>
              <h4 class="card-title mb-0 text-capitalize">{{ title }}</h4>
            </b-col>

            <b-col class="text-right">
              <b-badge variant="info" v-if="status">Published</b-badge>
              <b-badge variant="warning" v-else>Draft</b-badge>
              <b-button size="sm" variant="danger" @click="deleteArticle"><span class="fas fa-trash"></span></b-button>
            </b-col>
          </b-row>
          <p class="card-text mb-0">
            <small class="font-italic">{{ createdAt }}</small>
          </p>
          <p class="card-text">By {{ author }}</p>
          <p class="card-text text-truncate lead" v-html="content"></p>
          <div>
            <b-badge href="#" variant="light" v-for="(tag, index) in tags" :key="index" class="mr-1">{{ tag }}</b-badge>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api'
import errorHandler from '../helpers/error-handler.js'

export default {
  name: 'article-card',
  data: function() {
    return {
      styles: {
        background: `url(${this.imgSrc})`,
        'background-size': 'inherit',
        'background-repeat': 'no-repeat'
      }
    }
  },
  props: [
    'id',
    'imgSrc',
    'title',
    'content',
    'createdAt',
    'tags',
    'author',
    'status'
  ],
  methods: {
    deleteArticle() {
      this.$swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then(result => {
        if (result.value) {
          this.$swal.fire({
            title: 'Deleting...',
            onBeforeOpen: () => {
              this.$swal.showLoading()
            }
          })

          api.delete(`/articles/${this.id}`, {
            headers: {
              token: localStorage.getItem('token'),
            },
          })
            .then(({ data }) => {
              this.$root.$bvToast.toast(`Article deleted`, {
                title: 'Success',
                autoHideDelay: 3000,
                appendToast: true,
                solid: true,
                variant: 'success'
              })
              this.$emit('updateArticleList')
            })
            .catch(err => {
              this.$swal.close()
              const self = this
              errorHandler(err, self)
            })
        }
      })
    }
  }
}
</script>

<style scoped>
.custom-card {
  background-color: rgb(0, 0, 0, 0.3) !important;
}
</style>
