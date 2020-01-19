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
          
          <div v-for="x in 33" :key="x">
              <h5>{{x}}</h5>
              <cardSmall :idNeh="x" @seeUserArticles="$emit('seeUserArticles', $event)"></cardSmall>
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
        'loggedInUserDetail'
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