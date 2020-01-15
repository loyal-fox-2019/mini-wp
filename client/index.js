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
    created: '',
    picture: ''
  },
  methods:{
    uploadPicture(){
      this.picture = event.target.files[0]
      console.log(event.target.files)
    },
    update(id){
      // console.log('picture yang ke upload', this.picture)
      const formData = new FormData()
      formData.append('title', this.articleTitle)
      formData.append('content', this.articleContent)
      formData.append('created_at', new Date())
      formData.append('picture', this.picture)
      axios({
        method: 'patch',
        url: `http://localhost:3000/articles/${id}`,
        data: formData
      })
      .then(({data})=>{
        console.log(data,'di update()')
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
        console.log(data,'di updateArticle()')
        this.titlePlace = data.result.title
        this.contentPlace = data.result.content
        this.created = data.result.created_at
        this.articleId = data.result._id
        this.picture = data.result.picture
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
      // console.log('show published')
      this.searchedList = this.listArticles
      this.formWrite=false
      this.formUpdate=false
    },
    showForm(){
      if(this.formWrite==false){
        this.formWrite = true
        this.searchedList = []
        this.formUpdate=false
      }else{
        this.formWrite = false
        this.showPublished()
      }
    },
    publishArticle(){
      const formData = new FormData()
      let list = this.listArticles
      formData.append('title', this.articleTitle)
      formData.append('content', this.articleContent)
      formData.append('picture', this.picture)
      formData.append('created_at', new Date())
      console.log(this.picture)
      console.log(formData, 'mau liat hasil yg keinput aja')
      this.formWrite = false
      axios({
        method: 'post',
        url: 'http://localhost:3000/articles',
        data: formData
      })
      .then(({data})=>{
        console.log(data, 'result dari publish article')
        list.push({
          id: data._id,
          title:data.title,
          content:data.content,
          created_at: data.created_at,
          picture: data.picture
        })
        this.showPublished()
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }
})