<template>
    <div>
      <goBackButton
        @goBack="$emit('goBack', 'contentPage')">
      </goBackButton>

      <div id="divMasterContainer" class="row">
        <div id="divUserProfileContainer" class="col-3">
          
          <div class="card" style="width: 100%; text-align:center">
            <img :src="userDetail.profilePicture" class="card-img-top" alt="...">
            <div class="card-body">
              <h4 class="card-title" >{{userDetail.fullName}}</h4>
              <p class="card-text">{{userDetail.description}}</p>
              <p class="card-text"><small class="text-muted">{{ userDetail.email}}</small></p>
            </div>
          </div>
        </div>



        <div id="divUserDataContainer" class="col-8">
          <div class="card-columns" id="divCardColumn">
              <div v-for="article in allUserArticles" :key="article._id">
                  <cardSmall 
                    :articleDetail="article" 
                    :author="userDetail._id"
                    :loggedInUserDetail="loggedInUserDetail"
                    @switchToArticleReader="$emit('switchToArticleReader', $event)"
                    @switchToArticleEditPage="$emit('switchToArticleEditPage', $event)"
                    @switchToUserContentPage="$emit('switchToUserContentPage', $event)"
                    @switchToFilterResultPage="$emit('switchToFilterResultPage', $event)">
                </cardSmall>
              </div>
            <!-- <div class="card">
                <img src="" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">Card title that wraps to a new line</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
            </div> -->
          </div>
        </div>
        





      </div>






    </div>
</template>

<script>
import swal from 'sweetalert2'
import axios from '../../config/axios'

import goBackButton from '../components/goBackButton'
import cardSmall from '../components/cardSmall'

export default {
    name: 'userContentPage',
    props:[
      'userContentPageUsername',
      'loggedInUserDetail'
    ],
    components:{
        goBackButton,
        cardSmall
    },
    data(){
        return{
            userDetail:{},
            allUserArticles:[]
        }
    },
    methods:{
        setUserDetail(data){
            this.userDetail = data
        },
        setAllUserArticles(data){
            this.allUserArticles = data
        },
        fetchUserDetail(){
            axios({
                method: 'get',
                url: `/users/one/${this.userContentPageUsername}`,
                headers:{
                    token: localStorage.getItem('token')
                }
            })
            .then( ({data})=>{
                console.log(`TCL: getUserDetail -> data`, data)
                this.setUserDetail(data)
            })
            .catch( ({response})=>{
                console.log(`error @fetchUserDetail - userContentPage.vue \n=========================================\n`, response.data.message)
                swal.fire(
                    "Error",
                    response.data.message,
                    'error'
                )
            })
        },
        fetchAllUserArticle(){
            axios({
                method: 'get',
                url: `/articles/all/${this.userContentPageUsername}`,
                headers:{
                    token: localStorage.getItem('token')
                }
            })
            .then( ({data})=>{
                console.log(`TCL: fetchAllUserArticle -> data`, data)
                this.setAllUserArticles(data)
            })
            .catch( ({response})=>{
                console.log(`error @fetchAllUserArticle - userContentPage.vue \n=========================================\n`, response.data.message)
                swal.fire(
                    "Error",
                    response.data.message,
                    'error'
                )
            })

        }
    },
    created(){
        this.fetchUserDetail()
        this.fetchAllUserArticle()
    }



}
</script>




<style scoped>
#divMasterContainer{
    /* border: dashed 2px grey; */
    margin:auto;
    width: 90%;
    height: 80vh;
    overflow: hidden;
}

#divUserProfileContainer{
    /* border: solid 2px blue; */

    display: inline-block;
    margin-left: 1%;
    margin-right: 1%;
    height:100%;
    width: auto;
}

#divUserDataContainer{
    /* border: solid 2px purple; */
    width: 100%;
    height: 80vh;
    overflow: scroll;
}
#divUserDataContainer::-webkit-scrollbar {
    display: none;
}



</style>