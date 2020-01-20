<template>
  <!-- Edit Articles -->
  <b-card class="mt-5" header="Edit Article">
    <b-form>
      <b-form-group label="Title:" label-for>
        <b-form-input type="text" required placeholder="Article's Title" v-model="article.title"></b-form-input>
      </b-form-group>

      <b-form-group label="Content:" label-for>
        <vue-editor v-model="article.content"></vue-editor>
      </b-form-group>

      <div>
        <label class="my-2">Featured Image</label>
        <span>
          <img :src="article.image" alt />
        </span>
        <b-form-file
          @change="onFileChange"
          :state="Boolean(article.featuredImage)"
          placeholder="Choose a file ..."
          drop-placeholder="Drop file here..."
          action="/upload-single"
          method="post"
          enctype="multipart/form-data"
          class="mb-3"
        ></b-form-file>
      </div>

      <b-button type="submit" variant="primary" @click.prevent="updateArticle(articleData)">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </b-card>
  <!-- End of edit articles -->
</template>

<script>
import axios from "axios";
export default {
  name: "EditArticle",
  data() {
    return {
      article: {
        title: "",
        content: "",
        featuredImage: "",
        image: ""
      }
    };
  },
  props: ["articleData"],
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.newArticle.featuredImage = file;
      this.newArticle.image = URL.createObjectURL(file);
    },
    updateArticle(value) {
      console.log(value);
      // axios({
      //     method: 'put',
      //     url: `http://localhost:3000/update/${id}`
      // })
    }
  }
};
</script>

<style>
</style>