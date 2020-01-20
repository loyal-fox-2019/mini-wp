<template>
  <div>
            <div class="card mt-2" v-for="article in articles" :key="article._id">
                <div class="card-header">
                    {{article.title}}
                </div>
                <div class="card-body">
                    <blockquote class="blockquote mb-0">
                        <div v-html='article.content'></div>
                        <footer class="blockquote-footer"><cite title="Source Title"> By </cite>{{article.author.name}}</footer>
                        <footer class="blockquote-footer"><cite title="Source Title"> last update at </cite>{{article.createdAt.split('T')[0]}}, {{article.createdAt.split('T')[1]}}</footer>
                        <button  @click ='destroy(article._id)'   class="btn btn-danger btn-lg btn-block">DELETE</button>
                        <button  @click ='update(article._id)' class="btn btn-secondary btn-lg btn-block" type="button" data-toggle="modal" data-target="#exampleModal">UPDATE</button>  
                    </blockquote>
                </div>
            </div> 
            <div class="card mb-3" >
              <img src="..." class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
  </div>
</template>

<script>
import axios from "axios"
import Swal from 'sweetalert2'

export default {
  name: "myArticle",
  data(){
      return{
          articles :[]
      }
  },
  methods: {
    myArticle(){
        this.$emit('set-status', 'myArticle')
    },
    destroy: function(id){
      axios({
        url: `http://localhost:3000/articles/${id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        method: 'delete',
      })
      .then(({data}) => {
       this.getData()
      })
      .catch(function (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "this is not your article"
          })
      })
    },
    update: function(id){
      axios({
        url: `http://localhost:3000/articles/${id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        method: 'get',
      })
      .then(({data}) => {
    console.log(data)
      })
      .catch(function (error) {
        console.log(error);
      })
    },
    getData : function(){
          axios({
            url: 'http://localhost:3000/articles',
            method: 'GET',
            headers:{
              token: localStorage.getItem("token")
            }
          })
          .then(({data}) => {
            console.log(data)
         this.articles = data
          })
          .catch(function (error) {
            console.log(error);
          })
    }
  },
  created(){
       this.getData()
  }
}
</script>

<style>
</style>