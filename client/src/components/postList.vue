<template>
  <div>
    <div class="row justify-content-center mt-3">
      <b-nav-form>
        <b-form-input size="sm" class="mr-sm-2" placeholder="Tag" v-model='searchTag' type='text'></b-form-input>
        <b-button size="sm" class="my-2 mx-1 my-sm-0" type="submit" @click.prevent='search(searchTag)'>Search by Tag</b-button>
      </b-nav-form>
    </div>
    <h3 class='mt-3 mb-3' v-if='filtered'>Post(s) with {{tags}} tag</h3>
    <h3 class='mt-3 mb-3' v-if='!filtered'>All Post</h3>
    <h1 class='mt-3 mb-3' v-if='postList.length == 0'>No post to be shown</h1>
    <div class='row'>
      <b-card-group class='col-md-8 offset-md-2'>
        <b-card class='border border-primary m-1' :title=post.title v-for='post in postList'>
          <b-card-img :src=post.featured_image class='col-md-4 offset-md-4'></b-card-img>
          <b-card-text v-html=post.content></b-card-text>
          <b-button v-for='tag in post.tags' class="m-1" pill @click='search(tag)'>{{tag}} </b-button>
          <b-card-text class="small text-muted mt-3">Created at {{post.createdAt.split('T')[0]}} by {{post.author.email}}</b-card-text>
          <button class="btn btn-primary" @click='editPost(post._id)'>Edit</button>
          <button class="btn btn-danger" @click='deletePost(post._id)'>Delete</button>
        </b-card>
      </b-card-group>
    </div>

  </div>
</template>
<script>
  import axios from '../config/axios.config.js'
  import Swal from 'sweetalert2'
export default {

  name: 'postList',

  data () {
    return {
      postList: [],
      searchTag: '',
      tags: '',
      filtered: false
    }
  },
  props: ['refresh'],
  watch: {
    refresh(){
      this.tag = ''
      this.fetchData()
      this.$emit('refresh')
    }
  },
  methods: {
    fetchData(){
      axios({
        method:'get',
        url: '/article',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({data}) => {
          this.postList = data
        })
        .catch((err) => {
          Swal.fire('Error', err.response.data.message, 'error')
        })
      this.filtered = false
    },
    deletePost(id){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          axios({
            method: 'delete',
            url: `/article/${id}`,
            headers: {
              access_token: localStorage.getItem('access_token')
            }
          })
          .then((data) => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon:'success',
              timer: 500
            })
            this.fetchData()
          })
          .catch((err) => {
            Swal.fire('Error', err.response.data.message, 'error')          
          })
        }
      })
    },
    editPost(id){
      this.$emit('show', 'edit')
      this.$emit('editForm', id)
    },
    search(tag){
      if (tag){
        axios({
          method:'get',
          url: `/article/tags/${tag}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
          .then(({data}) => {
            this.postList = data
          })
          .catch((err) => {
            Swal.fire('Error', err.response.data.message, 'error')
          })
        this.filtered = true
        this.tags = this.searchTag
      }
      else {
        this.fetchData()
      }
    }
  },
  created(){
    this.fetchData()
  }
}
</script>

<style scoped>
h1, h3{
    display: flex;
    align-items: center;
    justify-content: center;  
}
.card{
  min-width: 80%;
}
.card-img{
  margin-top: 30px;
  margin-bottom: 30px;
  max-height: 50vh;
}
.row{
  margin: 0;
}
</style>