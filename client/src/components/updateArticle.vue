<template>
  <div>
    <div class="container-fluid">
      <form
        class="border border-light p-5"
        @submit.prevent="updateArticle"
        action="/upload-single"
        method="post"
        enctype="multipart/form-data"
      >
        <p class="h4 mb-4 text-center">Update Article</p>
        <label for="textInput">Title</label>
        <input
          v-model="title"
          type="text"
          id="textInput"
          class="form-control mb-4"
          placeholder="Your Title"
        />
        <label for="textarea">Content</label>
        <div id="textarea" class="form-control mb-4" placeholder="Your Content"></div>
        <div class="input-group mb-4">
          <div class="custom-file">
            <input
              v-on:change="handleFileUpload"
              name="featured_image"
              type="file"
              class="form-control-file"
              id="exampleFormControlFile1"
            />
          </div>
        </div>
        <button class="btn btn-info btn-block my-4" type="submit">Update Article</button>
        <button class="btn btn-info btn-block my-4" @click="goback" type="button">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "updateArticle",
  data() {
    return {
      idArticle: "",
      title: "",
      content: null,
      featured_image: null
    };
  },
  methods: {
    updateArticle() {
      let content = this.content.root.innerHTML;
      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("content", content);
      formData.append("featured_image", this.featured_image);
      this.idArticle = this.$root.articleId;
      axios({
        url: `http://localhost:3000/articles/${this.idArticle}`,
        method: "PATCH",
        data: formData,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.$root.clearArtilce;
          this.$emit("submitArticle");
          Swal.fire("Success Update Article", "success");
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.message
          });
        });
    },
    goback() {
      this.$emit("getBack");
    },
    quillInit() {
      this.content = new Quill("#textarea", {
        theme: "snow"
      });
    },
    handleFileUpload(event) {
      this.featured_image = event.target.files[0];
    }
  },
  mounted() {
    this.quillInit();
  }
};
</script>

<style scoped>
.border.border-light.p-5 {
  padding: 40px 200px 1px !important;
}
div.form-control {
  height: 200px;
}
.btn.btn-block {
  margin: auto;
}
</style>