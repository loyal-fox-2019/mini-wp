<template>
  <!-- Container -->
<div class="container mb-8 p-4 md:p-0">
  
  <!-- Card wrapper -->
  <div class="shadow-lg flex flex-wrap">
    
    <!-- Card image -->
    <div class="rounded-lg bg-cover bg-bottom border w-full md:w-1/3 h-64 md:h-auto relative" :style='{ backgroundImage: "url(" + article.image + ")", }'>
      <div class="absolute text-xl">
        <svg v-if="!liked" @click="bookmark" class="fill-current text-yellow-400 hover:text-red-500 ml-2 mt-2 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"/></svg>
        <svg v-else-if="liked" @click="bookmark" class="fill-current text-red-500 hover:text-yellow-400 ml-2 mt-2 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"/></svg>
      </div>
    </div>
    <!-- ./Card image -->
    
    <!-- Card body -->
    <div class="rounded-lg bg-white w-full md:w-2/3">
      <!-- Card body - outer wrapper -->
      <div class="rounded-lg h-full mx-auto md:px-0 md:-ml-6 relative">
        <div class="text-right text-xs font">
            <a v-for="(tag, i) in article.tags" :key="i" class="rounded-lg bg-blue-600 text-white inline-block pr-2 pl-2">
              {{ tag }}
            </a>
          </div>
        <!-- Card body - inner wrapper -->
        <div class="rounded-lg bg-white lg:h-full p-6 -mt-6 md:mt-0 relative mb-4 md:mb-0 flex flex-wrap md:flex-wrap items-center">
          <!-- Card title and subtitle -->
          <div class="w-full lg:w-1/5 lg:border-right lg:border-solid text-center md:text-left">
            <h3>{{ article.title }}</h3>
            <p class="mb-0 mt-3 text-grey-dark text-sm italic">{{ article.author.name }}</p>
            <hr class="w-1/4 md:ml-0 mt-4  border lg:hidden">
          </div>
          <!-- ./Card title and subtitle -->
          
          <!-- Card description -->
          <div class="w-full lg:w-3/5 lg:px-3">
            <div v-html="article.content.substring(0, 200)" class="text-md mt-4 lg:mt-0 text-justify md:text-left text-sm">
            <!-- {{ article.content.substring(0, 200) }} -->
            </div>
          </div>
          <!-- ./Card description -->
          
          <!-- Call to action button -->
          <div class="w-full lg:w-1/5 mt-6 lg:mt-0 lg:px-4 text-center md:text-left">
            <button @click="toTimeline(article._id)" class="bg-white hover:bg-grey-darker hover:text-white rounded-lg border border-solid border-grey w-1/3 lg:w-full py-2">Detail</button>
          </div>
          <!-- ./Call to action button -->
        </div>
        <!-- ./Card body - inner wrapper -->
      </div>
      <!-- ./Card body - outer wrapper -->
    </div>
    <!-- ./Card body -->
  </div>
  <!-- ./Card wrapper -->
</div>
<!-- ./Container -->
</template>

<script>
export default {
  name: 'TimelineCard',
  props: {
    article: Object
  },
  data() {
    return {
      liked: false
    }
  },
  methods: {
    bookmark() {
      this.$emit('bookmark', this.article._id)
    },
    toTimeline(id) {
      this.$emit('timeline-detail', id)
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