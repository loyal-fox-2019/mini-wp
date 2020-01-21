<template>
    <div>
        <p class="h3">Add Article</p>
        <form id="formInputArticle" enctype="multipart/form-data">
            <div class="form-row mb-2" style="width: 800px;">
                <input type="text" class="form-control mb-2" placeholder="Title" v-model="title">
                <textarea id="idContentTextArea" class="form-control" rows="10" cols="30" aria-label="With textarea" placeholder="Content" v-model="content"></textarea>
            </div>
            <p class="h6">Choose file to upload :</p>
            <input type="file" name="file" v-on:change="upload">
            <div class="d-flex justify-content-around">
                <div>
                    <button type="submit" id="btnAddArticle" class="btn btn-primary mb-2" v-on:click.prevent="addArticle">Save Article</button>
                </div>
                <div>
                    <button type="submit" id="btnCancelAdd" class="btn btn-warning mb-2" v-on:click.prevent="page='article'">Cancel</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            htmlPort: 'http://localhost:3000',
            title: '',
            content: '',
            file: '',
            page: '',
        }
    },
    methods: {
        addArticle: function() {
            let obj = new FormData;
            obj.append('title', this.title);
            obj.append('content', this.content);
            obj.append('file', this.file);
            axios({
                url: `${htmlPort}/article`,
                method: 'post',
                data: obj,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(({ data }) => {
                this.title = '';
                this.content = '';
                this.page = 'article';
            })
            .catch(err => {
                console.log(err.message);
            });
        },
        upload: function() {
            this.file = event.target.files[0];
        },

    }
}
</script>

<style scoped>

</style>