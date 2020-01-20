<template>
  <div class='container'>
    <div class="row">
      <div class="col-12 mx-auto m-5">
          <div class="bg-white shadow p-5 mb-5 bg-white rounded img-fluid" alt="Responsive image">
            <form class="p-3">
              <div class="form-group">
                <h2> New Post</h2>
                <input v-model="title" type="text" class="form-control" id="contentTitle" placeholder="Mary Had A Little Lamb">
              </div>
              <wysiwyg v-model="content"></wysiwyg>
              <vue-tags-input
                class="mt-3"
                v-model="tag"
                :tags="tags"
                @tags-changed="newTags => tags = newTags"
              ></vue-tags-input>
              <div class="custom-file mt-3">
                <input @change="imageDrop" type="file" class="custom-file-input" id="customFile">
                <label class="custom-file-label" for="customFile">Choose file</label>
              </div>
              <div class="centerBlock">
                <h1 @click="draftArticle" class="btn-submit btn btn-secondary mt-3">Draft</h1>
                <h1 @click="publishArticle" class="btn-submit btn btn-primary mt-3">Publish</h1>
              </div>
            </form>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import VueTagsInput from '@johmun/vue-tags-input';

export default {
    name : "create-form",
    components : {
      VueTagsInput,
    },
    data(){
      return {
        title : '',
        content : '',
        file : '',
        status : false,
        tag: '',
        tags: [],
      }
    },
    methods : {
      imageDrop(){
        console.log('masuk image drop')
        this.file = event.target.files[0]
        console.log(this.file)
      },
      publishArticle(){
        this.status = true
        this.sendArticle()
      },
      draftArticle(){
        console.log("masuk draft article")
        this.status = false
        this.sendArticle()
      },
      sendArticle(){
        console.log('masuk create article')
        let formData = new FormData;
        formData.append('title', this.title);
        formData.append('content', this.content);
        formData.append('created_at', new Date);
        formData.append('file', this.file);
        formData.append('author', localStorage.author);
        formData.append('status', this.status);
        this.tags.forEach(tag => {
          formData.append('tags[]', tag.text);
        });

        axios({
          url : 'http://localhost:3000/article/',
          method : 'post',
          headers : {
            token : localStorage.token
          },
          data : formData
        })
        .then(({data})=>{
          console.log('berhasil upload')
          this.$emit('uploaded','article-content',data)
        })
        .catch(err =>{
          console.log('gagal upload')
          console.log(err)
        })
      }
    }
}
</script>

<style>
.btn-submit{
  width: 240px;
}
.centerBlock {
  display: table;
  margin: auto;
}
</style>