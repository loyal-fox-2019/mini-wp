var app = new Vue({
    el: '#app',
    created(){
        axios
            .get('http://localhost:3000/articles')
            .then(articleData=>{
                this.articles = articleData.data
                this.show = articleData.data
            })
            .catch(err=>{
                console.log(err)
            })
    },
    data: {
      addPart: false,
      posts: true,
      updateArticle: null,
      articles: [],
      show: [],
      addTitle: '',
      addImage: '',
      addContent: '',
      articleSearch: ''
    },
    methods: {
        addArticle(){
            axios.post('http://localhost:3000/articles', {
                title: this.addTitle,
                content: this.addContent,
                image: this.addImage
            })
            .then(addedArticle=>{
                // console.log(addedArticle.data)
                this.articles.push(addedArticle.data)
                this.show = this.articles
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
        searchArticle(){
            let tmp = this.show
            // console.log(tmp)
            this.articles = tmp.filter(element=> element.title.includes(this.articleSearch))
        },
        viewPosts(){
            this.updateArticle = null
            this.addPart = false
            this.posts = true
        },
        viewAdd(){
            this.addTitle = ''
            this.addContent = ''
            this.addImage = ''
            this.posts = false
            this.updateArticle = null
            this.addPart = true
        },
        viewEdit(id){
            let tmp = this.show
            tmp = tmp.filter(art=>art._id==id)
            
            // console.log(tmp[0].title)
            this.addTitle = tmp[0].title
            this.addContent = tmp[0].content
            this.addImage = tmp[0].image_url
            // console.log(addTitle, addContent, addImage)
            this.posts = false
            this.updateArticle = id
            this.addPart = true
        },
        editArticle(){
            // console.log(this.addTitle)
            axios.put(`http://localhost:3000/articles/${this.updateArticle}`,{
                title: this.addTitle,
                content: this.addContent,
                image: this.addImage
            })
            .then(success=>{
                // console.log(success.data)
                let tmp = this.show
                for (let i = 0; i < tmp.length; i++) {
                    if(tmp[i]._id == this.updateArticle){
                        tmp[i].title = this.addTitle
                        tmp[i].content = this.addContent
                        tmp[i].image_url = this.addImage
                    }
                }
                this.articles = tmp
                this.show = tmp
                this.addTitle = ''
                this.addContent = ''
                this.addImage = ''
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
                    let tmp = this.show
                    for (let i = 0; i < tmp.length; i++) {
                        if(tmp[i]._id == id){
                            tmp.splice(i, 1)
                        }
                    }
                    this.articles = tmp
                    this.show = this.articles
                    this.searchArticle()
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
  })