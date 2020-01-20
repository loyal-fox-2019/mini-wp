<template>
  <div class="form-article">
    <h3>Add New Article</h3>
    <hr />
    <form enctype="multipart/form-data">
      <div class="form-group">
        <label for="title">Article Title</label>
        <input
          type="text"
          id="title"
          class="form-control form-width-text"
          v-model="title"
          autocomplete="off"
        />
      </div>
      <div class="form-group">
        <label for="content">Content</label>
        <quill-editor
          class="form-width-textarea"
          ref="myTextEditor"
          v-model="content"
          :config="editorOption"
        ></quill-editor>
      </div>
      <div class="form-group">
        <label for="thumbnail">Thumbnail</label>
        <input type="file" class="form-control-file" id="thumbnail" @change="upload" />
      </div>
      <button class="btn btn-primary" @click.prevent="addArticle">Add Article</button>
    </form>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import Swal from "sweetalert2";
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      thumbnail: "",
      title: "",
      content: "",
      content: "",
      editorOption: {}
    };
  },
  methods: {
    upload() {
      this.thumbnail = event.target.files[0];
    },
    addArticle() {
      let form = new FormData();
      form.append("title", this.title);
      form.append("content", this.content);
      form.append("thumbnail", this.thumbnail);
      axios({
        method: "post",
        headers: {
          token: localStorage.getItem("token")
        },
        url: "http://localhost:3000/articles",
        data: form,
        validateStatus: function(status) {
          return status < 404;
        }
      })
        .then(articleadd => {
          if (articleadd.status === 201) {
            this.thumbnail = "";
            this.title = "";
            this.content = "";
            Swal.fire({
              icon: "success",
              title: "Successfully Add Article"
            });
          } else {
            console.log(articleadd);
            Swal.fire({
              icon: "error",
              title: articleadd.data.message
            });
          }
        })
        .catch(ok => {
          alert(ok);
        });
    }
  }
};
</script>

<style scoped>
.form-article {
  padding: 15px 5px;
  height: calc(100vh - 49px);
  width: 100%;
  overflow-y: scroll;
}
.form-width-text {
  width: 55%;
}
.form-width-textarea {
  width: 75%;
}
.form-upload {
  width: 40%;
}
</style>