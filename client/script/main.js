const app = new Vue({
    el: '#app',
    data: {
        id: "",
        title: "",
        content: "",
        featured_image: "",
        createdAt: new Date(),
        dataArticles: [],
        search: ""
    },
    created() {
        this.getArticle()
    },
    computed: {
        filterArticle() {
            if (this.search.length > 0) {
                const regex = new RegExp(this.search, 'i')
                const filterArticles = this.dataArticles.filter(article => {
                    return regex.test(article.title)
                })
                return filterArticles
            } else {
                return this.dataArticles;
            }
        }
    },
    methods: {
        getArticle() {
            axios({
                url: 'http://localhost:3000/articles',
                method: "GET"
            })
                .then(({ data }) => {
                    this.dataArticles = data
                    this.emptyFormEdit()
                }).catch((err) => {
                    console.log(err)
                });
        },
        addArticle() {
            let formData = new FormData()
            formData.append('title', this.title)
            formData.append('content', this.content)
            formData.append('featured_image', this.featured_image)
            axios({
                url: 'http://localhost:3000/articles',
                method: "POST",
                data: formData
            })
                .then(({ data }) => {
                    this.dataArticles.push(data)
                    this.title = ""
                    this.content = ""
                    this.featured_image = ""
                }).catch((err) => {
                    console.log(err)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: err.message
                    })
                });
        },
        updateArticle(id) {
            axios({
                url: `http://localhost:3000/articles/${id}`,
                method: "PATCH",
                data: {
                    title: this.title,
                    content: this.content,
                    featured_image: this.featured_image
                }
            })
                .then(() => {
                    this.getArticle()
                }).catch((err) => {
                    console.log(err)
                });
        },
        deleteArticle(id) {
            axios({
                url: `http://localhost:3000/articles/${id}`,
                method: "DELETE"
            })
                .then(() => {
                    this.getArticle()
                }).catch((err) => {
                    console.log(err)
                });
        },
        findArticle(id) {
            axios({
                url: `http://localhost:3000/articles/${id}`,
                method: "GET"
            })
                .then(({ data }) => {
                    this.id = data._id
                    this.title = data.title
                    this.content = data.content
                    this.featured_image = data.featured_image
                }).catch((err) => {
                    console.log(err)
                });
        },
        emptyFormEdit() {
            this.id = ""
            this.title = ""
            this.content = ""
            this.featured_image = ""
        },
        formatDate(date) {
            return moment(date).format('MMMM Do YYYY, h:mm:ss a')
        },
        handleFileUpload(event) {
            this.featured_image = event.target.files[0]
        }
    }
})