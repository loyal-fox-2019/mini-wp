<template>
  <div>
    <topNavbar @show='show'></topNavbar>
    <div id="frontPage">
      <img v-if='!showPage' src="../assets/front_background.png">
      <h1 v-if='!showPage'>Welcome to Mini WP</h1>
    </div>
    <postList @editForm='editForm' @show='show' v-if='showPage == "list"' :refresh='refresh' @refresh='refreshFalse'></postList>
    <postForm @show='show' v-if='showPage == "form"'></postForm>
    <editForm @show='show' v-if='showPage == "edit"' :postId='postId'></editForm>
  </div>
</template>

<script>
import topNavbar from '../components/topNavbar'
import postList from '../components/postList'
import postForm from '../components/postForm'
import editForm from '../components/editForm'
export default {

  name: 'mainPage',
  components:{
    topNavbar,
    postList,
    postForm,
    editForm
  },

  data () {
    return {
      showPage: '',
      postId: '',
      refresh: false
    }
  },
  methods: {
    show(page){
      if (this.showPage == page){
        this.refresh = true
      }
      else {
        this.refresh = false
      }
      this.showPage = page
    },
    refreshFalse(){
      this.refresh = false
    },
    editForm(id){
      this.postId = id
    }
  }
}
</script>

<style scoped>
  h1{
    display: flex;
    align-items: center;
    justify-content: center;  
  }
  img{
    margin-left: 10vw;
    max-height: 80vh;
  }
  #frontPage{
    display: flex-column;
    align-items: center;
    justify-content: center; 
  }
</style>