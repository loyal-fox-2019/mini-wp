import Vue from 'vue'
import App from './app.vue'
import VueCookies from 'vue-cookies';
Vue.use(VueCookies);

// expire after 7 days
Vue.$cookies.config('7d');

new Vue({
    render: h => h(App),
}).$mount('#app');