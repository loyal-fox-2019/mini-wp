<template>
  <form v-on:submit.prevent="updateArticle">
    <div class="form-group">
      <label for="exampleFormControlInput1">Title</label>
      <input type="text" class="form-control" id="exampleFormControlInput1" v-model="title" />
    </div>
    <div class="form-group">
      <label for="exampleFormControlTextarea1">Content</label>
      <wysiwyg v-model="content"></wysiwyg>
      <!-- <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="content"></textarea> -->
    </div>
    <button type="submit" class="btn btn-danger">Save Changes</button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  created() {
    this.find();
  },
  props: ["dataArticle"],
  data: function() {
    return {
      title: "",
      content: ""
    };
  },
  methods: {
    find: function() {
      axios({
        method: "get",
        url: `http://localhost:3000/article/${this.dataArticle}`,
        headers: {
          token: localStorage.getItem("access_token")
        }
      }).then(({ data }) => {
        this.title = data.title;
        this.content = data.content;
      });
    },
    updateArticle: function() {
      axios({
        method: "patch",
        url: `http://localhost:3000/article/${this.dataArticle}`,
        data: {
          title: this.title,
          content: this.content
        },
        headers: {
          token: localStorage.getItem("access_token")
        }
      })
        .then(({ data }) => {
          this.$emit("page", "mine");
          Swal.fire({
            icon: "success",
            title: `berhasil mengedit artikel`,
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(err => {
          console.log(err.response.data);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.response.data.message
          });
        });
    }
  }
};
</script>

<style>
</style>