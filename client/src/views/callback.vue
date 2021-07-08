<template>
  <h4 class="text-light">Processing...</h4>
</template>

<script>
import api from '../api'
import successLoginHandler from '../helpers/success-login-handler.js'
import errorHandler from '../helpers/error-handler.js'

export default {
  name: 'github-callback',
  created() {
    this.$swal.fire({
      title: 'redirecting...',
      onBeforeOpen: () => {
        this.$swal.showLoading()
      },
    })

    if (this.$route.query.code) {
      api
        .post('/third-api/login-github', { code: this.$route.query.code })
        .then(({ data }) => {
          const self = this
          successLoginHandler(data, self)
        })
        .catch(err => {
          this.$swal.close()
          const self = this
          errorHandler(err, self)
        })
    }
  },
}
</script>

<style></style>
