<template>
  <div>
    <form class="center p-5">
      <div class="form-group">
        <label for="title">
          <h4>Title</h4>
        </label>
        <input
          type="text"
          class="form-control"
          id="title"
          placeholder="Enter title"
          v-model="title"
        />
      </div>
      <quill-editor
        class="konten"
        v-model="content"
        ref="quillEditorA"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
      ></quill-editor>

      <b-form-file
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
        name="file"
        v-on:change="uploadGambar"
      ></b-form-file>
      <div class="row justify-content-end mt-3">
        <a class="btn btn-primary text-white mt-3" v-on:click="publish">Save!</a>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Axios from "axios";
export default {
  name: "createArticle",
  data() {
    return {
      content: "",
      title: "",
      file: "",
      editorOption: {
        theme: "snow"
      },
      baseUrl: "http://localhost:3000"
    };
  },
  components: {
    LocalQuillEditor: VueQuillEditor.quillEditor
  },
  methods: {
    uploadGambar(e) {
      this.file = e.target.files[0];
    },
    onEditorBlur(quill) {
      //   console.log("editor blur!", quill);
    },
    onEditorFocus(quill) {
      //   console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      //   console.log("editor ready!", quill);
    },
    publish() {
      let url = this.baseUrl;
      let content = this.content;
      let title = this.title;
      let formData = new FormData();
      let description = this.description;
      let file = this.file;
      formData.append("formData", formData);
      formData.append("content", content);
      formData.append("title", title);
      formData.append("file", file);

      axios({
        method: "POST",
        url: `${url}/publish`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: formData
      })
        .then(created => {
          this.$emit("backToHome");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.konten {
  height: 60vh;
}
</style>