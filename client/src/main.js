import Vue from 'vue'
import App from './App.vue'
import axios from './axios.config'
import VueQuillEditor from "vue-quill-editor";
import "quill/dist/quill.snow.css";
import GSignInButton from 'vue-google-signin-button'

Vue.prototype.$axios = axios

Vue.use(GSignInButton)
Vue.use(VueQuillEditor);

new Vue({
  render: h => h(App),
}).$mount('#app');