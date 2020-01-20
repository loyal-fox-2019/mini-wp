<template>
  <div class="container mx-auto">
        <nav class="flex py-8 pb-6 border-b-2 border-gray-300 mb-8">
          <div class="flex w-full items-center">

            <div class="w-1/5 flex items-center mb-4 md:mb-0 mr-20">
              <svg xmlns="http://www.w3.org/2000/svg" class="fill-current mr-8 text-blue-600" width="60" height="60" viewBox="0 0 24 24"><path d="M12 5.321c-3.683 0-6.679 2.997-6.679 6.679 0 3.683 2.996 6.68 6.679 6.68s6.679-2.997 6.679-6.68-2.996-6.679-6.679-6.679zm-6.005 6.679c0-.87.188-1.697.52-2.444l2.865 7.849c-2.004-.974-3.385-3.028-3.385-5.405zm6.005 6.005c-.59 0-1.158-.086-1.696-.244l1.802-5.236c.033.09 1.839 5.059 1.889 5.14-.624.219-1.296.34-1.995.34zm.828-8.82c.361-.02.687-.058.687-.058.324-.038.286-.514-.038-.495-1.274.1-1.892.1-3.182 0-.323-.019-.362.476-.038.495 0 0 .306.038.63.058l.936 2.563-1.314 3.941-2.189-6.504c.362-.02.688-.058.688-.058.323-.038.285-.514-.038-.495-1.118.088-1.622.081-1.988.069 1.075-1.63 2.92-2.706 5.018-2.706 1.563 0 2.987.597 4.056 1.577-.651-.036-1.087.49-1.087 1.061 0 .495.286.914.59 1.409.229.4.495.914.495 1.656 0 .513-.197 1.11-.456 1.941l-.6 2.001-2.17-6.455zm4.442-.066c.469.855.736 1.837.736 2.88 0 2.216-1.202 4.15-2.987 5.191l1.835-5.303c.358-.897.546-1.805.416-2.768zm-5.27-9.119c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 19c-3.859 0-7-3.14-7-7s3.141-7 7-7 7 3.14 7 7-3.141 7-7 7z"/></svg>
              <!-- <img src="../assets/wp-logo.svg" class="w-10 mr-4"> -->
              <h1 class="leading-none text-l">
                <a class="no-underline" href="#">
                  {{ userName }}'s Blog
                </a>
              </h1>

            </div>
            <div class="w-2/5 flex items-center">
              <label class="hidden" for="search-form">Search by tag</label>
                <input @keyup.enter.prevent="search" v-model="keyword" class="bg-gray-100 border-2 focus:border-yellow-200 p-1 rounded-lg shadow-inner w-full" placeholder="Search" type="text">
                <button class="hidden">Submit</button>
            </div>
            <div class="flex w-2/5 justify-end">
              <span class="pr-2">
                  <img class="rounded-full border w-10 h-10" :src="userImage" alt="Username" />
                </span>
                <div class="dropdown inline-block relative">
                <button class="relative z-10 block overflow-hidden focus:outline-none text-sm leading-loose cursor-pointer text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center" @click="isOpen = !isOpen">
                  <span class="mr-1">Hi, {{ userName.split(' ')[0] }}</span>
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> </svg>
                </button>
                <button v-if="isOpen" @click="isOpen = false" tabindex="-1" class="fixed top-0 inset-0 h-full w-full bg-black opacity-0 cursor-default"></button>
                <div v-if="isOpen" class="dropdown-menu absolute hidden w-48 py-2 rounded-lg border-gray-900 bg-white shadow-xl">
                    <a href="" class="text-sm text-gray-900 hover:bg-blue-600 hover:text-white block px-4 py-2 cursor-pointer">Profile</a>
                    <a @click.prevent="signOut" class="text-sm text-gray-900 hover:bg-blue-600 hover:text-white block px-4 py-2 cursor-pointer">Sign Out</a>
                  </div>
              </div>
            </div>
          </div>
        </nav>
        <!-- SIDEBAR -->
        <div class="flex">
          <div class="flex justify-center">
            <nav id="nav" class="w-56 relative">
              <span
                class="absolute h-10 w-full bg-white rounded-lg shadow ease-out transition-transform transition-medium"
                :style="{ transform: `translateY(calc(100% * ${selected}))` }"
              ></span>
              <ul class="relative">
                <li>
                  <button
                    type="button"
                    @click="select(0); toHome();"
                    :aria-selected="selected === 0"
                    class="py-2 px-3 w-full flex items-center focus:outline-none focus-visible:underline"
                  >
                    <svg
                      :class="selected === 0 ? 'text-blue-400' : 'text-gray-500'"
                      class="h-6 w-6 transition-all ease-out transition-medium"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12.707 2.293a1 1 0 00-1.414 0l-9 9a1 1 0 101.414 1.414L4 12.414V21a1 1 0 001 1h5a1 1 0 001-1v-6h2v6a1 1 0 001 1h5a1 1 0 001-1v-8.586l.293.293a1 1 0 001.414-1.414l-9-9zM18 10.414l-6-6-6 6V20h3v-6a1 1 0 011-1h4a1 1 0 011 1v6h3v-9.586z"
                      />
                    </svg>
                    <span
                      :class="selected === 0 ? 'text-blue-600' : 'text-gray-700'"
                      class="ml-2 text-sm font-medium transition-all ease-out transition-medium"
                    >
                      Home
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    @click="select(1); toAddArticle();"
                    :aria-selected="selected === 1"
                    class="py-2 px-3 w-full flex items-center focus:outline-none focus-visible:underline"
                  >
                  <svg :class="selected === 1 ? 'text-blue-400' : 'text-gray-500'"
                      class="h-6 w-6 transition-all ease-out transition-medium"
                      fill="currentColor" 
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z"/></svg>
                    <span
                      :class="selected === 1 ? 'text-blue-600' : 'text-gray-700'"
                      class="ml-2 text-sm font-medium transition-all ease-out transition-medium"
                    >
                      Post
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    @click="select(2); toAnalytics();"
                    :aria-selected="selected === 2"
                    class="py-2 px-3 w-full flex items-center focus:outline-none focus-visible:underline"
                  >
                  <svg :class="selected === 2 ? 'text-blue-400' : 'text-gray-500'"
                      class="h-6 w-6 transition-all ease-out transition-medium"
                      fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 9v8h-2v-8h2zm2-2h-6v12h6v-12zm6-4v14h-2v-14h2zm2-2h-6v18h6v-18zm6 13v3h-2v-3h2zm2-2h-6v7h6v-7zm1 9h-24v2h24v-2z"/></svg>
                    <span
                      :class="selected === 2 ? 'text-blue-600' : 'text-gray-700'"
                      class="ml-2 text-sm font-medium transition-all ease-out transition-medium"
                    >
                      Analytics
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    @click="select(3); toTimeline();"
                    :aria-selected="selected === 3"
                    class="py-2 px-3 w-full flex items-center focus:outline-none focus-visible:underline"
                  >
                    <svg
                      :class="selected === 3 ? 'text-blue-400' : 'text-gray-500'"
                      class="h-6 w-6 transition-all ease-out transition-medium"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7 10a3 3 0 013-3h8a3 3 0 013 3v8a3 3 0 01-3 3h-8a3 3 0 01-3-3v-8zm3-1a1 1 0 00-1 1v8a1 1 0 001 1h8a1 1 0 001-1v-8a1 1 0 00-1-1h-8z"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M3 6a3 3 0 013-3h10a1 1 0 110 2H6a1 1 0 00-1 1v10a1 1 0 11-2 0V6z"
                      />
                    </svg>
                    <span
                      :class="selected === 3 ? 'text-blue-600' : 'text-gray-700'"
                      class="ml-2 text-sm font-medium transition-all ease-out transition-medium"
                    >
                      Timeline
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    @click="select(4); toBookmarks();"
                    :aria-selected="selected === 4"
                    class="py-2 px-3 w-full flex items-center focus:outline-none focus-visible:underline"
                  >
                    <svg
                      :class="selected === 4 ? 'text-blue-400' : 'text-gray-500'"
                      class="h-6 w-6 transition-all ease-out transition-medium"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4 5a3 3 0 013-3h10a3 3 0 013 3v16a1 1 0 01-1.447.894L12 18.618l-6.553 3.276A1 1 0 014 21V5zm3-1a1 1 0 00-1 1v14.382l5.553-2.776a1 1 0 01.894 0L18 19.382V5a1 1 0 00-1-1H7z"
                      />
                    </svg>
                    <span
                      :class="selected === 4 ? 'text-blue-600' : 'text-gray-700'"
                      class="ml-2 text-sm font-medium transition-all ease-out transition-medium"
                    >
                      Bookmarks
                    </span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          
          <!-- CONTENT -->
          <div class="rounded-lg w-4/5 bg-white shadow border-t-4 border-blue-600">
            <div class="rounded-lg py-4 px-6 border-b border-gray-400">
              <h1 class="text-lg font-semibold uppercase">{{ title }}</h1>
            </div> 
            <div class="rounded-lg p-6">
              <!-- MAIN CONTAINER IS HERE -->
              <ArticleForm @my-detail="toShowArticle"
                           v-if="page == 'add'" />
              <ArticleCard @my-detail="toShowArticle" 
                           v-else-if="page == 'home'"
                           v-for="(article, i) in articles"
                           :key="i"
                           :article="article"/>
              <TimelineCard @timeline-detail="toTimelineDetail"
                            @bookmark="bookmark"
                            v-else-if="page == 'timeline'"
                            v-for="(article, i) in allArticles"
                            :key="i"
                            :article="article"/>
              <ArticleDetail @remove="deleteArticle"
                             @edit="toEditArticle"
                             v-else-if="page == 'article'"
                             :article="article" />
              <EditorForm @my-detail="toShowArticle"
                          v-else-if="page == 'edit'"
                          :article="article" />
              <Bookmarks @timeline-detail="toTimelineDetail"
                         @unbookmark="bookmark"
                         v-else-if="page == 'bookmarks'"
                         v-for="(article, i) in bookmarks"
                         :key="i"
                         :article="article"/>
              <TimelineDetail v-else-if="page == 'timelineDetail'"
                              @timeline-detail="toTimelineDetail"
                              @bookmark="bookmark"
                              :article="article"/>
              <AnalyticsChart v-else-if="page == 'analytics'"
                              :chartdata="chartdata"
                              :options="options"/>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
import ArticleForm from '../components/ArticleForm'
import ArticleCard from '../components/ArticleCard'
import TimelineCard from '../components/TimelineCard'
import ArticleDetail from '../components/ArticleDetail'
import EditorForm from '../components/EditorForm'
import Bookmarks from '../components/Bookmarks'
import TimelineDetail from '../components/TimelineDetail'
import AnalyticsChart from './AnalyticsChart'

export default {
  name: "HomePage",
  data() {
    return {
      isOpen: false,
      userName: '',
      userImage: '',
      title: 'My Articles',
      page: 'home',
      selected: 0,
      articles: [],
      allArticles: [],
      bookmarks: [],
      article: {},
      keyword: '',
      options: {
        responsive: true,
        maintainAspectRatio: false
      },
      chartdata: {}
    }
  },
  components: {
    ArticleForm,
    ArticleCard,
    TimelineCard,
    ArticleDetail,
    EditorForm,
    Bookmarks,
    TimelineDetail,
    AnalyticsChart
  },
  methods: {
    signOut() {
      localStorage.removeItem('access_token')
      localStorage.removeItem('image')
      localStorage.removeItem('name')
      localStorage.removeItem('id')
      Swal.fire({
        title: 'Success!',
        text: 'Successfully signed out!',
        icon: 'success',
        confirmButtonText: 'Close'
      })
      this.$emit('checkUser')
    },
    toShowArticle(id) {
      this.$axios.get(`articles/${id}`,
        {headers: {access_token: localStorage.getItem("access_token")}}
      )
        .then(({ data }) => {
          this.article = data
        })
        .catch(err => {
          console.log(err)
        })
      this.title = 'Article'
      this.page = 'article'
    },
    toHome() {
      this.fetchArticles()
      this.title = 'My Articles'
      this.page = 'home'
      this.selected = 0
    },
    toEditArticle(id) {
      this.$axios.get(`articles/${id}`,
        {headers: {access_token: localStorage.getItem("access_token")}}
      )
        .then(({ data }) => {
          this.article = data
        })
        .catch(err => {
          console.log(err)
        })
      this.title = 'Edit Article'
      this.page = 'edit'
    },
    toAddArticle() {
      this.title = 'Create Article'
      this.page = 'add'
      this.selected = 1
    },
    toAnalytics() {
      this.title = 'Analytics'
      this.page = 'analytics'
      this.selected = 2
    },
    toTimeline() {
      this.fetchAllArticles()
      this.title = 'Timeline'
      this.page = 'timeline'
      this.selected = 3
    },
    toTimelineDetail(id) {
      this.$axios.get(`articles/${id}`,
        {headers: {access_token: localStorage.getItem("access_token")}}
      )
        .then(({ data }) => {
          this.article = data
        })
        .catch(err => {
          console.log(err)
        })
      this.title = 'Article'
      this.page = 'timelineDetail'
    },
    toProfile() {
      this.page = 'profile'
    },
    toBookmarks() {
      this.fetchBookmarks()
      this.page = 'bookmarks'
      this.title = 'Bookmarks'
      this.selected = 4
    },
    select(i) {
      this.selected = i;
    },
    fetchArticles() {
      this.$axios.get('articles/all/own',
        {headers: {access_token: localStorage.getItem("access_token")}}
      )
        .then(({ data }) => {
          this.articles = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchBookmarks() {
      this.$axios.get('articles/all/bookmarks',
        {headers: {access_token: localStorage.getItem("access_token")}}
      )
        .then(({ data }) => {
          this.bookmarks = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchAllArticles() {
      this.$axios.get('articles',
        {headers: {access_token: localStorage.getItem("access_token")}}
      )
        .then(({ data }) => {
          this.allArticles = data
        })
        .catch(err => {
        //   if (err.status === 403) {
        //     localStorage.removeItem('access_token')
        //     this.$emit('checkUser')
        //   }
          console.log(err)
        })
    },
    deleteArticle(id) {
      this.$axios.delete(`articles/${id}`,
        {headers: {access_token: localStorage.getItem("access_token")}}
      )
        .then(({ data }) => {
          this.fetchArticles()
          this.toHome()
          Swal.fire({
            title: 'Success!',
            text: `Article with ID ${id} successfully deleted!`,
            icon: 'success',
            confirmButtonText: 'Close'
          })
        })
        .catch(err => {
          Swal.fire({
            title: 'Error!',
            text: err,
            icon: 'error',
            confirmButtonText: 'Close'
          })
        })
    },
    bookmark(id) {
      this.$axios({
        method: 'PATCH',
        url: `articles/${id}/likes`,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(({ data }) => {
          this.fetchBookmarks()
          this.toBookmarks()
          // Swal.fire({
          //   title: 'Success!',
          //   text: `Article with ID ${id} successfully deleted!`,
          //   icon: 'success',
          //   confirmButtonText: 'Close'
          // })
        })
        .catch(err => {
          Swal.fire({
            title: 'Error!',
            text: err,
            icon: 'error',
            confirmButtonText: 'Close'
          })
        })
    },
    search() {
      console.log(this.keyword)
      this.$axios.get(`articles/filter/${this.keyword}`,
        {headers: {access_token: localStorage.getItem("access_token")}}
      )
        .then(({ data }) => {
          this.allArticles = data
          this.title = 'Timeline'
          this.page = 'timeline'
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.keyword = ''
        })
    },
    getChartData() {
      this.chartdata = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'Likes',
            backgroundColor: '#f87979',
            data: [15, 25, 17, 20]
          },
          {
            label: 'Comments',
            backgroundColor: '#3ba2eb',
            data: [10, 20, 15, 6]
          },
          {
            label: 'Tags',
            backgroundColor: '#face56',
            data: [3, 15, 10, 7]
          }
        ]
      }
    }
  },
  mounted(){
    this.userName = localStorage.getItem('name')
    this.userImage = localStorage.getItem('image')
    this.fetchArticles()
    this.fetchAllArticles()
    this.getChartData()
  }
}
</script>

<style scoped>
.dropdown:hover .dropdown-menu {
  display: block;
}

.ease-in {
  transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
}
.ease-out {
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
}
.ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.transition-fastest {
  transition-duration: 75ms;
}
.transition-faster {
  transition-duration: 100ms;
}
.transition-fast {
  transition-duration: 150ms;
}
.transition-medium {
  transition-duration: 200ms;
}
.transition-slow {
  transition-duration: 300ms;
}
.transition-slower {
  transition-duration: 500ms;
}
.transition-slowest {
  transition-duration: 700ms;
}
.transition-all {
  transition-property: all;
}
.transition-opacity {
  transition-property: opacity;
}
.transition-transform {
  transition-property: transform;
}

.focus-visible.focus-visible\:underline {
  text-decoration: underline;
}

</style>