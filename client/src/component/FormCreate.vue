<template>
    <div class="container-fluid">
        <h1>create article:</h1>
        <form v-on:submit.prevent="save">
            <div class="form-group">
                <label for="imputTitle">Title:</label>
                <input type="text" class="form-control" id="exampleInputPassword1" placeholder="title" v-model="title">
            </div>
            <div class="form-group">
                <label for="editor">Content</label>   
                <textarea class="form-control" rows="3" v-model="content"></textarea>
            </div>
            <button type="submit" class="btn btn-primary" >Submit</button>
        </form>
    </div>
</template>

<script>

export default {
    data(){
        return {
            title: null,
            content: null
        }
    },
    methods: {
        save(){
            const fd = new FormData()
            fd.append
            axios.post('http://localhost:3000/miniwp/article/new', {
                title: this.title,
                content: this.content
            },
            {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            .then(response => {
            })
            .catch(error => {
                this.error = error.response.data.message
            })
        }
    }
}
</script>