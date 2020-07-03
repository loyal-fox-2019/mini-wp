<template>
  <div class="content max-w-4xl mx-auto">
    <div class="absolute text-xl">
        <svg v-if="!liked" @click="bookmark" class="fill-current text-yellow-400 hover:text-red-500 ml-2 mt-2 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"/></svg>
        <svg v-else-if="liked" @click="bookmark" class="fill-current text-red-500 hover:text-yellow-400 ml-2 mt-2 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"/></svg>
      </div>
 <header class="text-center">
    <h1 class="text-4xl md:text-5xl font-semibold">{{ article.title }}</h1>
    <h3 class="text-xl">by {{ article.author.name }}</h3>
    <div class="px-6 py-4">
      <span v-for="(tag, i) in article.tags" :key="i" class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 cursor-pointer select-none">{{ tag }}</span>
    </div>
    <!-- <h3 class="text-xl md:text-xl mb-4">{{ article.author.name }}</h3> -->
    <div class="text-center">
    <!-- <button @click="edit" class="bg-grey-300 border font-bold py-2 px-4 rounded ml-4 shadow">Edit</button>
    <button @click="remove" class="bg-grey-300 border font-bold py-2 px-4 rounded ml-4 shadow">Delete</button> -->
  </div>
  </header>

  <div class="image my-8">
    <img class="shadow-md w-3/4 h-auto mx-auto" :src="article.image" alt="featured_image">
  </div>
  <div v-html="article.content" class="content-text max-w-lg mx-auto text-left leading-relaxed text-gray-600 px-4">
    <div class="flex px-8 py-6">
      <div class="flex">
        
      </div>
    </div>

  </div>
<hr class="my-4">
<h1 class="text-xl font-semibold">Comments</h1>
  <div class="flex items-start">
    <div class="flex flex-col">
      <p v-for="(comment, i) in article.comments" :key="i" class="font-light text-md text-grey-darkest py-2 px-2 border-2 rounded-lg">
        {{ comment }}
      </p>    
    </div>
  </div>
  <div class="flex m-6 rounded-lg border-2 border-grey overflow-hidden">
    <span class="text-3xl text-grey px-3 border-r-2 border-grey">+</span>
    <input v-model="comment" @keyup.enter.prevent="addComment" type="text" class="w-full px-4" placeholder="Add your comments"/>
  </div>

  </div>
</template>

<script>
export default {
  name: 'TimelineDetail',
  props: {
    article: Object
  },
  data() {
    return {
      comment: '',
      liked: false
    }
  },
  methods: {
    addComment() {
      this.$axios({
        method: 'POST',
        url: `articles/${this.article._id}/comments`,
        headers: {
          access_token: localStorage.getItem("access_token")
        },
        data: {
          comment: this.comment
        }
      })
        .then(({ data }) => {
          this.$emit('timeline-detail', this.article._id)
        })
        .catch(err => {
          console.log(err.response.data)
        })
        .finally(() => {
          this.comment = ''
        })
    },
    bookmark() {
      this.$emit('bookmark', this.article._id)
    },
  },
  mounted() {
    if (this.article.likes.includes(localStorage.getItem('id'))) {
      this.liked = true
    }
  }
}
</script>

<style>

</style>