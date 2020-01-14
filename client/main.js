const app = new Vue({
    el: '#app',
    data: {
        title: '',
        content: '',
        created_at: '',
        articles: [],
        search: ''
    },
    mounted() {
        axios
            .get('http://localhost:3000/article')
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
                .post('http://localhost:3000/article', {
                    title: this.title,
                    content: this.content,
                    created_at: new Date().toLocaleDateString()
                })
                .then(({data}) => {
                    this.articles.push({
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
        }
    }
})