import Vue from 'vue';
import App from './App.vue';
import SuiVue from "semantic-ui-vue";
import GSignInButton from 'vue-google-signin-button';
import VueQuill from 'vue-quill';
import GAuth from 'vue-google-oauth2';
import CxltToastr from 'cxlt-vue2-toastr';
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css';
import VuejsDialog from 'vuejs-dialog';
import 'vuejs-dialog/dist/vuejs-dialog.min.css';


const googleClientId = '1077663190419-fkbutpat7sloejjac79gs8tnfa1bmi3k.apps.googleusercontent.com';

//config for logout
const gauthOption = {
    clientId: googleClientId
};

Vue.prototype.$googleId = googleClientId;

const toastrConfigs = {
    position: 'top right',
    showDuration: 1
};

Vue.use(VuejsDialog, {
    animation: 'fade',
    okText: 'OK',
    cancelText: 'Cancel',
    loader: true,
    html: true
});
Vue.use(CxltToastr, toastrConfigs);
Vue.use(GAuth, gauthOption);
Vue.use(SuiVue);
Vue.use(GSignInButton);
Vue.use(VueQuill);

new Vue({
    render: h => h(App),
}).$mount('#app');