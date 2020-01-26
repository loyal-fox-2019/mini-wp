var app = new Vue({
    el: '#app',
    data: {
        loginStatus: false,
        register: false,
        name:null,
        email: null,
        password: null,
        title: null,
        content: null,
        error: null,
        statusArticle: false,
        statusEdit:false,
        articles: [],
        user: null,
        titleEdit: null,
        contentEdit: null,
        titleEditForm: null,
        contentEditForm: null,
        idArticle:null
    },
    methods: {
        btnLoginRegister(){
            if(!this.register) {
                this.register = true
                this.name = null
                this.email = null
                this.password = null
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
                this.loginStatus = true,
                localStorage.setItem('token', response.data.token)
                this.user = response.data.userId
                this.email = null
                this.password = null
                this.cekLogin()
            })
            .catch((error) => {
                console.log(error.response.data.message)
                this.error = error.response.data.message
                this.email = null
                this.password = null
            })
        },
        createMember(){
            axios.post('http://localhost:3000/miniwp/member/register', {
                name: this.name,
                email: this.email,
                password: this.password
            })
            .then(response => {
                this.register = false
                this.name = null
                this.email = null
                this.password = null
            })
            .catch(error => {
                this.error = error.response.data.message
            })
        },
        createArticle() {
            axios.post('http://localhost:3000/miniwp/article/new', {
                title: this.title,
                content: this.content
            },
            {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            .then(response => {
                this.statusArticle = false
                this.cekLogin()

            })
            .catch(error => {
                this.error = error.response.data.message
            })
        },
        newArticle(){
          this.statusArticle = !this.statusArticle
        },
        logOut(){
            localStorage.removeItem("token")
            this.user = null
            this.cekLogin()
        },
        cekLogin(){
            if(localStorage.getItem("token")){
                axios.get('http://localhost:3000/miniwp/article',{
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                })
                .then(response => {
                    this.articles = response.data.articles
                    this.user = response.data.userId
                    this.loginStatus = true
                    this.error = null
                })
                .catch(error => {
                    this.error = error.response.data.message
                })
            }
            else{
                this.loginStatus = false
            }
        },
        editArticle(id){        
            axios.get(`http://localhost:3000/miniwp/article/${id}`)
            .then(response => {
                console.log(response)
                this.statusArticle = false
                this.statusEdit = true
                this.titleEdit = response.data.title
                this.contentEdit = response.data.content
                this.idArticle = response.data._id
            })
        },
        saveEdit(){
            axios.put(`http://localhost:3000/miniwp/article/${this.idArticle}`, {
                title: this.titleEditForm,
                content: this.contentEditForm
            },
            {
                headers:{
                    Authorization: localStorage.getItem('token')
                }
            }
            )
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                this.error = error.response.data.message
            })
        },
        listArticle(){
            this.statusArticle = false
            this.statusEdit = false
        },
        deleteArticle(id){
            console.log(id)
            axios.delete(`http://localhost:3000/miniwp/article/${id}`, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            .then(response => {
                console.log(response)
                this.checkLogin()
            })
            .catch(error => {
                console.log(error)
                // this.error = error.response.data.message
            })
        }
    },
    created(){
        this.cekLogin()
    }
})