<template>
  <div>
    <TheNavbar></TheNavbar>
    <LoginForm></LoginForm>
    <RegisterForm></RegisterForm>
    <EditorForm></EditorForm>
    <PostCards></PostCards>
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