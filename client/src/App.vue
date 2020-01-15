<template>
  <div>
    <TheNavbar
      :isLogin="isLogin"
    >
    </TheNavbar>
    <LoginForm
      v-if="!isLogin && page === 'login'"
      @changePage="changePage"
      @setIsLogin="setIsLogin"
      >
    </LoginForm>
    <RegisterForm
      v-if="!isLogin && page === 'register'"
      @changePage="changePage"
      >
    </RegisterForm>
    <MyPosts v-if="isLogin && page === 'myposts'"></MyPosts>
    <!-- <EditorForm v-if="isLogin && page === 'editor'"></EditorForm> -->
  </div>
</template>

<script>
import TheNavbar from './components/TheNavbar'
import EditorForm from './components/EditorForm'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import MyPosts from './components/MyPosts'
export default {
  name: 'app',
  components: {
    TheNavbar,
    LoginForm,
    RegisterForm,
    EditorForm,
    MyPosts
  },
  data () {
    return {
      isLogin: false,
      page: 'login'
    }
  },
  methods: {
    changePage(page) {
      this.page = page
    },
    setIsLogin(value) {
      this.isLogin = value
      this.page = 'myposts'
    }
  },
  created () {
    const access_token = localStorage.getItem('access_token')
    if (!access_token) {
      this.isLogin = false
    } else {
      this.isLogin = true
      this.page = 'myposts'
    }
  }
}
</script>

<style>
* {
  font-family: 'Lato', sans-serif;
}

</style>