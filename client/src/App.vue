<template>
  <div>
    <TheNavbar></TheNavbar>
    <LoginForm v-if="!isLogin && page === 'login'"></LoginForm>
    <RegisterForm v-if="!isLogin && page === 'register'" ></RegisterForm>
    <EditorForm v-if="isLogin && page === 'editor'"></EditorForm>
    <MyPostCards v-if="isLogin && page === 'myposts'"></PostCards>
  </div>
</template>

<script>
import TheNavbar from './components/TheNavbar'
import EditorForm from './components/EditorForm'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import PostCards from './components/PostCards'
export default {
  name: 'app',
  components: {
    TheNavbar,
    LoginForm,
    RegisterForm,
    EditorForm,
    PostCards
  },
  data () {
    return {
      isLogin: false,
      page: 'login'
    }
  },
  methods: {

  },
  created () {

  }
}
</script>

<style>
* {
  font-family: 'Lato', sans-serif;
}

</style>