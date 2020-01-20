<template>
  <!-- Create Articles -->
  <b-card class="mt-5" header="Create Article">
    <b-form>
      <b-form-group label="Title:" label-for>
        <b-form-input type="text" required placeholder="Article's Title" v-model="newArticle.title"></b-form-input>
      </b-form-group>

      <b-form-group label="Content:" label-for>
        <vue-editor v-model="newArticle.content"></vue-editor>
      </b-form-group>

      <div>
        <label class="my-2">Featured Image</label>
        <span>
          <img :src="newArticle.image" alt />
        </span>
        <b-form-file
          @change="onFileChange"
          :state="Boolean(newArticle.featuredImage)"
          placeholder="Choose a file ..."
          drop-placeholder="Drop file here..."
          action="/upload-single"
          method="post"
          enctype="multipart/form-data"
          class="mb-3"
        ></b-form-file>
      </div>

      <b-button type="submit" variant="primary" @click.prevent="createArticle">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </b-card>
  <!-- End of create articles -->
</template>

<script>
import axios from "axios";
import { VueEditor } from "vue2-editor";
export default {
  name: "CreateArticle",
  data() {
    return {
      newArticle: {
        title: null,
        content: null,
        featuredImage: null,
        image: null
      }
    };
  },
  components: {
    VueEditor
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.newArticle.featuredImage = file;
      this.newArticle.image = URL.createObjectURL(file);
    },
    createArticle() {
      const fd = new FormData();
      fd.append("image", this.newArticle.featuredImage);
      fd.append("title", this.newArticle.title);
      fd.append("content", this.newArticle.content);
      axios({
        method: "post",
        url: "http://localhost:3000/articles/add",
        headers: {
          token: localStorage.getItem("token")
        },
        data: fd
      })
        .then(({ data }) => {
          console.log(data);
          this.$emit("toDashboard");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>