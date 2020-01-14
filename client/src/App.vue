<template>
  <div>
    <registerView v-show="!isLogin"></registerView>
    <homeView v-show="isLogin"></homeView>
  </div>
</template>

<script>
import registerView from './views/registerView'
import homeView from './views/homeView'

export default {
  data() {
    return {
      isLogin: true
    };
  },
  components: {
      registerView,
      homeView
    }
};

</script>

<style>
  * {
    font-family: 'Roboto', Arial, Helvetica;
    color: #4a4c57;
  }
  .input-group-text {
    width: 40px;
    justify-content: center;
  }
  a, a span {
    color: #ff43f6 !important;
  }
  a:hover, a span:hover {
    transition: 1s color;
    color: #a462ca !important;
  }
  input[type="text"]:hover, input[type="password"]:hover {
    border-color: #ff43f6;
    box-shadow: 0 0 0 3px rgba(255, 67, 246, 0.5);
    outline: 0 none;
  }
  input[type="text"]:focus, input[type="password"]:focus {
    border-color: #a462ca;
    box-shadow: 0 0 0 3px rgba(164, 98, 202, 0.5);
    outline: 0 none;
  }
  .btn-custom {
    border: none;
    color: #fff !important;
    background: linear-gradient(45deg,#ff43f6,#a462ca) !important;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  }
  .btn-custom:hover {
    transition: 0.4s all;
    color: #2e2f35 !important;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  }
  .header-font {
    font-family: 'Fugaz One', cursive;
  }
</style>