<template>
  <div class="container">
    <div class="container">
      <h1>{{ title }}</h1>
      <!-- <wysiwyg v-model="content"></wysiwyg> -->
      <p>{{content}}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  created() {
    this.find();
  },
  props: ["dataSpecific"],
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
        url: `http://localhost:3000/article/${this.dataSpecific}`,
        headers: {
          token: localStorage.getItem("access_token")
        }
      })
        .then(({ data }) => {
          this.title = data.title;
          this.content = data.content;
        })
        .catch(err => {
          console.log(err.response.data);
        });
    }
  }
};
</script>

<style>
</style>