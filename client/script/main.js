const app = new Vue({
    el: '#app',
    data: {
        id: "",
        title: "",
        content: "",
        createdAt: new Date().toLocaleDateString(),
        dataArticles: [],
        search: "",
        oneArticle: []
    },
    created() {
        this.getArticle()
    },
    computed: {
        filterArticle() {
            return this.dataArticles.filter(article => {
                return article.title.toLowerCase().includes(this.search.toLowerCase())
            })
        }
    },
    methods: {
        getArticle: function () {
            axios.get('http://localhost:3000/articles')
                .then(({ data }) => {
                    this.dataArticles = data
                    this.emptyFormEdit()
                }).catch((err) => {
                    console.log(err)
                });
        },
        addArticle: function () {
            axios.post('http://localhost:3000/articles', {
                title: this.title,
                content: this.content,
                createdAt: this.createdAt
            })
                .then(({ data }) => {
                    this.dataArticles.push({
                        _id: data._id,
                        title: data.title,
                        content: data.content,
                        createdAt: data.createdAt
                    })
                    this.title = ""
                    this.content = ""
                }).catch((err) => {
                    console.log(err)
                });
        },
        updateArticle: function (id) {
            console.log(id)
            axios.patch(`http://localhost:3000/articles/${id}`, {
                title: this.title,
                content: this.content
            })
                .then(() => {
                    this.getArticle()
                }).catch((err) => {
                    console.log(err)
                });
        },
        deleteArticle: function (id) {
            axios.delete(`http://localhost:3000/articles/${id}`)
                .then(() => {
                    this.getArticle()
                }).catch((err) => {
                    console.log(err)
                });
        },
        findArticle: function (id) {
            axios.get(`http://localhost:3000/articles/${id}`)
                .then(({ data }) => {
                    this.id = data._id
                    this.title = data.title
                    this.content = data.content
                }).catch((err) => {
                    console.log(err)
                });
        },
        emptyFormEdit: function () {
            this.id = ""
            this.title = ""
            this.content = ""
        }
    }
})