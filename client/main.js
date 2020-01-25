var app = new Vue({
    el: '#app',
    data: {
        loginStatus: false,
        register: false,
        name:null,
        email: null,
        password: null,
        error: null,
        newArticle: false,
        article: [] 
    },
    methods: {
        btnLoginRegister(){
            if(!this.register) {
                this.register = true
            }
            else{
                this.register = false    
            }
        },
        login() {
            axios.post('http://localhost:3000/miniwp/member/login', {
                email: this.email,
                password: this.password
            })
            .then(response => {
                console.log(response.data,'masukkk')
                this.loginStatus = true,
                localStorage.setItem('token', response.data)
            })
            .catch((error) => {
                console.log(error.response.data.message)
                this.error = error.response.data.message
            })
        }
    },
    created(){
        if(localStorage.getItem("token")){
            this.loginStatus = true
            this.error = null
            axios.get('http://localhost:3000/miniwp/article')
            .then(response => {
                this.article = response.data
            })
        }
        else{
            this.loginStatus = false
        }
    }
})