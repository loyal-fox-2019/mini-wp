import Vue from 'vue';
import App from './App.vue';
import wysiwyg from 'vue-wysiwyg'
import "vue-wysiwyg/dist/vueWysiwyg.css";
Vue.config.productionTip = false
Vue.use(wysiwyg, {})
new Vue ({
    render: h =>h(App),
}).$mount('#app')