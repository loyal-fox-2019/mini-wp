import Vue from "vue";
import Router from "vue-router";
import Header from './views/components/Header.vue';
// import Footer from './views/components/Footer.vue';
import Index from './views/Index.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';


Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "index",
            components: { default: Index, header: Header },
        },
        {
            path: "/login",
            name: "login",
            components: { default: Login }
        },
        {
            path: "/register",
            name: "register",
            components: { default: Register }
        }
    ]
});