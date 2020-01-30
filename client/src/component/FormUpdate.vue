<template>
      <div class="content-wrapper">
            <div class="container-fluid">
                <h1>update article:</h1>
                <form v-on:submit.prevent="update">
                    <div class="form-group">
                        <label for="imputTitle">Title:</label>
                        <input type="text" class="form-control" id="exampleInputPassword1" v-model="articleEdit.title">
                    </div>
                    <div class="form-group">
                        <label for="demo">Content</label
                        <wysiwyg v-model="articleEdit.content" />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
      </div>
</template>
<script>
export default {
    data(){
        return {
            title: null,
            content: null,
            idArticle: null,
            dataArticle: null
        }
    },
    props: {
        
        articleEdit: {
            type: Object
        }
    },
    methods: {
        update(){
            axios.put(`http://localhost:3000/miniwp/article/${this.articleEdit._id}`, {
                title: this.articleEdit.title,
                content: this.articleEdit.content
            },
            {
                headers:{
                    Authorization: localStorage.getItem('token')
                }
            }
            )
            .then(response => {
                console.log(response)
                this.$emit('showArticle', 'listArticle')
            })
            .catch(error => {
                this.error = error.response.data.message
            })
        }
    }
}
</script>