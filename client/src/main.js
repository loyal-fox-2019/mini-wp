import Vue from 'vue'
import VueAxios from 'vue-axios'
import App from './App.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2';
import mixin from './config/mixin'
import axios from './config/axios'
import SuiVue from 'semantic-ui-vue';
import router from './config/router'
import GAuth from 'vue-google-oauth2'
// If you don't need the styles, do not connect, // vue-trumbowyg/ankurk91
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'sweetalert2/dist/sweetalert2.min.css';
import 'semantic-ui-css/semantic.min.css';


const gauthOption = {
  clientId: '135275767764-8v6d03qgam3pg4j77msdftti1nk0nd9l.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}

Vue.use(GAuth, gauthOption)
Vue.use(VueSweetalert2);
Vue.use(SuiVue)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueAxios, axios)

new Vue({
    mixins: [mixin],
    router,
    render: h => h(App),
}).$mount('#app')