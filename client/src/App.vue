<template>
  <div>
    <TheNavbar
      :isLogin="isLogin"
      @changePage="changePage"
    >
    </TheNavbar>
    <LoginForm
      v-if="!isLogin && page === 'login'"
      @changePage="changePage"
      @setIsLogin="setIsLogin">
    </LoginForm>
    <RegisterForm
      v-if="!isLogin && page === 'register'"
      @changePage="changePage">
    </RegisterForm>
    <MyPosts
      v-if="isLogin && page === 'myposts'"
      @singlePost="toSinglePost"
      @toEditor="toEditor">

    </MyPosts>
    <EditorForm
      :articleId="articleId"
      @changePage="changePage"
      v-if="isLogin && page === 'editor'">
    </EditorForm>
    <SinglePost
      :articleId="articleId"
      v-if="isLogin && page === 'post'">
    </SinglePost>
  </div>
</template>

<script>
import TheNavbar from './components/TheNavbar'
import EditorForm from './components/EditorForm'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import MyPosts from './components/MyPosts'
import SinglePost from './components/SinglePost'
export default {
  name: 'app',
  components: {
    TheNavbar,
    LoginForm,
    RegisterForm,
    EditorForm,
    MyPosts,
    SinglePost
  },
  data () {
    return {
      isLogin: false,
      page: 'login',
      articleId: null
    }
  },
  methods: {
    changePage(page) {
      this.page = page
    },
    setCurrentArticleId(id) {
      this.articleId = id
    },
    setIsLogin(value) {
      this.isLogin = value
      this.page = 'myposts'
    },
    toSinglePost(articleId) {
      this.page = 'post'
      this.articleId = articleId
    },
    toEditor(articleId) {
      this.page = 'editor'
      this.articleId = articleId
    }
  },
  created () {
    const access_token = localStorage.getItem('access_token')
    if (!access_token) {
      this.isLogin = false
    } else {
      this.isLogin = true
      this.page = 'myposts'
      this.articleId = null
    }
  }
}
</script>

<style>
* {
  font-family: 'Lato', sans-serif;
}

</style>