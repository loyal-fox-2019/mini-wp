<template>
  <div id="leandingPage" class="d-flex bd-highlight">
    <div class="w-70 bd-highlight">
      <div class="bottom-right"><i class="fas fa-hat-wizard mr-2"></i> <label> Mini Worpress </label></div>
      <div class="bottom-right2"> <label class="copy"> Portfolio project by Brahmantya S </label></div>
      <img src="../assets/login-register.png" alt="loading ...">
    </div>
    <div class="w-30 d-flex justify-content-center bd-highlight align-items-center">
      <Form @loginStatus="status" />
    </div>
  </div>
</template>

<script>
import Form from '../components/LoginForm'

export default {
  components: {
    Form
  }, 
  methods: {
    status(status) {
      this.$emit('loginStatus', status)
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');

#leandingPage {
  height: 100vh;
  width: 100vw;
}

.w-70 {
  object-fit: cover;
  width: 70% !important;
  overflow: hidden;
  position: relative;
  text-align: center;
}

.w-30 {
  width: 30% !important
}

.bottom-right {
  position: absolute;
  bottom: 3rem;
  left: 3rem;
}

.bottom-right2 {
  position: absolute;
  bottom: 2rem;
  left: 6.85rem;
}

img {
  height: 100%;
  object-fit: cover;
}

label {
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  color: white;
  font-size: 2rem
}

.copy {
  font-size: 1rem
}

.fas {
  font-weight: bold;
  color: white;
  font-size: 3rem

}
</style>
