<template>
<div>
     <div v-if="!statusLogin">
         <FrontPage v-on:isLogins="isLogin" v-on:userData="userData"></FrontPage>
    </div>
    <div v-else>
        <MainPage></MainPage>
    </div>        
</div>
</template>
<script>
import FrontPage from './view/FrontPage'
import MainPage from './view/MainPage'

export default {
    data(){
        return{
            statusLogin: false,
            user: null
        }
    },
    methods:{
        isLogin(payload){
            this.statusLogin = payload
        },
        userData(payload){
            console.log(payload)
            localStorage.setItem('id', payload.id)
            localStorage.setItem('name', payload.name)
        }
    },
    components: {
        FrontPage,
        MainPage
    },
    created() {  
        if(localStorage.getItem("token")){
            axios.get('http://localhost:3000/miniwp/article',{
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            .then(response => {
                this.statusLogin = true
            })
            .catch(error => {
                this.error = error.response.data.message
            })
        }
        else{
            this.statusLogin = false
        }
    }
}
</script>