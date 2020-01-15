<template>
  <div class="mt-32">
    <div v-for="article in myArticles" :key="article._id" class="mb-4 mx-auto max-w-xl rounded overflow-hidden shadow-lg bg-white">
      <img class="w-full" :src="article.featured_image">
      <div class="px-6 py-4">
        <div
          @click.prevent="$emit('singlePost', article._id)"
          class="font-bold text-xl mb-2 cursor-pointer hover:underline">
          {{ article.title }}
        </div>
        <div v-html="article.content" class="text-gray-700 mb-2">
          
        </div>
        <a class="text-gray-700 hover:text-gray-900 underline">Read more</a>
      </div>
      <!-- Tags -->
      <div class="px-6 py-4">
        <span v-for="tag in article.tags" :key="tag" class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{{ tag }}</span>
      </div>
      <!-- End of Tags -->
    </div>
  </div>
</template>

<script>
import axios from '../../helpers/axios'
import Swal from 'sweetalert2'
export default {
  name: 'MyPosts',
  data () {
    return {
      myArticles: []
    }
  },
  methods: {
    fetchMyPosts() {
      axios({
        method: 'get',
        url: '/articles',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          this.myArticles = data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    this.fetchMyPosts()
  }
}
</script>

<style>

</style>