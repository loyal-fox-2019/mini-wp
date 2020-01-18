import Vue from 'vue'
import VueAxios from 'vue-axios'
import App from './App.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2';
import mixin from './config/mixin'
import axios from './config/axios'
import SuiVue from 'semantic-ui-vue';
import router from './config/router'
// If you don't need the styles, do not connect, // vue-trumbowyg/ankurk91
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'sweetalert2/dist/sweetalert2.min.css';


Vue.use(VueSweetalert2);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueAxios, axios)
Vue.use(SuiVue)

new Vue({
    mixins: [mixin],
    router,
    render: h => h(App),
}).$mount('#app')