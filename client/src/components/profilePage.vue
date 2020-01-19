<template>
  <div class="flex flex-col">
      <div class="mb-3 md:w-8/12 md:self-center md:border border-gray-400 md:rounded-lg md:bg bg-gray-100">
        <img class="rounded-full mx-auto h-64 w-64 mt-5 mb-5" src="https://www.w3schools.com/html/pic_trulli.jpg" alt="">
        <div class="text-lg font-bold text-center">Richard Khonan</div>
        <div class="p-2 border border-black w-2/12 text-center mx-auto mt-2 mb-2 bg bg-white rounded-lg hover:text-white hover:bg-gray-900 cursor-pointer " @click.prevent="logout">Logout</div>
      </div>
      <div class="bg bg-gray-100 border border-gray-400 rounded-lg">
          <div v-if="articles.length>0" class="mx-auto text-3xl font-bold underline uppercase mt-3 text-center">your articles</div>
              <div v-for="n in articles" :key="n._id" class="w-10/12 mx-auto">
                  <cards :articleData="n" @updateArticle="updateArticle" @deleteArticle="deleteArticle" :profile="true"></cards>       
              </div>
          </div>
      </div>
</template>

<script>
let baseUrl = 'http://localhost:3000'
import cards from '../components/cards'

export default {
    props: ['showProfile'],
    components: {
        cards
    },
    data() {
        return {
            articles: []
        }
    },
    watch: {
        showProfile: {
            immediate:true,
            handler: function (n,o) {
                if(n==true){
                    this.getUserArticles()
                }
            }
        }
    },
    methods: {
        getUserArticles() {
            axios({
                method: 'get',
                url: `${baseUrl}/article/user`,
                headers: {token:localStorage.getItem('access_token')}
            })
                .then( ({data}) => {
                    this.articles = data
                })
                .catch( err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed to fetch your articles.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
        },
        updateArticle(payload) {
            this.$emit('updateArticle',{data:payload})
        },
        deleteArticle(payload) {
            this.getUserArticles()
            this.$emit('deleteArticle',payload)
        },
        logout() {
            localStorage.removeItem('access_token')
            this.$emit('logout')
        }
    }
}
</script>

<style>

</style>