<template>
  <b-form @submit.prevent="searchArticle" class="d-flex">
    <b-input-group size="lg">
      <b-input-group-prepend is-text>
        <b-icon icon="search"></b-icon>
      </b-input-group-prepend>
      <b-form-input
        type="search"
        placeholder="Search article..."
        class="rounded-0"
        v-model="query"
      ></b-form-input>
    </b-input-group>
  </b-form>
</template>

<script>
import api from '../api'
import errorHandler from '../helpers/error-handler.js'

export default {
  name: 'search-bar',
  data: function() {
    return {
      query: '',
    }
  },
  methods: {
    searchArticle() {
      this.$swal.fire({
        title: 'Searching articles...',
        onBeforeOpen: () => {
          this.$swal.showLoading()
        },
      })

      api
        .get(`/find?query=${this.query}`)
        .then(({ data }) => {
          this.$swal.close()
          this.$emit('updateArticle', data)
        })
        .catch(err => {
          this.$swal.close()
          const self = this
          errorHandler(err, self)
        })
    },
  },
}
</script>

<style></style>
