new Vue({
    el: '#content-article',
    data: {
        articleTitle: null,
        articleContent: null,
        articles: null,
        archive: null,
        searchKey: null
    },
    methods: {
        createArticle: function(){
            let data = {
                title: this.articleTitle,
                content: this.articleContent
            }
            axios.post('http://localhost:3000/article', data)
            .then(data => {
                    let created = (data.data.result)
                    this.articles.push(created)
                    this.archive.push(created)
                    this.articleTitle = ''
                    this.articleContent = ''
                })
                .catch(err => {
                    console.log(err)
                })
        },
        searchArticle: function(){
            let temp = this.archive
            console.log(temp)
            this.articles = temp.filter(data => data.title.includes(this.searchKey))
        },
        removeArticle: function(id, i){
            console.log(i)
            axios.delete(`http://localhost:3000/article/${id}`)
                .then(data => {
                    this.articles = this.articles.filter(data => data['_id'] != id)
                    this.archive = this.archive.filter(data => data['_id'] != id)
                })
        }
        
    },
    created(){
        let newData = this
        axios.get('http://localhost:3000/article')
            .then(results => {
                console.log(results.data)
                newData.articles = results.data
                newData.archive = results.data
            })
            .catch(err => {
                console.log(err)
            })
    }
})