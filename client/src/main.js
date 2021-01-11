import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './css/quill.snow.css'
import './css/tailwind.css'
import babelPolyfill from 'babel-polyfill'

import wysiwyg from "vue-wysiwyg";
import 'vue-wysiwyg/dist/vueWysiwyg.css'
Vue.use(wysiwyg, {
   image: {
      uploadURL: "http://localhost:3000/imgUpload",
      dropzoneOptions: {}
   },

   // limit content height if you wish. If not set, editor size will grow with content.
   maxHeight: "500px"
})

const app = new Vue({
   router,
   render: h => h(App)
}).$mount('#app')