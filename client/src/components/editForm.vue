<template>
  <div class="all">
    <div class="row tengahGambar">
      <div class="col">
        <img :src="file" alt="image" class="gambar" />
      </div>
    </div>
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
        ref="quillEditorA"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
        v-model="content"
      ></quill-editor>

      <b-form-file
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
        name="file"
        v-on:change="uploadGambar"
      ></b-form-file>
      <div class="row justify-content-end mt-3">
        <a class="btn btn-primary text-white mt-3" v-on:click="confirmEdit">Save Change!</a>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Axios from "axios";
export default {
  name: "createArticle",
  props: ["willEdit"],
  data() {
    return {
      content: this.willEdit.content,
      title: this.willEdit.title,
      file: this.willEdit.file,
      id: this.willEdit._id,
      author: this.willEdit.author,
      editorOption: {
        theme: "snow"
      },
      // baseUrl: "http://localhost:3000"
      baseUrl: "http://miniwp-server.amadyanissa.my.id:3000"
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
    confirmEdit() {
      let url = this.baseUrl;
      let id = this.id;
      let formData = new FormData();
      let file = this.file;
      let title = this.title;
      let content = this.content;
      let author = this.author;
      formData.append("formData", formData);
      formData.append("content", content);
      formData.append("title", title);
      formData.append("file", file);
      // console.log(id);
      axios({
        method: "PUT",
        url: `${url}/editArticle/${id}`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: formData
      })
        .then(updated => {
          this.$emit("goback");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.all {
  max-width: 80vw;
}
.konten {
  height: 60vh;
}

.gambar {
  max-height: 50vh;
}

.tengahGambar {
  width: 70%;
  margin: 0 auto;
  padding: 20px;
}
</style>