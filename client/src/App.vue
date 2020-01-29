<template>
<div>
     <div v-if="!isLogin">
         <FrontPage></FrontPage>
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
            isLogin: false
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
                this.isLogin = true
            })
            .catch(error => {
                this.error = error.response.data.message
            })
        }
        else{
            this.loginStatus = false
        }
    }
}
</script>