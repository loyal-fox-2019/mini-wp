// Vue.transition('custom-fade',{
//     enterClass:'bounce',
//     leaveClass:'bounce'
// })


Vue.component('test', {
    template: '<p>sdbsdsbdsb</p>'
})

new Vue ({
    el: '#postarea',
    data:{
        title: '',
        content: '',
        image:'',
        form: false,
        postwall: false,
        articles: null,
        key:'',
        idpost: null,   
        edit:false
    },
    methods:{
        uploadimage:function (params) {
          this.image = event.target.files[0]  
        },
        postArticle: function () {
            let data  = new FormData
            data.append('title', this.title)
            data.append('content', this.content)
            data.append('image', this.image)
            data.append('created_at', new Date())

            axios.post('http://localhost:3000/articles',data)
            .then((data)=>{
                this.form = false
                this.postwall = true
                this.articles.unshift(data.data)
                
            })
        }, 
        delet: function(params, index){
            let id = params['_id']
            axios.delete('http://localhost:3000/articles/'+id)
            .then((data)=>{
                this.articles = this.articles.filter(arc => arc['_id'] != id) 
            })
        },
        showform: function() {
            this.form = true
            this.edit = false

            this.title = ''
            this.content = ''
            this.image = ''
        },
        showallpost: function() {
            this.postwall = true
            this.form = false
            this.edit = false
        },
        editpost: function (data, index) {
            this.edit = true
            this.form = true
            this.title = data.title
            this.content = data.content
            this.image = data.image
            this.idpost = data['_id']
        },
        submiteidt:function(){
            let data  = new FormData
            data.append('title', this.title)
            data.append('content', this.content)
            data.append('image', this.image)
            data.append('created_at', new Date())
        
            axios.put('http://localhost:3000/articles/'+this.idpost,data)
            .then((data)=>{
                this.edit = false
                this.form = false
                let index = null
                this.articles.forEach((element, indx) => {
                    if(element['_id'] == this.idpost){
                        index = indx
                    }
                });
                this.articles[index] = data.data

                this.title = ''
                this.content = ''
                this.image = ''

            })
        }
    },
    computed:{
        search: function () {
            if(this.key === null || this.key === ''){
                return this.articles
            } else {
                return this.articles.filter(arc => arc.title.toLowerCase().includes(this.key.toLowerCase()))
            }
        }
    },
    created(){
        let arti = this
        axios.get('http://localhost:3000/articles')
        .then(function(data){
            arti.articles = data.data
        })
    }


})