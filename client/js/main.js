new Vue({
    el: '#content-article',
    data: {
        articleTitle: null,
        articleContent: null,
        articleImage: null,
        articles: null,
        searchKey: null,
        editArticle: null
    },
    methods: {
        createArticle: function(){
            let formData = new FormData()
            formData.append('title', this.articleTitle)
            formData.append('content', this.articleContent)
            formData.append('image', this.articleImage)

            console.log(formData)
            axios.post('http://localhost:3000/article', formData, {headers: {'Content-Type': 'multipart/form-data'}})
            .then(data => {
                    console.log('data created')
                    let created = (data.data.result)
                    this.articles.push(created)
                    this.articleTitle = ''
                    this.articleContent = ''
                    this.articleImage = null
                })
                .catch(err => {
                    console.log(err)
                })
        },
        removeArticle: function(id, i){
            console.log(i)
            axios.delete(`http://localhost:3000/article/${id}`)
                .then(data => {
                    this.articles = this.articles.filter(data => data['_id'] != id)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        viewEdit: function(data, id){
            this.editArticle = id
            this.articleTitle = data.title
            this.articleContent = data.content
            this.articleImage = data.image
        },
        editPost: function(){
            let id = this.editArticle
            let formData = new FormData()
            formData.append('title', this.articleTitle)
            formData.append('content', this.articleContent)
            formData.append('image', this.articleImage)
            console.log(formData)

            axios.put(`http://localhost:3000/article/${id}`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
                .then(result => {
                    let index = 0
                    this.articles.forEach((el, i) => {
                        if(el.id == this.editArticle){
                            index = i
                            return
                        }
                    })

                    this.articles[index].title = this.articleTitle
                    this.articles[index].content = this.articleContent
                    this.articles[index].image = this.articleImage

                    this.editArticle = null
                    this.articleContent = null
                    this.articleTitle = null
                    this.articleImage = null
                })
                .catch(err => {
                    console.log(err)
                })
        },
        previewFiles: function(){
            this.articleImage = event.target.files[0]
            console.log(this.articleImage)
        }
        
    },
    computed: {
        getArticles: function(){
            if(this.searchKey === null || this.searchKey === ''){
                return this.articles
            }
            return this.articles.filter(data => data.title.toLowerCase().includes(this.searchKey.toLowerCase()) || data.content.toLowerCase().includes(this.searchKey.toLowerCase()))
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