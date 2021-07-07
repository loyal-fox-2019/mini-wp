<template>
  <div>
    <div class="tag-search-wrapper mb-5">
      <b-button 
        v-show="currentTag" 
        variant="primary" 
        class="tag-search"
        @click="currentTag=''">
        {{currentTag}} | <i class="fas fa-times"></i>
      </b-button>
    </div>
    <b-container>
      <b-row>
        <b-col sm="6" md="4" lg="3" v-for="article in articles" :key="article._id">
          <div class="article-wrapper mb-4">
            <div class="image-wrapper">
              <img :src="article.image" alt="">
            </div>
            <h4 @click="showArticle(article._id)" class="title header-font mt-3">{{article.title}}</h4>
            <div class="detail-wrapper">
              <div class="tag-wrapper mt-3">
                <b-badge
                  href="#" 
                  v-for="tag in article.tags" 
                  :key="tag.id" 
                  @click.prevent="currentTag=tag"
                  variant="light"
                  style="border: 1px solid #ccc" 
                  pill 
                  class="mr-2">{{tag}}</b-badge>
              </div>
              <div class="action-wrapper mt-3">
                <b-button-group>
                  <b-button @click="editArticle(article._id)" variant="warning">Edit</b-button>
                  <b-button @click="deleteArticle(article._id)" variant="outline-danger">Delete</b-button>
                </b-button-group>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from '../../helpers/axios'

export default {
  data() {
    return {
      articles: [],
      currentTag: ''
    }
  },
  methods: {
    getArticles() {
      axios({
        url: '/articles/',
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          this.articles = data
        })
        .catch(err => {
          this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message
          })
        })      
    },
    deleteArticle(id) {
      this.$swal.fire({
        title: 'Warning',
        text: "Do you want to delete this articles?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      })
        .then((result) => {
          if (result.value) {
            axios({
              url: `/articles/${id}`,
              method: 'DELETE',
              headers: {
                token: localStorage.getItem('token')
              }
            })
              .then(_ => { 
                this.$swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                )
                this.getArticles()
              })
              .catch(err => {
                this.$swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: err.response.data.message
                })
              })
          }
        })
        
    },
    editArticle(id) {
      this.$emit('editArticle', id)
    },
    showArticle(id) {
      this.$emit('showArticle', id)
    }
  },
  watch: {
    currentTag() {
      axios({
        url: `/articles?tags=${this.currentTag}`,
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          this.articles = data
        })
        .catch(err => {
          this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message
          })
        })
    }
  },
  created() {
    this.getArticles()
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
  .article-wrapper {
    min-height: 340px;
    border: 1px solid #ff43f6;
    border-radius: 8px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    overflow-wrap: break-word;
    box-shadow: 0 20px 20px -20px rgba(255, 67, 246, 0.6);
  }
  .image-wrapper {
    width: 100%;
    height: 130px
  }
  .image-wrapper img {
    width: 100%;
    height: 100%;
  }
  .detail-wrapper {
    margin-top: auto;
  }
  .tag-wrapper {
    display: flex;
    flex-wrap: wrap;
  }
  .article-wrapper .title {
    cursor: pointer;
  }
  .article-wrapper .title:hover {
    color: #ff43f6;
    transition: 0.4s color;
  }
  .tag-search-wrapper {
    padding: 0 2rem;
  }
</style>