import Vue from "vue"
import App from "./App.vue";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap";
import "bootstrap-vue/dist/bootstrap-vue";
import wysiwyg from "vue-wysiwyg";
import jquery from "jquery";
import vueMoment from "vue-moment"
import axios from "axios"

Vue.use(wysiwyg, {
  maxHeight: "130px",
  forcePlainTextOnPaste: true,
  image: {
    uploadURL: "http://localhost:3000/articles/image"
  }
});
import "vue-wysiwyg/dist/vueWysiwyg.css";

Vue.use(BootstrapVue)
Vue.use(jquery)
Vue.use(vueMoment)

new Vue({
    render : h => h(App)
}).$mount('#app')
