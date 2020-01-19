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
                @switchToArticlePage="$emit('switchToArticlePage', $event)"
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
import cardUser from '../components/cardUser'
import cardSmall from '../components/cardSmall'


export default {
    name:'contentPage',
    props:[
        'loggedInUserDetail',
        'allArticlesArray'
    ],
    components:{
      cardUser,
      cardSmall
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