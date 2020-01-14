new Vue({
  el: '#app',
  created(){
    axios({
      method:'get',
      url: 'http://localhost:3000/articles'
    })
    .then(({data})=>{
      // console.log('masuk created', data.result)
      this.listArticles = data.result
    })
    .catch(err=>{
      console.log(err)
    })
  },
  data: {
    formWrite: false,
    mainPage: true,
    listArticles:[],
    articleContent: '',
    articleTitle:'',
    searchedList: [],
    titleSearch: '',
    titlePlace:'',
    contentPlace:'',
    formUpdate: false,
    articleId: '',
    created: ''
  },
  methods:{
    update(id){
      // console.log('masuk ga', id)
      axios({
        method: 'patch',
        url: `http://localhost:3000/articles/${id}`,
        data:{
          title: this.articleTitle,
          content: this.articleContent,
          created_at: this.created
        }
      })
      .then(({data})=>{
        this.formUpdate=false
        return axios({
          method:'get',
          url: 'http://localhost:3000/articles'
        })
      })
      .then(({data})=>{
        this.listArticles = data.result
        this.searchedList = data.result
      })
      .catch(err=>{
        console.log(err)
      })
    },
    updateArticle(id){
      this.formUpdate = true
      this.searchedList=[]
      axios({
        method: 'get',
        url: `http://localhost:3000/articles/${id}`
      })
      .then(({data})=>{
        console.log(data)
        this.titlePlace = data.result.title
        this.contentPlace = data.result.content
        this.created = data.result.created_at
        this.articleId = data.result._id
      })
      .catch(err=>{
        console.log(err)
      })
    },
    deleteArticle(id){
      console.log('article id', id)
      axios({
        method: 'delete',
        url: `http://localhost:3000/articles/${id}`
      })
      .then(({data})=>{
        // console.log(data)
        return axios({
          method: 'get',
          url: 'http://localhost:3000/articles'
        })
      })
      .then(({data})=>{
        this.listArticles = data.result
        this.searchedList = data.result
      })
      .catch(err=>{
        console.log(err)
      })
    },
    searchArticle(){
      // console.log('masuk', this.listArticles)
      let findList = []
      for(article of this.listArticles){
        // console.log(article)
        if(article.title.includes(this.titleSearch)){
          findList.push(article)
        }
      }
      this.searchedList = findList
    },
    showPublished(){
      console.log('show published')
      this.searchedList = this.listArticles
      this.formWrite=false
    },
    showForm(){
      if(this.formWrite==false){
        this.formWrite = true
        this.searchedList = []
        // this.mainPage = false
      }else{
        // console.log('hide form')
        this.formWrite = false
        this.showPublished()
        // this.mainPage = true
      }
    },
    publishArticle(){
      let list = this.listArticles
      let title=this.articleTitle
      let content = this.articleContent
      let created_at = new Date()
      this.formWrite = false
      axios({
        method: 'post',
        url: 'http://localhost:3000/articles',
        data:{
          title,
          content,
          created_at
        }
      })
      .then(({data})=>{
        // console.log(data)
        list.push({
          title:data.title,
          content:data.content,
          created_at: data.created_at
        })
        this.showPublished()
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }
})