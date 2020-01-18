export default {
    data() {
        return {
            isLogin: false
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

        }
    }
}