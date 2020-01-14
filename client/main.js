const app = new Vue({
    el: '#app',
    data: {
        title: '',
        content: '',
        created_at: '',
        articles: [],
        search: '',
        tempArticleId: '',
        editInputTitle: '',
        editInputContent: ''
    },
    created() {
        axios
            .get('http://localhost:3000/api/articles')
            .then(articles => {
                this.articles = articles.data

            })
            .catch((err) => {
                console.log(err);
            })
    },
    methods: {
        publishArticle: function(event) {
            axios
                .post('http://localhost:3000/api/articles', {
                    title: this.title,
                    content: this.content,
                    created_at: new Date().toLocaleDateString()
                })
                .then(({ data }) => {
                    this.articles.push({
                        _id: data._id,
                        title : data.title,
                        content: data.content,
                        created_at: data.created_at
                    })
                    this.title = ''
                    this.content = ''
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        editTitle: function(articleId) {
            const article = this.articles.find(article => article._id == articleId)

            this.editInputTitle = article.title
            this.editInputContent = article.content
            this.tempArticleId = articleId
        },
        clickEditArticle: function() {
            console.log(this.tempArticleId, '---------keluar nih')

            axios.put(`http://localhost:3000/api/articles/${this.tempArticleId}`, {
                title: this.editInputTitle,
                content: this.editInputContent
            })
            .then(({data}) => {
                console.log(data)
                axios
                .get('http://localhost:3000/api/articles')
                .then(articles => {
                    this.articles = articles.data

                })
                .catch((err) => {
                    console.log(err);
                })
            })
            .catch((err) => {
                console.log(err)
            })
        },
        deleteTitle: function(articleId) {
            axios
                .delete(`http://localhost:3000/api/articles/${articleId}`)
                .then(() => {
                    axios
                    .get('http://localhost:3000/api/articles')
                    .then(articles => {
                        this.articles = articles.data
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }
})