<template>
  <div class="center justify-content-center">
    <div class="row">
      <img :src="file" class="image" alt />
    </div>
    <div class="row flex-column">
      <div class="col-8">
        <h1>{{title}}</h1>
      </div>
      <div class="col-3">
        <p>Written by {{author}}</p>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p v-html="content"></p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "oneArticle",
  props: ["seeOne"],
  data() {
    return {
      title: this.seeOne.title,
      content: this.seeOne.content,
      file: this.seeOne.file,
      author: this.seeOne.author
    };
  },
  methods: {
    seeThis() {}
  }
};
</script>

<style scoped>
.center {
  margin: 80px 0;
  position: absolute;
  top: 60%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 80%;
}

.image {
  max-height: 200px;
  max-width: 400px;
}
</style>