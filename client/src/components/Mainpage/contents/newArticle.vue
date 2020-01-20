<template>
    <div>
        <h1>New post</h1>
            <form method="post" enctype="multipart/form-data" @submit.prevent="saveArticle">
                <input type="text" v-model="title" placeholder="Article title"><br>
                <input type="text" v-model="slug" placeholder="Article slug"><br>
                Featured image: <input type="file" name="file" ref="file" @change="handleFile">
                <button id="save-btn" type="submit">Save article</button><br>

                <!-- <textarea v-model="content" cols="90" rows="20" placeholder="Article body"></textarea> -->
                <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption">
                </quill-editor>
                <br>

                <button id="save-btn" type="submit">Save article</button>
            </form>

            

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
                file: "",

                editorOption: {
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block'],
                            [{ 'header': 1 }, { 'header': 2 }],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            [{ 'script': 'sub' }, { 'script': 'super' }],
                            [{ 'indent': '-1' }, { 'indent': '+1' }],
                            [{ 'direction': 'rtl' }],
                            [{ 'size': ['small', false, 'large', 'huge'] }],
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            [{ 'font': [] }],
                            [{ 'color': [] }, { 'background': [] }],
                            [{ 'align': [] }],
                            ['clean']
                        ]
                    }
                }
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
            },            
            onEditorChange({ quill, html, text }) {
                console.log('editor change!', quill, html, text)
                this.content = html
            }            
        },
    }
</script>

<style scoped>
quill-editor {
    height: 50vw;
}
</style>