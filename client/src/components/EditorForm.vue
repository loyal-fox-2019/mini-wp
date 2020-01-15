<template>
  <div class="bg-white p-8 w-4/5 mx-auto max-w-xl rounded-lg shadow mt-32">
    <div id="preview" class="mt-4">
      <img v-if="url" :src="url" class=" max-w-lg rounded-lg mx-auto" />
    </div>
    <form @submit.prevent="submitPost" class="my-4 text-lg">
      <div>
        <input v-model="title" class="shadow-md border rounded-sm border-gray-200 w-full p-2" placeholder="Title">
      </div>
      <div class="overflow-auto z-0">
        <wysiwyg v-model="content" class="h-full my-4 w-full rounded-sm shadow-md overflow-auto"/>
      </div>
      <div class="mb-4">
        <span>Set Featured Image: </span>
        <input type="file" @change="onFileChange">
      </div>
      <button
        class="bg-blue-400 px-2 py-1 rounded-sm shadow-md text-white hover:bg-blue-700"
        type="submit">
        Submit 
      </button>
    </form>
  </div>
</template>

<script>
import axios from '../../helpers/axios'
import Swal from 'sweetalert2'
import errorHandler from '../../helpers/errorHandler'
export default {
  name: 'EditorForm',
  component: {
  },
  data () {
    return {
      title: '',
      content: '',
      file: null,
      url: null
    }
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0]
      this.url = URL.createObjectURL(file)
      this.file = file
    },
    submitPost() {
      const fd = new FormData()
      fd.append('title', this.title)
      fd.append('content', this.content)
      fd.append('featured_image', this.file)
      axios({
        method: 'post',
        url: '/articles',
        headers: {
          'Content-Type': 'multipart/form-data',
          access_token: localStorage.getItem('access_token')
        },
        data: fd
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            text: 'Submitted!'
          })
          this.$emit('changePage', 'myposts')
        })
        .catch(({ response }) => {
          let msg = errorHandler(response)
          Swal.fire({
            icon: 'error',
            text: msg
          })
        })
    }
  }
}
</script>

<style scoped>

</style>