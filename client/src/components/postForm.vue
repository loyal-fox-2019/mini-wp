<template>
  <b-form>
    <b-form-input 
      id="input-title"
      size="lg"
      placeholder="Article Title"
      style="font-size:50px;"
      class="mb-3"
      v-model="form.title"
    ></b-form-input>
    <vue-editor id="editor"
      useCustomImageHandler
      @image-added="uploadedImage"
      v-model="form.content"
    ></vue-editor>
    <b-form-input 
      id="input-tags"
      size="sm"
      placeholder="this,is,tags"
      class="mt-3"
      v-model="form.tags"
    ></b-form-input>
  </b-form>
</template>

<script>
import { VueEditor, Quill } from "vue2-editor";

export default {
  data() {
    return {
      form: {
        title: '',
        content: '',
        featured_image: '',
        tags: ''
      },
    }
  },
  methods: {
    saveArticle(status) {
      const {title, content, featured_image, tags} = this.form;

      axios({
        method: 'POST',
        url: `${this.$baseUrl}/articles`,
        headers:{
          token: localStorage.token
        },
        data: {
          title,
          content,
          featured_image,
          tags: tags.split(','),
          status
        }
      })
        .then(({data}) => {
          this.$swal({
            position: 'top-end',
            icon: 'success',
            title: 'Your article has been saved',
            showConfirmButton: false,
            timer: 1500
          })
          this.showUserPage();
        }).catch((err) => {
          console.log(err);
        });
    },
    uploadedImage(file, Editor, cursorLocation, resetUploader) { 
      let formData = new FormData();
      formData.append('file', file);

      axios({
        url: `${this.$baseUrl}/articles/image`,
        method: 'POST',
        headers:{
          token: localStorage.token
        },
        data: formData
      })
        .then(({data}) => {
          let url = data.filename;
          this.featured_image = url;
          Editor.insertEmbed(cursorLocation, "image", url);
          resetUploader();
        })
        .catch((err) => {
          console.log(err);
        })
    }
  },
  components: {
    VueEditor
  }
}
</script>

<style scoped>

</style>