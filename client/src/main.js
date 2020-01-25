'use strict';

import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import wysiwyg from 'vue-wysiwyg';
import 'vue-wysiwyg/dist/vueWysiwyg.css';
// import Swal from 'sweetalert2';
// import 'sweetalert2/src/sweetalert2.scss';

// Vue.use(Swal);
Vue.use(wysiwyg, {});
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.prototype.$axios = axios;

new Vue({
	render : (h) => h(App)
}).$mount('#app');
