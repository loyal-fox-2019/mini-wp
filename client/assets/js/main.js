new Vue({
    el: '#app',
    data: {
        urlApi: 'http://localhost:8080/posts',
        searchTitle: '',
        posts: [],
        form: {
            _id: null,
            image: '',
            title: '',
            article: '',
            categories: []
        },
        elForm: false,
        isUpdate: false,
    },
    methods: {
        preSave(){
            let form = new FormData()
            const data = this.form
            for (const key in data) {
                form.append(key, data[key])
            }
            return form
        },
        save(){
            const form = this.preSave()
            let self = this
            axios
                .post(this.urlApi, form)
                .then(function ({data}) {
                    self.posts.push(data.post)
                    self.elForm = false
                })
                .catch(err => {
                    console.log(err)
                })
        },
        preUpdate(post){
            this.form._id = post._id
            this.form.title = post.title
            this.form.article = post.article
            this.form.categories = post.categories
        },
        update(){
            let form = this.preSave()
            let self = this
            let index = self.posts.findIndex(post => post._id === self.form._id)
            axios
                .put(`${this.urlApi}/${this.form._id}`, form)
                .then(function ({data}) {  
                    self.elForm = false
                    self.isUpdate = false
                    console.log(data)
                    self.$set(self.posts, index, data.post)
                })
                .catch(errs => {
                    console.log(errs)
                })

        },
        deletePost(){
            let self = this
            axios
                .delete(`${this.urlApi}/${this.form._id}`)
                .then(post => {
                    let index = self.posts.findIndex(post => post._id === self.form._id)
                    this.$delete(this.posts, index)
                    self.elForm = false
                    self.isUpdate = false
                })
                .catch(err => {
                    console.log(err)
                })
        },
        clearForm(){
            this.form = {
                id: null,
                title: '',
                article: '',
                categories: []
            }
        },
        onFileChange(e){
            const image = e.target.files[0]
            if (!image.length) {
                this.form.image = image
            }
        }
    },
    computed: {
        filteredUser: function () {  
            let self = this
            return self.posts.filter(function (post) {  
                return post.title.indexOf(self.searchTitle) !== -1
            })
        }
    },
    created () {
        let self = this
        axios
            .get(this.urlApi)
            .then(function ({data}) {  
                self.posts = data.posts
            })
            .catch(err => {
                console.log(err)
            })
    },
})
// https://vuejs.org/v2/guide/migration.html#v-for-Range-Values-changed