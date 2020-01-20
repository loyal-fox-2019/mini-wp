axios.defaults.baseURL = 'http://localhost:3000';

Vue.filter('formatDate',function(value){
  if(value){
    return moment(value).format('MM/DD/YYYY hh:mm')
  }
})

var app = new Vue({
    el: '#app',
    name : 'app',
    
    created(){
      axios({
        method : "get",
        url : 'article/',
      })
      .then(({data})=>{
        console.log(data)
        data.forEach(el => {
          this.articles.push(el)
        });
      })
      .catch(err =>{
        console.log(err)
      })
      console.log('heyy ini created()')
    },
    data: {
      message: 'Hello Vue!',
      articles : [],
      onDisplay : 'home',
      button : 'add',
      title : '',
      content : '',
      articleId : '',
      search : '',
      image : '',
      filteredArticles:[]
    },
    methods : {

      previewFiles : function(){
        this.image = event.target.files[0]
      },

      createArticle : function(){
        console.log(this.image)
        let formData = new FormData
        formData.append('title', this.title)
        formData.append('content', this.content)
        formData.append('file', this.image)
        console.log(formData)
        axios({
          method : "post",
          url : "article/",
          headers:{
            'Content-Type' : 'multipart/form-data; boundary=${form._boundary}`',
          },
          data : formData
        })
        .then(({data})=>{
          console.log(data)
          this.articles.push({
            title : data.docs.title,
            content : data.docs.content,
            due_date : data.docs.date,
            imgUrl : data.docs.imgUrl,
          })
          this.onDisplay = "home"
        })
        .catch(err =>{
          console.log(err)
        })
      },


      showUpdateForm : function(articleId){
        this.button = 'update'
        console.log(articleId)
        axios({
          method : 'get',
          url : `article/${articleId}`
        })
        .then(({data})=>{
          console.log(data)
          this.title = data.title;
          this.content = data.content
          this.articleId= data._id
          this.onDisplay = "create"
        })
        .catch(err=>{
          console.log(err)
        })
      },

      updateArticle : function(){
        axios({
          method : "put",
          url : `article/${this.articleId}`,
          data : {
            title : this.title,
            content : this.content
          }
        })
        .then((res)=>{
          this.getArticles()
          this.onDisplay="home"
        })
      },

      deleteArticle : function(articleId){
        axios({
          method : "delete",
          url : `article/${articleId}`,
        })
        .then((res)=>{
          console.log(res)
          this.getArticles()
          this.onDisplay="home"
        })
        .catch(err=>{
          console.log(err)
        })
      },
      
      filterArticle : function(){
        let regex = new RegExp(this.search,'i')
        console.log(regex)
        this.filteredArticles = this.articles.filter(article => article.title.match(regex))
      },

      getArticles :function(){
        this.articles = []
          axios({
            method : "get",
            url : 'article/',
          })
          .then(({data})=>{
            data.forEach(el => {
              this.articles.push(el)
            });
          })
        }
      }

})
