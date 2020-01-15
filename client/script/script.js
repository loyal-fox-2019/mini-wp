var app = new Vue({
    el: '#app',
    created(){
        axios
            .get('http://localhost:3000/articles')
            .then(articleData=>{
                let articleDatas = articleData.data
                // articleDatas.forEach(element => {
                //     element.content = element.content.slice(0, 100)
                // });
                // console.log(articleDatas)
                this.articles = articleDatas
                this.archive = articleData.data
            })
            .catch(err=>{
                connectionError = err
            })
    },
    data: {
      connectionError: null,
      addPart: false,
      posts: false,
      fullArticle: false,
      updateArticle: null,
      articles: [],
      archive: [],
      addTitle: '',
      addImage: '',
      addContent: '',
      articleSearch: '',
      editSearchId:''
    },
    computed: {
        filterArticle(){
            if(this.articleSearch==''||this.articleSearch==null){
                return this.articles
            }
            return this.articles.filter(element=> element.title.includes(this.articleSearch))
        },
        editArticleSearch(){
            return this.articles.filter(element=> element._id == this.editSearchId)
        }
    },
    methods: {
        newImage(){
            // alert('Changed')
            this.addImage = event.target.files[0]
        },
        addArticle(){
            // console.log(this.addImage)
            let data = new FormData()
            data.append('title', this.addTitle)
            data.append('content', this.addContent)
            data.append('image_url', this.addImage)
            // console.log(data)
            axios.post('http://localhost:3000/articles', 
                data
            )
            .then(addedArticle=>{
                // console.log(addedArticle.data)
                this.articles.push(addedArticle.data)
                this.archive = this.articles
                this.addTitle = ''
                this.addContent = ''
                this.addImage = ''
                this.addPart = false
                this.posts = true
            })
            .catch(err=>{
                console.log(err)
            })
        },
        viewPosts(){
            this.updateArticle = null
            this.fullArticle = false
            this.addPart = false
            this.posts = true
        },
        viewAdd(){
            this.addTitle = ''
            this.addContent = ''
            this.addImage = ''
            this.posts = false
            this.fullArticle = false
            this.updateArticle = null
            this.addPart = true
        },
        viewEdit(id){
            this.editSearchId = id
            // console.log(tmp[0].title)
            this.addTitle = this.editArticleSearch[0].title
            this.addContent = this.editArticleSearch[0].content
            this.addImage = this.editArticleSearch[0].image_url
            // console.log(addTitle, addContent, addImage)
            this.posts = false
            this.fullArticle = false
            this.updateArticle = id
            this.addPart = true
        },
        editArticle(){
            // console.log(this.addTitle)
            let data = new FormData()
            data.append('title', this.addTitle)
            data.append('content', this.addContent)
            data.append('image_url', this.addImage)
            axios.put(`http://localhost:3000/articles/${this.updateArticle}`,data)
            .then(success=>{
                // console.log(success.data)
                let tmp = this.archive
                for (let i = 0; i < tmp.length; i++) {
                    if(tmp[i]._id == this.updateArticle){
                        tmp[i].title = this.addTitle
                        tmp[i].content = this.addContent
                        tmp[i].image_url = this.addImage
                    }
                }
                this.articles = tmp
                this.archive = tmp
                this.addTitle = ''
                this.addContent = ''
                this.addImage = ''
                this.editSearchId = ''
                this.updateArticle = null
                this.addPart = false
                this.posts = true
            })
            .catch(err=>{
                console.log(err)
            })
        },
        deleteArticle(id){
            axios.delete(`http://localhost:3000/articles/${id}`)
            .then(success=>{
                if(success.data.deletedCount == 1){
                    let tmp = this.archive
                    for (let i = 0; i < tmp.length; i++) {
                        if(tmp[i]._id == id){
                            tmp.splice(i, 1)
                        }
                    }
                    this.articles = tmp
                    this.archive = this.articles
                    this.searchArticle()
                }
            })
            .catch(err=>{
                console.log(err)
            })
        },
        readFullArticle(params){
            // alert(params)
            this.posts = false
            this.fullArticle = true
        }
    }
  })