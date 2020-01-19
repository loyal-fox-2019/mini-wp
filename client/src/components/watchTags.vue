<template>
  <div class="p-3 h-64 mt-5 bg bg-gray-100 rounded-lg border border-gray-400 text-blue-900">
    <h1 class="ml-3 font-bold text-gray-900 underline">WATCHED TAGS</h1>
    <div class="flex flex-wrap h-48 mt-3 overflow-y-scroll">
        <div v-for="i in tags" :key="i">
            <div class="p-2 bg bg-gray-200 mr-3 mb-2 text-gray-900 font-bold rounded-lg" @click="findTag(i)">{{i}}</div>
        </div>
    </div>
  </div>
</template>

<script>
let baseUrl = 'http://localhost:3000'

export default {
  props:['tags'],
  created() {
    axios({
      method: 'get',
      url: `${baseUrl}/user`,
      headers: { token : localStorage.getItem('access_token')}
    })
      .then( ({data}) => {
        this.tags = data.tags
      })
      .catch( err => console.log(err))
  },
  methods: {
    findTag(tag) {
      axios({
        method: 'get',
        url: `${baseUrl}/article/tags/${tag}`,
        headers: { token : localStorage.getItem('access_token')}
      })
        .then( ({data}) => {
          Swal.fire({
            icon:'success',
            title: 'filter success',
            showConfirmButton: false,
            timer: 1500
          })
          this.$emit('newArticles',data)
        })
        .catch( err => {
          Swal.fire({
            icon: 'error',
            title: 'filter failed',
            showConfirmButton: false,
            timer: 1500
          })

        })
    }
  }
}
</script>

<style>

</style>