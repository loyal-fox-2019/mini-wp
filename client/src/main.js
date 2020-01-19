import Vue from 'vue';
import App from './App.vue';
import bootstrapVue from 'bootstrap-vue';
import wysiwyg from "vue-wysiwyg";

import 'bootstrap/dist/css/bootstrap.css'
import 'sweetalert2/dist/sweetalert2.min.css';
import "vue-wysiwyg/dist/vueWysiwyg.css";

Vue.use(bootstrapVue);
Vue.use(wysiwyg, {}); 

new Vue({
    render: h => h (App)
}).$mount('#app')


