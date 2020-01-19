<template>
  <div id="container">
    <div class="card">
      <div class="image">
        <img :src="articleData.image" />
      </div>
      <div class="content">
        <div class="header">{{articleData.title}}</div>
        <div class="meta">
          <a class="text-secondary">{{articleData.creator.name}}</a>
        </div>
        <div class="description">{{articleData.description}}</div>
      </div>
      <div class="extra content">
        <span class="right floated">{{articleData.created_at}}</span>
        <span>
          <i class="tags icon"></i>
          <span v-for="(tag, index) in articleData.tags" :key="index">{{tag}}</span>
        </span>
      </div>
      <div class="extra content">
        <span class="right floated">{{articleData.created}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleCard",
  props: ["articleData"]
};
</script>

<style scoped>
#container{
    width: 60vw;
}
</style>