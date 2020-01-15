new Vue ({
    el: '#app',
    created() {
        this.findArticle();
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
        page: 'main',
        articleOne: [],
        file: ''
    },
    methods: {
        addArticle: function() {
            let obj = new FormData;
            obj.append('title', this.title);
            obj.append('content', this.content);
            obj.append('file', this.file);
            axios({
                url: `http://localhost:3000/article`,
                method: 'post',
                data: obj
            })
            .then(article => {
                this.articles.push(article.data);
                this.title = '';
                this.content = '';
                this.page='article';
            })
            .catch(err => {
                console.log(err.message);
            });
        },
        findArticle: function() {
            axios({
                url: `http://localhost:3000/article`,
                method: 'get',
            })
            .then(articlesDB => {
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
                url: `http://localhost:3000/article/${id}`,
                method: 'delete'
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
                url: `http://localhost:3000/article/${id}`,
                method: 'get'
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
        updateOne: function(id) {
            axios({
                url: `http://localhost:3000/article/${id}`,
                method: 'put',
                data: {
                    title: this.title,
                    content: this.content
                }
            })
            .then(article => {
                this.articles = [];
                this.findArticle();
                this.page='article';
            })
            .catch(err => {
                console.log(err.message);
            });
        },
        upload() {
            this.file = event.target.files[0];
        }
    }
});
