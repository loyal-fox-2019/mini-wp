<template>
    <div class="divIdentifier divContentPage">
      <h3 class="elementIdentifier">views/contentPage.vue</h3>
      
      <div id="divCardUser">
        <cardUser
          :loggedInUserDetail="loggedInUserDetail"
        />
      </div>
      <div class="dropdown-divider"></div>

      <!-- start of div content small card -->
      <div class="divContentSmallCard">
        <div class="row row-cols-1 row-cols-md-4" >
          <!-- {{ allArticlesArray }} -->
          <div v-for="article in allArticlesArray" :key="article._id">
              <!-- <h5>{{article}}</h5> -->
              <cardSmall 
                :articleDetail="article" 
                :author="loggedInUserDetail._id"
                @switchToArticleReader="$emit('switchToArticleReader', $event)"
                @switchToArticleEditPage="$emit('switchToArticleEditPage', $event)"
                @switchToUserContentPage="$emit('switchToUserContentPage', $event)"
                @switchToFilterResultPage="$emit('switchToFilterResultPage', $event)">
              </cardSmall>
          </div>
          


        </div>
      </div>
      <!-- end of div content small card -->
          



    </div>
</template>



<script>
import swal from 'sweetalert2'
import axios from '../../config/axios'

import cardUser from '../components/cardUser'
import cardSmall from '../components/cardSmall'


export default {
    name:'contentPage',
    props:[
    ],
    components:{
      cardUser,
      cardSmall
    },
    data(){
      return {
        loggedInUserDetail : {},
        allArticlesArray : []
      }
    },
    methods:{
      // setter
      setAllArticlesArray(articles){
          this.allArticlesArray = articles
          // console.log(' allArticlesArray @setAllArticlesArray -mainPage.vue \n======================\n', this.allArticlesArray)
      },
      setLoggedInUserDetail(data){
          this.loggedInUserDetail = data
      },
      fetchUserDetail(){
            axios({
                method: 'get',
                url: '/users',
                headers: {
                    token : localStorage.getItem('token')
                }
            })
            .then( ({data})=>{
                this.setLoggedInUserDetail(data)
            })
            .catch( ({ response })=>{
                console.log('error log @fetchUserDetail - contentPage.vue\n=========================================\n', response.data.message)
                swal.fire(
                    "Error",
                    response.data.message,
                    'error'
                )
            })
        },
        fetchAllArticles(){
            axios({
                method: 'get',
                url: '/articles/all',
                headers:{
                    token: localStorage.getItem('token')
                }
            })
            .then( ({data})=>{
            console.log(`TCL: fetchAllArticles -> data`, data)
                this.setAllArticlesArray(data)
            })
            .catch( ({response})=>{
                console.log(`error @fetchAllArticle - contentPage.vue \n=========================================\n`, response.data.message)
                swal.fire(
                    "Error",
                    response.data.message,
                    'error'
                )
            })
        },
    },
    created(){
      this.fetchUserDetail()
      this.fetchAllArticles()
    }



      



}
</script>



<style scoped>
.divContentSmallCard{
  /* border: solid 2px red; */
  padding: 1%;
  width: 80%;
  margin: 1% auto;
  height: 65vh;
  overflow: scroll;
}
.divContentSmallCard::-webkit-scrollbar {
    display: none;
}

#divCardUser{
  margin: 1%;
  margin-left: 35%
}
.divContentPage{
  height: fit-content;
  overflow: hidden
}


</style>