export default {
    data() {
        return {
            isLogin: false,
            allArticles: [],
            myArticles: []
        }
    },
    mounted() {
        if(localStorage.getItem('token')) this.nowLogin = true
    },
    methods: {
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
        }
    }
}