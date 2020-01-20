<template>
  <div>
    <form class="center p-5">
      <div class="form-group">
        <label for="title">
          <h4>Title</h4>
        </label>
        <input type="text" class="form-control" id="title" placeholder="Enter title" />
      </div>
      <b-form-file
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
        name="file"
        v-on:change="uploadGambar"
      ></b-form-file>
      <div class="row justify-content-center mt-3">
        <a class="btn btn-primary text-white mt-3" v-on:click="editNow">Save Change!</a>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import ckeditor from "@ckeditor/ckeditor5-vue";
// import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";

// import EssentialsPlugin from "@ckeditor/ckeditor5-essentials/src/essentials";
// import BoldPlugin from "@ckeditor/ckeditor5-basic-styles/src/bold";
// import ItalicPlugin from "@ckeditor/ckeditor5-basic-styles/src/italic";
// import LinkPlugin from "@ckeditor/ckeditor5-link/src/link";
// import ParagraphPlugin from "@ckeditor/ckeditor5-paragraph/src/paragraph";

// Vue.use(CKEditor);
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  name: "newArticle",
  components: {
    ckeditor
  },
  methods: {
    uploadGambar(e) {
      this.file = e.target.files[0];
    },
    editNow() {
      let id = this.data._id;
      let title = this.title;
      console.log(id, "id");
      console.log(title, "title");

      let base = "http://localhost:3000";
      // axios({
      //   method: "put",
      //   url: `${base}/editArticle/${id}`,
      //   headers: {
      //     token: localStorage.getItem("token")
      //   },
      //   data: {
      //     content,
      //     title,
      //     file,
      //     author
      //   }
      // })
      //   .then(updated => {
      //     console.log(updated);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    }
  },
  data() {
    return {};
  },
  props: ["data"]
};
</script>