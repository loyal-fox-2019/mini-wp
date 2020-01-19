export default {
    data() {
        return {
            articles: [],
            articleId: "",
            articleTitle: "",
            articleContent: "",
            articleFeatured_image: ""
        }
    },
    methods: {
        clearLoginRegister() {
            this.email = "";
            this.password = "";
            this.username = "";
        },
        clearArticle() {
            this.id = "";
            this.title = "";
            this.content = "";
            this.featured_image = "";
        }
    },
    computed: {

    }
}