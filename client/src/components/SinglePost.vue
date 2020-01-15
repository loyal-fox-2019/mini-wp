<template>
  <div class="mx-auto my-32 max-w-xl rounded overflow-hidden shadow-lg bg-white">
    <img class="w-full" :src="featuredImage">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ title }}</div>
      <div v-html="content" class="text-gray-700 text-base mb-2">
        
      </div>
      <a class="text-gray-700 hover:text-gray-900 underline">Read more</a>
    </div>
    <div class="px-6 py-4">
      <span
        v-for="tag in tags" :key="tag"
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
        {{ tag }}
      </span>
    </div>
  </div>
</template>

<script>
import axios from '../../helpers/axios'
export default {
  name: 'SinglePost',
  props: {
    articleId: String
  },
  data () {
    return {
      title: '',
      content: '',
      date: '',
      author: '',
      featuredImage: '',
      tags: ''
    }
  },
  methods: {
    fetchPost(articleId) {
      axios({
        method: 'get',
        url: `/articles/${articleId}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          this.title = data.title
          this.author = data.author.username
          this.content = data.content
          this.date = data.created_at
          this.featuredImage = data.featured_image
          this.tags = data.tags
        })
        .catch(({ response }) => {
          console.log(response)
        })
    }
  },
  created () {
    this.fetchPost(this.articleId)
  },
  computed: {
  }
}
</script>

<style>

</style>