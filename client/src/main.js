import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue';

Vue.use(BootstrapVue)
Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
  render: h => h(App)
}).$mount('#app')