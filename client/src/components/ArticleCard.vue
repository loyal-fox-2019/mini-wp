<template>
  <div id="container">
    <div class="card">
      <div class="image">
        <img
          :src="articleData.image"
          id="gambar"
          class="ui medium bordered image"
          alt="harusnya image"
        />
      </div>
      <div class="content">
        <div class="header text-primary" style="font-size: 1.4rem">{{articleData.title}}</div>
        <div class="meta">
          <a class="text-secondary">By: {{articleData.creator.name}}, {{tanggal}}</a>
        </div>
        <div class="description" style="margin: 15px 0">{{articleData.description}}</div>
      </div>
      <div class="extra content">
        <span>
          <i class="tags icon"></i>
          <span v-for="(tag, index) in articleData.tags" :key="index">
            <TagButton :btn="tag"></TagButton>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import TagButton from "./TagButton";
export default {
  name: "ArticleCard",
  components: { TagButton },
  props: ["articleData"],
  computed: {
    tanggal() {
      return new Date(this.articleData.created_at).toLocaleDateString();
    }
  }
};
</script>

<style scoped>
#container {
  width: 60vw;
  display: flex;
  justify-content: center;
  margin: 10px;
  border: 1px solid rgba(34, 27, 27, 0.507);
  padding: 5px 0;
}
#gambar {
  width: 58vw;
}
.card > div {
  margin: 9px;
}
</style>