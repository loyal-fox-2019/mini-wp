<template>
  <div class="background-home">
    <div class="dark-cover">
      <Navbar :username="username" @updateUserStatus="updateUserSession"></Navbar>
      <transition name="fade" mode="out-in">
        <router-view class="custom-router-view" @updateUserStatus="updateUserSession"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  data() {
    return {
      username: '',
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
      } else {
        localStorage.clear()
        this.username = ''
      }
    }
  },
  created() {
    if (localStorage.getItem('token')) {
      this.username = localStorage.getItem('username')
    }
  }
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
