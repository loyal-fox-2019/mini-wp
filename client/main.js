$(document).on('vue-loaded', function () {
    $('.nav-link').click(function() {
        $('.tab-pane').hide();
        $(`.tab-pane#${this.id}-content`).fadeIn();
        $(`.sidebar-link`).parent().removeClass('active');
    })

    $('.sidebar-link').click(function() {
        $('.tab-pane').hide();
        $(`.tab-pane#${this.id}-content`).fadeIn();
        $(`.sidebar-link`).parent().removeClass('active');
        $(`.sidebar-link#${this.id}`).parent().addClass('active');
    })
});

$(document).ready(function() {
    const vue = new Vue({
        el: "#app",
        data: {
            articlesArr : [],
            newTitle: "",
            newContent: "",
            editArticleMode: false,
            editTitle: "",
            editContent: "",
            edit_id: 0
        },
        methods: {
            saveArticle() {
                axios.post('http://localhost:3000/api/articles', {
                    //id: (new Date()).getTime(),
                    title: vue.newTitle,
                    content: vue.newContent,
                    created_at: new Date()
                })
                .then(({data}) => {
                    vue.newTitle = "";
                    vue.newContent = "";
                    refreshList();
                })
                .catch(function() {
                    console.log("error")
                });
            },

            deleteArticle(id) {
                axios.delete(`http://localhost:3000/api/articles/${id}`)
                .then(() => {
                    refreshList();
                })
                .catch(function() {
                    console.log("error")
                });
            },

            showEditForm(id) {                        
                vue.edit_id = id;

                axios.get(`http://localhost:3000/api/articles/${id}`)
                .then(({data}) => {
                    vue.editTitle = data.title;
                    vue.editContent = data.content;
                    vue.editArticleMode = true;
                })
                .catch(function() {
                    console.log("error")
                });
            },

            updateArticle(id) {
                axios.patch(`http://localhost:3000/api/articles/${id}`,{
                    title: vue.editTitle,
                    content: vue.editContent
                })
                .then(({data}) => {
                    vue.editArticleMode = false;
                    refreshList();
                })
                .catch(function() {
                    console.log("error")
                });
            },

            editArticleMode() {
                vue.editArticleMode = true;
            },

            nonEditArticleMode() {
                vue.editArticleMode = false;
            }
            
        },
        created() {
            refreshList()
        },
        mounted() {
            $(document).trigger('vue-loaded');
        }
    })

    function refreshList() {
        axios.get('http://localhost:3000/api/articles')
        .then(({data}) => {
            vue.articlesArr = data;
        })
        .catch(function() {
            console.log("error")
        });
    }
})