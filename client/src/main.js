import Vue from 'vue'
import App from './app.vue'
import VueCookies from 'vue-cookies';
import GSignInButton from 'vue-google-signin-button'
Vue.use(GSignInButton)
Vue.use(VueCookies);

// expire after 7 days
Vue.$cookies.config('7d');

new Vue({
    render: h => h(App),
}).$mount('#app');