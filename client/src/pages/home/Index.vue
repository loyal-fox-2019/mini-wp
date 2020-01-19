<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <b-navbar-brand href="#">Mini WP</b-navbar-brand>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <b-icon-list></b-icon-list>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                    <div>
                        <FormLogin @login='login'/>
                    </div>
                    <div>
                        <FormRegister @register='register' />
                    </div>
                </ul>
            </div>
        </nav>
    </div>
</template>
<script>
import FormLogin from "./components/FormLogin";
import FormRegister from "./components/FormRegister";
export default {
    name: 'Home',
    components: {
        FormRegister,
        FormLogin,
    },
    methods: {
        register(form) {
            this.$bvToast.toast(`Sign up in the proccess`, {
                title: 'Sign Up',
                autoHideDelay: 3000,
                variant: 'info',
                appendToast: false
            })
            console.log(form)
            this.axios
                .post('/auth/register', form)
                .then( ({data}) => {
                    console.log(data)
                    localStorage.setItem('mini.wp.token', data.token)
                    localStorage.setItem('mini.wp.msg', 'Sign Un successfully')
                    localStorage.setItem('mini.wp.username', form.username)
                    this.$router.push({ path: '/dashboard' })
                })
                .catch(({response}) => {
                    this.$bvToast.toast(`${response.data.message}`, {
                        title: 'Sign Un',
                        autoHideDelay: 3000,
                        variant: 'warning',
                        appendToast: true
                    })
                })
        },
        login(form){
            this.$bvToast.toast(`Signin in the proccess`, {
                title: 'Sign In',
                autoHideDelay: 1000,
                variant: 'info',
                appendToast: false
            })
            this.axios
                .post('/auth/login', form)
                .then( ({data}) => {
                    localStorage.setItem('mini.wp.token', data.token)
                    localStorage.setItem('mini.wp.msg', 'Sign In successfully')
                    localStorage.setItem('mini.wp.username', form.username)
                    this.$router.push({ path: '/dashboard' })
                })
                .catch(({response}) => {
                   this.$bvToast.toast(`${response.data.message}`, {
                        title: 'Sign In',
                        autoHideDelay: 3000,
                        variant: 'warning',
                        appendToast: true
                    })
                })
                
        }
    },
}
</script>