// $(document).ready(function () {
//     $("#addNewArticle").on("click", function (e) {
//         $('#addArticleModal').modal('hide')
//     })
// })

const app = new Vue({
    el: '#app',
    data: {
        title: "",
        content: "",
        createdAt: new Date().toLocaleDateString(),
        dataArticles: [],
        search: ""
    },
    mounted() {
        axios.get('http://localhost:3000/article')
            .then(({ data }) => {
                this.dataArticles = data
            }).catch((err) => {
                console.log(err)
            });
    },
    methods: {
        addArticle: function (e) {
            axios.post('http://localhost:3000/article', {
                title: this.title,
                content: this.content,
                createdAt: this.createdAt
            })
                .then(({ data }) => {
                    this.dataArticles.push({
                        title: data.title,
                        content: data.content,
                        createdAt: data.createdAt
                    })
                    this.title = ""
                    this.content = ""
                }).catch((err) => {
                    console.log(err)
                });
        }
    }
})