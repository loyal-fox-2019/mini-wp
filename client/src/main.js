import Vue from 'vue'
import App from './App.vue'
import VueQuill from 'vue-quill'
import './css/quill.snow.css'
import './css/tailwind.css'

App.use(VueQuill)

const app = new Vue({
   render: h => h(app)
}).$mount('#app')