new Vue({
    el: '#my-site',
    data: {
        mySiteShow: true,
        myReader: false,
        myNewArticle: false,
        articles: [],
        page_index: 0,
        newArticle: {
            title: '',
            content: ''
        },
        dataArticle: '',
        tempArticle: ''
    },
    created() {
        this.showArticle();
    },
    computed: {
        searchArticle() {
            if(this.tempArticle.length > 0) {
                const regex = new RegExp(this.tempArticle, 'i')
                const filterArticles = this.articles.filter(article => {
                    return regex.test(article.title);
                })
                return filterArticles
            }
            return this.articles;
        }
    },
    methods: {
        hideAndShowRead(id) {
            if(id == 2) {
                this.mySiteShow = false;
                this.myReader = true;
                this.page_index = 1;
                this.myNewArticle = false;
            } else {
                this.mySiteShow = true;
                this.myReader = false;
                this.page_index = 0;
            }
        },
        hideAndShowNewArticle() {
            this.myReader = false;
            this.myNewArticle = true;
            this.titleUpdateCreate = 'Create New Article';
        },
        createNewArticle() {
            axios({
                method: 'post',
                url: 'http://localhost:3000/article',
                data: {
                    title: this.newArticle.title,
                    content: this.newArticle.content
                }
            })
            .then(({data}) => {
                this.newArticle.title = '';
                this.newArticle.content = '';
                this.myNewArticle = false;
                this.showArticle();
                this.myReader = true;
            })
            .catch(error => {
                console.log(error.message)
            })
        },
        showArticle() {
            axios({
                method: 'get',
                url: 'http://localhost:3000/article'
            })
            .then(({data}) => {
                const articles = data.data;
                this.articles = articles
            })
            .catch(error => {
                console.log(error);
            })
        },
        deleteArticle(id) {
            axios({
                method: 'delete',
                url: 'http://localhost:3000/article',
                data: {
                    article_id: id
                }
            })
            .then(response => {
                this.showArticle();
            })
            .catch(error => {
                console.log(error);
            })
        },
        findOneArticle(id) {
            axios({
                method: 'get',
                url: `http://localhost:3000/article/findOne/${id}`
            })
            .then(({data}) => {
                this.dataArticle = data.data
            })
            .catch(error => {
                console.log(error);
            })
        },
        updateArticle(id) {
            axios({
                method: 'put',
                url: `http://localhost:3000/article/${id}`,
                data: {
                    title: this.dataArticle.title,
                    content: this.dataArticle.content
                }
            })
            .then(({data}) => {
                this.showArticle();
            })
            .catch(error => {
                console.log(error);
            })
        }
    }
})