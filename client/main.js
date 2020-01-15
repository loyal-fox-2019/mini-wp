let url = 'http://miniwp-server.kennys.my.id:3000'

new Vue({
    el: '#app',
    data: {
      articles: [],
      articles_perma: [],
      search_box: '',
      newTitle: '',
      newContent: '',
      newPicture: '',
      selectedId: '',

      showList: '',
      showWrite: '',
      showNoArticle: '',
      showPublishBtn: '',
      showUpdateBtn: ''
    },
    methods: {
        getImage(event){
            this.newPicture = event.target.files[0]
        },
        newArticle(){
            this.showList = 'none'
            this.showNoArticle = 'none'
            this.showWrite = ''
            this.search_box = ''
            this.showUpdateBtn = 'none'
            this.showPublishBtn = ''
            this.newTitle = ''
            this.newContent = ''
            this.selectedId = ''
            this.newPicture = ''
        },
        deleteArticle(id){
            axios({
                method: 'delete',
                url: `${url}/articles/${id}`
            })
            .then(({data})=>{
                this.getArticles()
            })
            .catch(err=>{
                console.log(err);          
            })
        },
        gotoUpdate(title, content, id){
            this.showList = 'none'
            this.showNoArticle = 'none'
            this.showWrite = ''
            this.search_box = ''
            this.showUpdateBtn = ''
            this.showPublishBtn = 'none'
            this.selectedId = id
            this.newTitle = title
            this.newContent = content
            this.newPicture = ''
        },
        updateArticle(){
            let title = this.newTitle
            let content = this.newContent
            axios({
                method: 'patch',
                url: `${url}/articles/${this.selectedId}`,
                data: {
                    title,
                    content
                }
            })
            .then(({data})=>{
                this.getArticles()
            })
            .catch(err=>{
                console.log(err);
            })
        },
        publishArticle(){
            let formData = new FormData()
            formData.append('title', this.newTitle)
            formData.append('content', this.newContent)
            formData.append('created_at', new Date())
            formData.append('picture', this.newPicture)
            axios({
                method: 'post',
                url: `${url}/articles`,
                data: formData
            })
            .then(({data})=>{
                this.getArticles()
            })
            .catch(err=>{
                console.log(err);
            })
        },
        filter(){
            let temp = []
            for(obj of this.articles_perma) {
                if(obj.title.includes(this.search_box)) {
                    temp.push(obj)
                }
            }
            this.articles = temp
        },
        getArticles(){
            axios({
                method: 'get',
                url: `${url}/articles`
            })
            .then(({data})=>{
                for(obj of data){
                    if(obj.content.length > 100) {
                        obj.content_preview = obj.content.slice(0, 100) + ' . . .'
                    }
                    else {
                        obj.content_preview = obj.content
                    }
                }
                this.search_box = ''
                this.articles_perma = data
                this.articles = data
                this.showWrite = 'none'
                this.showList = ''
                this.showNoArticle = ''
                this.selectedId = ''
                this.newPicture = ''
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },
    created() {
        axios({
            method: 'get',
            url: `${url}/articles`
        })
        .then(({data})=>{
            for(obj of data){
                if(obj.content.length > 100) {
                    obj.content_preview = obj.content.slice(0, 100) + ' . . .'
                }
                else {
                    obj.content_preview = obj.content
                }
            }
            this.articles_perma = data
            this.articles = data
            this.showWrite = 'none'
            this.showNoArticle = ''
            this.showList = ''
            this.newPicture = ''
        })
        .catch(err=>{
            console.log(err)
        })
    }
})