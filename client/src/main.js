import Vue from 'vue';
import App from './App.vue';
import SuiVue from "semantic-ui-vue";
import GSignInButton from 'vue-google-signin-button';
import VueQuill from 'vue-quill';
import GAuth from 'vue-google-oauth2';

const googleClientIdProd = '1077663190419-3fl32g86v8evqq5ud7ivlusngc81k965.apps.googleusercontent.com';
const googleClientIdDev = '1077663190419-fkbutpat7sloejjac79gs8tnfa1bmi3k.apps.googleusercontent.com';

const gauthOption = {
    clientId: googleClientIdDev
};

Vue.prototype.$googleId = googleClientIdDev;
Vue.use(GAuth, gauthOption);
Vue.use(SuiVue);
Vue.use(GSignInButton);
Vue.use(VueQuill);

new Vue({
    render: h => h(App),
}).$mount('#app');