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
        archive: null,
        key:'',
        idpost: null,   
        edit:false
    },
    methods:{
        postArticle: function () {
            axios.post('http://localhost:3000/articles',{
                title : this.title,
                content: this.content,
                image: this.image,
                created_at: new Date ()
            })
            .then((data)=>{
                this.articles.unshift(data.data)
                this.form = false
                this.postwall = true

            })
        }, 
        search: function() {
            let tmp = this.archive
            this.articles = tmp.filter(arc => arc.title.includes(this.key))
        },
        delet: function(params, index){
            let id = params['_id']
            axios.delete('http://localhost:3000/articles/'+id)
            .then((data)=>{
                this.articles = this.articles.filter(arc => arc['_id'] != id) 
                this.archive = this.archive.filter(arc => arc['_id'] != id)
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
        
            let data = {
                title : this.title,
                content : this.content,
                image : this.image
            }
            axios.put('http://localhost:3000/articles/'+this.idpost,data)
            .then((data)=>{
                this.edit = false
                this.form = false
                let index = null
                this.archive.forEach((element, indx) => {
                    if(element['_id'] == this.idpost){
                        index = indx
                    }
                });
                this.archive[index].title = this.title
                this.archive[index].content = this.content
                this.archive[index].image = this.image
                this.articles = this.archive

                this.title = ''
                this.content = ''
                this.image = ''

            })
        }
    },
    created(){
        let arti = this
        axios.get('http://localhost:3000/articles')
        .then(function(data){
            arti.articles = data.data
            arti.archive = data.data
        })
    }


})