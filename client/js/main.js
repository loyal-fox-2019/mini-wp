new Vue({
    el: '#app',
    created() {
        axios({
            method: 'get',
            url: '//localhost:3000/articles/',
        })
            .then(({ data }) => {
                data.forEach(element => {
                    element.created_at = moment(element.created_at).format('DD MMMM YYYY')
                });
                this.listArticle = data
                this.forSearch = data
            })
            .catch(err => {
                console.log(err)
            })
    },
    data: {
        articlePage: false,
        newArticle: false,
        listArticle: [],
        forSearch: [],
        titleArticle: '',
        contentArticle: '',
        searchBar: '',
        showTitle: '',
        showDescription: '',
        detailArticle: false,
    },
    methods: {
        showArticlePage() {
            this.articlePage = true
            this.newArticle = false
            this.detailArticle = false
        },
        addArticle() {
            this.newArticle = true
            this.articlePage = false
            this.detailArticle = false
            this.titleArticle = ''
            this.contentArticle = ''
        },
        editPage() {
            this.newArticle = true
            this.articlePage = false
            this.detailArticle = false
            this.titleArticle = this.showTitle
            this.contentArticle = this.showDescription
        },
        addNewArticle() {
            axios({
                method: 'post',
                url: '//localhost:3000/articles/',
                data: {
                    title: this.titleArticle,
                    content: this.contentArticle
                }
            })
                .then(({ data }) => {
                    this.showArticlePage()
                    data.created_at = moment(data.created_at).format('DD MMMM YYYY')
                    this.listArticle.push(data)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        deleteArticle(params) {
            // console.log(params)
            axios({
                method: 'delete',
                url: `//localhost:3000/articles/${params}`,
            })
                .then(({ data }) => {
                    let dataArticle = this.listArticle
                    for (let i = 0; i < dataArticle.length; i++) {
                        console.log(dataArticle[i]._id)
                        if (dataArticle[i]._id === params) {
                            dataArticle.splice(i, 1)
                        }
                    }
                    this.listArticle = dataArticle
                })
                .catch(err => {
                    console.log(err)
                })
        },
        searchArticle() {
            let searchArticle = this.forSearch
            this.listArticle = searchArticle.filter(element => element.title.includes(this.searchBar))
        },
        showById(params) {
            axios({
                method: 'get',
                url: `//localhost:3000/articles/${params}`
            })
                .then(({ data }) => {
                    this.detailArticle = true
                    this.newArticle = false
                    this.articlePage = false
                    this.showTitle = data.title
                    this.showDescription = data.content
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
})