new Vue({
    el: '#app',
    data: {
        articlePage: false,
        newArticle: false,
        listArticle: [],
        idArticle: '',
        titleArticle: '',
        contentArticle: '',
        searchBar: '',
        showTitle: '',
        showDescription: '',
        detailArticle: false,
        pageTitle: '',
        buttonAdd: false,
        buttonEdit: false
    },
    computed: {
        searchArticleComputed() {
            // let searchArticle = this.listArticle
            return this.listArticle.filter(element => element.title.includes(this.searchBar))
        }
    },
    methods: {
        showArticlePage() {
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
            this.articlePage = true
            this.newArticle = false
            this.detailArticle = false
        },
        addArticle() {
            this.pageTitle = 'Add New Article'
            this.newArticle = true
            this.articlePage = false
            this.detailArticle = false
            this.titleArticle = ''
            this.contentArticle = ''
            this.buttonAdd = true
            this.buttonEdit = false
        },
        editPage() {
            this.pageTitle = 'Edit Article'
            this.newArticle = true
            this.articlePage = false
            this.detailArticle = false
            this.titleArticle = this.showTitle
            this.contentArticle = this.showDescription
            this.buttonAdd = false
            this.buttonEdit = true
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
                    this.showArticlePage()
                    // let dataArticle = this.listArticle
                    // for (let i = 0; i < dataArticle.length; i++) {
                    //     console.log(dataArticle[i]._id)
                    //     if (dataArticle[i]._id === params) {
                    //         dataArticle.splice(i, 1)
                    //     }
                    // }
                    // this.listArticle = dataArticle
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
                    this.idArticle = data._id
                })
                .catch(err => {
                    console.log(err)
                })
        },
        editArticle() {
            axios({
                method: 'put',
                url: `//localhost:3000/articles/${this.idArticle}`,
                data: {
                    title: this.titleArticle,
                    content: this.contentArticle
                }
            })
                .then(() => {
                    this.showArticlePage()
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
})