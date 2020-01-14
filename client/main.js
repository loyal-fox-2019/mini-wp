window.onload = function(){
    CKEDITOR.replace( 'editor1' );
}

new Vue({
    el: '#app',
    data: {
      articles: [],
      articles_perma: [],
      search_box: '',
      newTitle: '',
      newContent: '',
      selectedId: '',

      showList: '',
      showWrite: '',
      showNoArticle: '',
      showPublishBtn: '',
      showUpdateBtn: ''
    },
    methods: {
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
        },
        deleteArticle(id){
            axios({
                method: 'delete',
                url: `http://localhost:3000/articles/${id}`
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
        },
        updateArticle(){
            let title = this.newTitle
            let content = this.newContent
            axios({
                method: 'patch',
                url: `http://localhost:3000/articles/${this.selectedId}`,
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
            let title = this.newTitle
            let content = this.newContent
            let created_at = new Date()
            axios({
                method: 'post',
                url: 'http://localhost:3000/articles',
                data: {
                    title,
                    content,
                    created_at
                }
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
                url: 'http://localhost:3000/articles'
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
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },
    created() {
        axios({
            method: 'get',
            url: 'http://localhost:3000/articles'
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
        })
        .catch(err=>{
            console.log(err)
        })
    }
})