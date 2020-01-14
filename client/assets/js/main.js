new Vue({
    el: '#app',
    data: {
        urlApi: 'http://localhost:3000/posts',
        searchTitle: '',
        posts: [],
        elForm: false
    },
    methods: {
        
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
                self.posts = data
                console.log(self.posts)
            })
            .catch(err => {
                console.log(err)
            })
    },
})
// https://vuejs.org/v2/guide/migration.html#v-for-Range-Values-changed