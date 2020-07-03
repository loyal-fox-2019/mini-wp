<template>
  <div class="content max-w-4xl mx-auto">
 <header class="text-center">
    <h1 class="text-4xl md:text-5xl font-semibold">{{ article.title }}</h1>
    <div class="px-6 py-4">
      <span v-for="(tag, i) in article.tags" :key="i" class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 cursor-pointer select-none">{{ tag }}</span>
    </div>
    <!-- <h3 class="text-xl md:text-xl mb-4">{{ article.author }}</h3> -->
    <div class="text-center">
    <button @click="edit" class="bg-blue-400 hover:bg-blue-600 rounded-lg border text-white font-bold py-2 px-4 rounded ml-4 shadow">Edit</button>
    <button @click="remove" class="bg-blue-400 hover:bg-blue-600 rounded-lg border text-white font-bold py-2 px-4 rounded ml-4 shadow">Delete</button>
    <button @click="print" class="bg-blue-400 hover:bg-blue-600 rounded-lg border text-white font-bold py-2 px-4 rounded ml-4 shadow">Print</button>
    <!-- <div class="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button" data-size="large"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Share</a></div> -->
    <!-- <button @click="remove" class="bg-grey-300 border font-bold py-2 px-4 rounded ml-4 shadow">Share</button> -->
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



  </div>
</template>

<script>
import jspdf from 'jspdf'

export default {
  name: 'ArticleDetail',
  props: {
    article: Object
  },
  data() {
    return {
      
    }
  },
  methods: {
    remove() {
      this.$emit('remove', this.article._id)
    },
    edit() {
      this.$emit('edit', this.article._id)
    },
    print() {
      const doc = new jspdf();
      doc.fromHTML(this.article.content, 10, 10, {
        'width': 100,
      }, function(bla) {
        doc.save('result.pdf')
      });
    }
  }
}
</script>

<style>

</style>