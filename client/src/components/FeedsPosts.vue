<template>
  <div class="mt-32">
    <div v-for="article in myArticles" :key="article._id" class="mb-4 mx-auto max-w-xl rounded overflow-hidden shadow-lg bg-white">
      <div class="relative z-0">
        <img class="w-full relative z-0" :src="article.featured_image">
        
      </div>
      <div class="px-6 py-4">
        <div class="relative">
          <div
            @click.prevent="$emit('singlePost', article._id)"
            class="font-bold text-xl mb-2 cursor-pointer hover:underline">
            {{ article.title }}
          </div>
        </div>
        <div v-html="article.content" class="text-gray-700 mb-2">
          
        </div>
        <!-- <a class="cursor-pointer text-gray-700 hover:text-gray-900 underline">Read more</a> -->
        <span class="text-gray-600 text-sm">by {{ article.author.username }} </span>
      </div>
      <!-- Tags -->
      <div class="px-6 py-4">
        <span
          v-for="tag in article.tags" 
          :key="tag"
          @click.prevent="$emit('showSearch', 'tag', tag)"
          class="inline-block cursor-pointer bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          {{ tag }}
        </span>
      </div>
      <!-- End of Tags -->
    </div>
  </div>
</template>

<script>
import axios from '../../helpers/axios'
import Swal from 'sweetalert2'
export default {
  name: 'FeedsPosts',
  data () {
    return {
      myArticles: [],
      openedToggles: []
    }
  },
  methods: {
    fetchFeedsPosts() {
      axios({
        method: 'get',
        url: '/articles',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          this.myArticles = data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    this.fetchFeedsPosts()
  }
}
</script>

<style>

</style>