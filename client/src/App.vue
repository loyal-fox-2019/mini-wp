<template>
    <div>
        <navBar v-bind:email="email"></navBar>
        <div class="container-fluid" id="containerFluid">
            <ContentPage @signOut='signOut' v-if="isLogin"></ContentPage>
            <signInUp @afterLogin="isLogin=true" @email="getEmail($event)" v-if="!isLogin" ></signInUp>
        </div>
    </div>    
</template>

<script>
import navBar from './components/navBar.vue';
import signInUp from './views/signInUpPage.vue';
import ContentPage from './views/ContentPage.vue';

export default {
    components: {
        navBar,
        signInUp,
        ContentPage,
    },
    data() {
        return {
            page: '',
            email: '',
            isLogin: false,
        }
    },
    mounted() {
        if(!localStorage.getItem('token')) {
            this.isLogin = false;
        } else {
            this.isLogin = true;
        }
    },
    methods:{
        signOut() {
            this.isLogin = false;
        },
        getEmail(email) {
            this.email = email;
        }
    }
}
</script>

<style>
#containerFluid {
    padding-top: 50px;
}

</style>