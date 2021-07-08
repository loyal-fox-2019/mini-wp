import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Fragment from 'vue-fragment'
import VueSweetalert2 from 'vue-sweetalert2'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Fragment.Plugin)
Vue.use(VueSweetalert2)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'sweetalert2/dist/sweetalert2.min.css'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
