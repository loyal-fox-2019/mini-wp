<template>
  <div>
    <b-form enctype="multipart/form-data">
      <b-form-group label="Title:">
        <b-form-input v-model="title"></b-form-input>
      </b-form-group>

      <b-form-group label="Content">
        <areas id="ar" ref="myTextEditor"
          v-model="content"
          :config="editorOption">
        </areas>
      </b-form-group>
      <br><br><br>
      <b-form-group label="Tags">
          <b-form-tags
          v-model="tags"
          tag-variant="dark"
          tag-pills
          size="lg"
          separator=" "
          placeholder="Enter new tags"
          class="mb-2"
         ></b-form-tags>
      </b-form-group>

      <b-form-group label="image">
        <b-form-file v-on:change="uploadImage"></b-form-file>
      </b-form-group>

      <b-button type="submit" variant="primary" @click.prevent="post">Post</b-button>
      <b-button type="reset" variant="danger" @click.prevent="cancel">Cancel</b-button>
      <div>
   

      </div>
    </b-form>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
    data(){
        return{
          title: '',
          content: '',
          image: '',
          tags: '',
          editorOption: {}
        }
    },
    components: {
      areas: quillEditor
    },
    methods:{
        cancel: function(){
            this.$emit('cancel')
        },
        uploadImage: function(){
            this.image = event.target.files[0]
        },
        post:function(){
            let data = new FormData
            data.append('title', this.title)
            data.append('content', this.content)
            data.append('tag', this.tags)
            data.append('image', this.image)
            data.append('created_at', new Date())
            this.$emit('send', data)
        }
    }

}
</script>

<style>


#ar{
  height: 200px;
  background: white
}
</style>