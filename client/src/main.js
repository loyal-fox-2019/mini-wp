import Vue from 'vue'
import App from './App.vue'
import  BootstrapVue from 'bootstrap-vue'
import wysiwyg from "vue-wysiwyg"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'



library.add(faUserSecret)
library.add(faEdit)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(wysiwyg, {maxHeight: "200px"})



new Vue({
    render: h=>h(App),
}).$mount('#app')



