import Vue from 'vue';
import App from './App.vue';
import wysiwyg from 'vue-wysiwyg'
import "vue-wysiwyg/dist/vueWysiwyg.css"
import GSignInButton from 'vue-google-signin-button'

Vue.use(GSignInButton)
Vue.use(wysiwyg, {
  maxHeight: "35vh"
})

new Vue({
  render: h => h(App),
}).$mount('#app');