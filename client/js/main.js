new Vue({
    el: '#content-article',
    data: {
        articleTitle: null,
        articleContent: null,
        articles: null,
        archive: null,
        searchKey: null,
        editArticle: null
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
                    this.archive = this.articles
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
                .catch(err => {
                    console.log(err)
                })
        },
        viewEdit: function(id){
            this.editArticle = id
            let temp = this.articles.filter(data => data['_id'] == id)
            this.articleTitle = temp[0].title
            this.articleContent = temp[0].content

            console.log(id, temp[0].title)
        },
        editPost: function(){
            let id = this.editArticle
            let data = {
                title: this.articleTitle,
                content: this.articleContent
            }
            axios.put(`http://localhost:3000/article/${id}`, data)
                .then(result => {
                    let index = 0
                    this.articles.forEach((el, i) => {
                        if(el.id == this.editArticle){
                            console.log(el, i)
                            index = i
                            el.title = this.articleTitle
                            el.content = this.articleContent
                        }
                    })

                    console.log( index )
                    this.articles[index].title = this.articleTitle
                    this.articles[index].content = this.articleContent
                    this.archive = this.articles

                    this.editArticle = null
                    this.articleContent = null
                    this.articleTitle = null
                })
                .catch(err => {
                    console.log(err)
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