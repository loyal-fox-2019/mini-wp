export default {
    data() {
        return {
            isLogin: false,
            tagList: [],
            inSearch: '',
            filteredArticle: [],
            allArticles: [],
            myArticles: []
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
        }
    }
}