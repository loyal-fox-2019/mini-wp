<template>
  <div>
    <div class="container-fluid">
      <form
        class="border border-light p-5"
        @submit.prevent="createArticle"
        action="/upload-single"
        method="post"
        enctype="multipart/form-data"
      >
        <p class="h4 mb-4 text-center">Add Article</p>
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
        <button class="btn btn-info btn-block my-4" type="submit">add Article</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "addArticle",
  data() {
    return {
      id: "",
      title: "",
      content: null,
      featured_image: null
    };
  },
  methods: {
    createArticle() {
      console.log(localStorage.getItem("token"));
      let content = this.content.root.innerHTML;
      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("content", this.content);
      formData.append("featured_image", this.featured_image);
      axios({
        url: "http://localhost:3000/articles",
        method: "POST",
        data: formData,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.dataArticles.push(data);
          this.title = "";
          this.content = "";
          this.featured_image = "";
        })
        .catch(err => {
          console.log(err);
        });
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