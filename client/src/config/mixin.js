export default {
    data() {
        return {
            isLogin: false,
            tagList: [],
            inSearch: '',
            tagSearch: '',
            filteredArticle: [],
            allArticles: [],
            myArticles: []
        }
    },
    watch: {
        Search: function () {
            if (this.$route.path == '/home') this.filteredArticle = this.allArticles.filter(article => article.title.indexOf(this.Search) > -1)
            else this.filteredArticle = this.allArticles.filter(article => article.title.indexOf(this.Search) > -1)
        },
        tagSearch: function () {
            this.filteredArticle = this.allArticles.filter(article => article.tags.includes(this.tagSearch))
        }
    },
    mounted() {
        if (localStorage.getItem('token')) this.nowLogin = true
    },
    methods: {
        bookTheTags: function () {
            let sampleTag = []
            this.allArticles.forEach(element => {
                element.tags.forEach(tag => {
                    sampleTag.push(tag)
                })
            })
            this.fillTheTags(sampleTag)
        },
        fillTheTags: function (list) {
            let fakeList = []
            list.forEach(tag => {
                let addCount = false
                fakeList.forEach(element => {
                    if (element.name == tag) {
                        element.count++
                        addCount = true
                    }
                })
                if (!addCount) {
                    fakeList.push({
                        name: tag,
                        count: 1
                    })
                }
            })
            this.tagList = fakeList
        }
    },
    computed: {
        nowLogin: {
            get: function () {
                return this.isLogin
            },
            set: function (v) {
                this.isLogin = v
            }
        },
        Articles: {
            get: function () {
                return allArticles
            },
            set: function (v) {
                this.allArticles = v
            }
        },
        Search: {
            get: function () {
                return this.inSearch
            },
            set: function (v) {
                this.inSearch = v
            }
        },
        TagSearch: {
            get: function () {
                return this.tagSearch
            },
            set: function (v) {
                this.tagSearch = v
            }
        }
    }
}