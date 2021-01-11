<template>
  <div style="display:flex; justify-content:center;">
    <b-form class="col-md-10 mt-5">
      <b-form-group
        id="input-group-1"
        label="Title"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="title"
          type="text"
          required
          placeholder="Enter title"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="Content" label-for="input-2" class='mt-5'>
        <div id="editor">
        </div>
      </b-form-group>
      <b-form-group id="input-group-3" label="Tags" label-for="input-3" class='mt-5'>
        <b-form-tags
          v-model="tags"
          separator=" "
          placeholder="Enter new tags separated by space"
          remove-on-delete
          no-add-on-enter
          class="mb-2"
        ></b-form-tags>
      </b-form-group>
      <b-form-group id="input-group-4" label="Featured image" label-for="input-4" class='mt-5'>
        <b-form-file v-model="file" plain></b-form-file>
      </b-form-group>
      <div class="d-flex mt-5">
        <b-button type="submit" variant="primary" @click.prevent='submitPost'>Submit Edit</b-button>
        <b-spinner class='ml-3' v-if='isLoading'></b-spinner>
      </div>
    </b-form>
  </div>
</template>

<script>
  import Swal from 'sweetalert2'
  import Quill from 'quill'
  import axios from '../config/axios.config.js'
export default {

  name: 'editForm',

  data () {
    return {
      title: '',
      content: '',
      file: null,
      editor: null,
      tags: [],
      isLoading: false
    }
  },
  methods: {
    fetchPost(){
      axios({
        method: 'get',
        url: `/article/${this.postId}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({data}) => {
          this.title = data.title
          this.content = data.content
          this.tags = data.tags
          this.editor.root.innerHTML = this.content
        })
        .catch((err) => {
          Swal.fire('Error', err.response.data.message, 'error')
        })
    },
    submitPost(){
      this.isLoading = true
      this.content = this.editor.root.innerHTML
      const fd = new FormData()
      fd.append('title',this.title)
      fd.append('content',this.content)
      fd.append('tags',JSON.stringify(this.tags))
      fd.append('file',this.file)
      axios({
        method: 'patch',
        url: `/article/${this.postId}`,
        data: fd,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(() => {
          this.$emit('show', 'list')
        })
        .catch((err) => {
          Swal.fire('Error', err.response.data.message, 'error')
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  },
  props: ['postId'],
  created(){
    this.fetchPost()
  },
  mounted(){
    this.editor = new Quill('#editor', {
      theme: 'snow'
    })
  }
}
</script>

<style scoped>

</style>