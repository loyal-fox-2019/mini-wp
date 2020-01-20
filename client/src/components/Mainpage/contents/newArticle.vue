<template>
    <div>
        <h1>New post</h1>
            <form method="post" enctype="multipart/form-data" @submit.prevent="saveArticle">
                <input type="text" v-model="title" placeholder="Article title"><br>
                <input type="text" v-model="slug" placeholder="Article slug"><br>
                Featured image: <input type="file" name="file" ref="file" @change="handleFile">
                <button id="save-btn" type="submit">Save article</button><br>
                <textarea v-model="content" cols="90" rows="20" placeholder="Article body"></textarea><br>
                <button id="save-btn" type="submit">Save article</button>
            </form>

            <!-- Quill editor -->
            <!-- <div class="editor"></div> -->
    </div>
</template>

<script>
    import axiosReq from "../../../config/axiosReq"
    export default {
        name: "newArticle",
        data() {
            return {
                title: "",
                slug: "",
                content: "",
                file: ""
            }
        },
        methods: {
            saveArticle() {
                let fd = new FormData();
                fd.append('title',this.title);
                fd.append('slug',this.slug);
                fd.append('content',this.content);
                fd.append('file',this.file);

                axiosReq({
                    method: "POST",
                    url: "/api/articles",
                    headers: {
                        token: this.$cookies.get('token'),
                        'content-type': 'multipart/form-data'
                    },
                    data: fd
                })
                .then(({data}) => {
                    console.log(data);
                    this.title = "";
                    this.slug = "";
                    this.content = "";

                    this.$emit('viewArticle',data._id);
                })
                .catch((err) => {
                    console.log(err);
                    
                    this.title = "";
                    this.slug = "";
                    this.content = "";
                })
            },
            handleFile() {
                this.file = this.$refs.file.files[0];
                console.log(this.file)
            }
        }
    }
</script>

<style scoped>

</style>