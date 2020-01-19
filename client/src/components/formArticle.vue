<template>
  <div>
    <loaderItem v-if="isLoading"></loaderItem>
    <form class="mt-2" 
      action="/upload-single" 
      method="post" 
      accept="image/jpeg, image/png, image/gif" 
      @submit.prevent="save">
      <div class="form-group">
        <div v-if="imgPreview" class="img-preview">
          <img :src="imgPreview" alt="featured image">
          <b-button class="btn-custom mt-2" @click="changeImg">Change</b-button>
        </div>
        <b-form-file
          v-show="!imgPreview"
          @change="setImgPreview"
          v-model="file"
          :state="Boolean(file)"
          placeholder="Add featured image here..."
          drop-placeholder="Drop file here..."
          class="img-picker mb-5"
        ></b-form-file>
        <input 
          v-model="title" 
          class="header-input mb-5" 
          type="text" 
          placeholder="Title here...">
        <wysiwyg v-model="content"></wysiwyg>
        <div>
          <b-form-tags
            v-model="tags"
            separator=","
            placeholder="Enter new tags separated by comma"
            remove-on-delete
            no-add-on-enter
            class="mt-4"
            tag-variant="primary"
            tag-pills
          ></b-form-tags>
          <b-button class="btn-warning mt-4" variant="primary" @click="changePage('listArticle')">Cancel</b-button>
          <b-button class="btn-custom mt-4" type="submit" variant="primary">Publish</b-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from '../../helpers/axios'
import loaderItem from '../components/loaderItem'

export default {
  props: ['idArticle'],
  data() {
    return {
      id: '',
      title: '',
      content: '',
      tags: [],
      file: null,
      imgPreview: '',
      isLoading: false
    }
  },
  methods: {
    save() {
      this.isLoading = true
      let formdata = new FormData()
      if (this.file) {
        formdata.append('image', this.file)
      }
      formdata.append('title', this.title)
      formdata.append('content', this.content)
      this.tags.forEach(item => {
        formdata.append('tags', item)
      });

      if (this.id) {
        axios({
          method: 'PUT',
          url: `/articles/${this.id}`,
          data: formdata,
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem('token')
          }
        })
          .then(({data}) => {
            this.id = ''
            this.imgPreview = ''
            this.title = ''
            this.content = ''
            this.tags = []
            this.isLoading = false
            this.$emit('changePage', 'listArticle')
          })
          .catch(err => {
            this.id = ''
            this.imgPreview = ''
            this.title = ''
            this.content = ''
            this.tags = []
            this.isLoading = false
          })
      } else {
        axios({
          method: 'POST',
          url: '/articles/',
          data: formdata,
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem('token')
          }
        })
          .then(({data}) => {
            this.isLoading = false
            this.idArticle = ''
            this.$emit('changePage', 'listArticle')
          })
          .catch(err => {
            this.isLoading = false
          })
      }
    },
    setImgPreview(e) {
      const file = e.target.files[0]
      // console.log(e)
      this.imgPreview = URL.createObjectURL(file)
    },
    changeImg() {
      this.file = null,
      this.imgPreview = ''
    },
    changePage(page) {
      this.$emit('changePage', page)
    },
    checkIdArticle() {
      if (this.idArticle) {
        axios({
          url: `/articles/${this.idArticle}`,
          method: 'GET',
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({data}) => {
            this.id = data._id
            this.file = null
            this.imgPreview = data.image
            this.title = data.title
            this.content = data.content
            this.tags = data.tags
          })
          .catch(err => {
            this.$swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.response.data.message
            })
          })
      } else {
        this.idArticle = ''
        this.id = ''
        this.file = null
        this.imgPreview = ''
        this.title = ''
        this.content = ''
        this.tags = ''
      }
    }
  },
  created() {
    this.checkIdArticle() 
  },
  watch: {
    idArticle() {
      if (this.idArticle) {
        axios({
          url: `/articles/${this.idArticle}`,
          method: 'GET',
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({data}) => {
            this.id = data._id
            this.imgPreview = data.image
            this.title = data.title
            this.content = data.content
            this.tags = data.tags
          })
          .catch(err => {
            this.$swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.response.data.message
            })
          })
      }
    }
  },
  components: {
    loaderItem
  }
}
</script>

<style scoped>
  .header-input {
    width: 100%;
    border: none;
    height: 3rem;
    font-size: 3rem;
  }
  .header-input:hover {
    box-shadow: none;
    border: none;
  }
  .header-input:focus {
    box-shadow: none;
    border: none;
  }
  .img-picker {
    display: block;
    width: 300px;
    margin: auto;
  }
  .img-preview {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .img-preview img {
    height: 240px;
  }
  li.badge {
    background: linear-gradient(45deg,#ff43f6,#a462ca) !important;
  }
</style>