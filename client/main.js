import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import GSignInButton from 'vue-google-signin-button';

import App from './App.vue';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(GSignInButton);

new Vue({
  render: h => h(App)
}).$mount('#app');
