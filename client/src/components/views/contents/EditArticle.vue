<template>
  <!-- Edit Articles -->
  <b-card class="mt-5" header="Edit Article">
    <b-form>
      <b-form-group label="Title:" label-for>
        <b-form-input
          type="text"
          required
          placeholder="Article's Title"
          v-model="article.title"
          :value="upcomingUpdate.title"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Content:" label-for>
        <vue-editor
          v-model="article.content"
          :value="upcomingUpdate.content"
        ></vue-editor>
      </b-form-group>
      <div>
        <div class="flex flex-col align-items-center">
          <label class="my-2">Featured Image</label>
          <img :src="article.image" :alt="upcomingUpdate.featured_image" />
        </div>
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

      <b-button type="submit" variant="primary" @click.prevent="updateArticle"
        >Submit</b-button
      >
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </b-card>
  <!-- End of edit articles -->
</template>

<script>
import axios from "axios";
import { VueEditor } from "vue2-editor";
export default {
  name: "EditArticle",
  data() {
    return {
      article: {
        title: this.upcomingUpdate.title,
        content: this.upcomingUpdate.content,
        featuredImage: this.upcomingUpdate.featured_image,
        image: this.upcomingUpdate.featured_image
      }
    };
  },
  components: {
    VueEditor
  },
  props: ["upcomingUpdate"],
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.article.featuredImage = file;
      this.article.image = URL.createObjectURL(file);
    },
    updateArticle() {
      const fd = new FormData();
      fd.append("image", this.article.featuredImage);
      fd.append("title", this.article.title);
      fd.append("content", this.article.content);
      axios({
        method: "put",
        url: `http://localhost:3000/articles/update/${this.upcomingUpdate._id}`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: fd
      })
        .then(({ data }) => {
          console.log(data);
          this.$emit("toMyArticles", true);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style></style>
