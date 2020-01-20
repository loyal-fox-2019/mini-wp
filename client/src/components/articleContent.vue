<template>
  <div class='container'>
    <div class="row">
      <div class="col-12 mx-auto m-5">
          <div class="bg-white shadow p-5 mb-5 bg-white rounded" alt="Responsive image">
            <img class="shadow p-3 mb-5 bg-white rounded mx-auto d-block img-fluid" :src="content.imgUrl" alt="">
            <h1 class="p-3"> <b>{{content.title}}</b></h1>
            <p v-html="content.content" class="p-3"></p>
            <p class="pt-4 pl-3 mt-4">{{content.author}}</p>
            <p class="pl-3">{{content.created_at | moment("dddd, MMMM Do YYYY, h:mm:ss a")}}</p>
            <h4> Tags : 
              <span @click='tagSearch(tag)' v-for="tag in content.tags" class="badge badge-secondary ml-2 btn-secondary">{{tag}}</span>
            </h4>
            <div class="row">
              <div v-if="author === content.author" class="col-12 d-flex justify-content-end">
                <h1 @click="deleteArticle(content._id)" class="btn-submit btn btn-dark m-1">Delete</h1>
                <h1 @click="updateArticle(content._id)" class="btn-submit btn btn-dark m-1">Edit</h1>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  name : "articles",
  props : {
    content : String,
  },
  data(){
    return {
      author
    }
  },
  methods : {
    deleteArticle(id){
      this.$emit('confirmDelete', id)
    },
    updateArticle(id){
      console.log('masuk')
      this.$emit('updateArticle', id)
    },
    tagSearch(tag){
      this.$emit('tagSearch', tag)
    }
  },
  created(){
    this.author = localStorage.author
  }
}
</script>

<style>
col-12{
  -moz-hyphens:auto;
   -ms-hyphens:auto;
   -webkit-hyphens:auto;
   hyphens:auto;
   word-wrap:break-word;
}
</style>