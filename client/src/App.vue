<template>
  <div class="background-home">
    <div class="dark-cover">
      <Navbar
        :username="username"
        @updateUserStatus="updateUserSession"
      ></Navbar>
      <transition name="fade" mode="out-in">
        <router-view
          class="custom-router-view"
          @updateUserStatus="updateUserSession"
          @newArticle="pushNewArticle"
          @updateArticleList="fetchUserArticles"
          :userArticles="userArticles"
        ></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import api from './api'
import errorHandler from './helpers/error-handler.js'
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  data() {
    return {
      username: '',
      userArticles: [],
    }
  },
  components: {
    Navbar,
  },
  methods: {
    updateUserSession(payload) {
      if (payload.type === 'login') {
        localStorage.setItem('token', payload.token)
        localStorage.setItem('username', payload.username)
        this.username = payload.username
        this.fetchUserArticles()
      } else {
        localStorage.clear()
        this.username = ''
        this.userArticles = []
      }
    },
    fetchUserArticles() {
      this.$swal.fire({
        title: 'Fetching your article...',
        onBeforeOpen: () => {
          this.$swal.showLoading()
        },
      })

      api
        .get('/users/articles', {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(({ data }) => {
          this.$swal.close()
          this.userArticles = data.articles
        })
        .catch(err => {
          this.$swal.close()
          const self = this
          errorHandler(err, self)
        })
    },
    pushNewArticle(payload) {
      this.userArticles.unshift(payload)
    },
  },
  created() {
    if (localStorage.getItem('token')) {
      this.username = localStorage.getItem('username')
      this.$router.push('/user/all-articles')
      this.fetchUserArticles()
    }
    if (window.location.search) {
      console.log(window.location.search)
      window.location.href = `http://localhost:8080/#/callback-github?code=${
        window.location.search.split('=')[1]
      }`
    } else {
      console.log(window.location)
    }
  },
}
</script>

<style scoped>
.background-home {
  background: url(/src/assets/photo-home.jpg);
  background-size: cover;
  height: 100vh;
}

.dark-cover {
  background: rgb(0, 0, 0, 0.2);
  position: absolute;
  height: 100vh;
  width: 100vw;
}

.custom-router-view {
  height: 89.6%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0.3;
}
</style>
