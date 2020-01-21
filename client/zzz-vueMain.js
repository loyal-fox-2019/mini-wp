const htmlPort = 'http://localhost:3000'
// const htmlPort = 'https://34.87.102.199:3000'

new Vue ({
    el: '#app',
    created() {
        if(!localStorage.getItem('token')) {
            this.articles = [];
            this.showLogin();
        } else {
            this.findArticle();
        }
    },
    computed: {
        filterArticle() {
            return this.articles.filter(article => {
                return article.title.toLowerCase().includes(this.search.toLowerCase());
            });
        }
    },
    data: {
        articles: [],
        id: '',
        title: '',
        content: '',
        search: '',
        page: '',
        articleOne: [],
        file: '',
        UserId: '',
        name: '',
        email: '',
        password: '',
    },
    methods: {
        addArticle: function() {
            let obj = new FormData;
            obj.append('title', this.title);
            obj.append('content', this.content);
            obj.append('file', this.file);
            axios({
                url: `${htmlPort}/article`,
                method: 'post',
                data: obj,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(article => {
                this.articles.push(article.data);
                this.title = '';
                this.content = '';
                this.page = 'article';
            })
            .catch(err => {
                console.log(err.message);
            });
        },
        findArticle: function() {
            axios({
                url: `${htmlPort}/article`,
                method: 'get',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(articlesDB => {
                this.articles = [];
                articlesDB.data.forEach(element => {
                    this.articles.push(element);
                });
            })
            .catch(err => {
                console.log(err.message);
            });
        },
        deleteArticle: function(id) {
            axios({
                url: `${htmlPort}/article/${id}`,
                method: 'delete',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(deletedArticle => {
                console.log('Success delete article: ', deletedArticle.data);
                this.articles = [];
                this.findArticle();
            })
            .catch(err => {
                console.log(err.message);
            });
        },
        findOneArticle: function(id) {
            axios({
                url: `${htmlPort}/article/${id}`,
                method: 'get',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(articleDB => {
                this.articleOne.push(articleDB.data);
                this.id = articleDB.data._id;
                this.title = articleDB.data.title;
                this.content = articleDB.data.content;
                this.page = "editPage";
            })
            .catch(err => {
                console.log(err.message);
            });
        },
        updateOne: function() {
            axios({
                url: `${htmlPort}/article/${this.id}`,
                method: 'put',
                data: {
                    title: this.title,
                    content: this.content
                },
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(article => {
                this.articles = [];
                this.findArticle();
                this.page = 'article';
            })
            .catch(err => {
                console.log(err.message);
            });
        },
        upload() {
            this.file = event.target.files[0];
        },
        showLogin() {
            this.page = 'signIn';
        },
        onSignIn: function(googleUser) {
            const id_token = googleUser.getAuthResponse().id_token;
            axios({
                url: `${htmlPort}/gsignin`,
                method: 'post',
                data: {
                    id_token
                }
            })
            .then(response => {
                localStorage.setItem('token', response.token);
                this.page = 'article';
            })
            .catch(err => {
                console.log(err);
            });
        },
        login: function() {
            axios({
                url: `${htmlPort}/login`,
                method: 'post',
                data: {
                    email: this.email,
                    password: this.password
                },
            })
            .then(({data}) => {
                localStorage.setItem('token', data.token);
                this.email = '';
                this.password = '';
                this.page = 'article';
            })
            .catch(err => {
                console.log(err);
            });
        },
        register: function() {
            axios({
                url: `${htmlPort}/register`,
                method: 'post',
                data: {
                    name: this.name,
                    email: this.email,
                    password: this.password
                },
            })
            .then(({data}) => {
                localStorage.setItem('token', data.token);
                this.name = '';
                this.email = '';
                this.password = '';
                this.page = 'article';
            })
            .catch(err => {
                console.log(err);
            });
        },
        signOut: function() {
            localStorage.removeItem('token');
            this.page = 'signIn';
            const auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
            });
        }
    }
});
