<template>
  <div class="article-item">
    <div class="post-thumbnail">
      <img :src="article.featured_image" alt="..." class="img-fluid" />
    </div>
    <div class="post-details">
      <h1>
        {{article.title}}
        <a href="#">
          <i class="fa fa-bookmark-o"></i>
        </a>
      </h1>
      <div class="post-footer d-flex align-items-center flex-column flex-sm-row">
        <a href="#" class="author d-flex align-items-center flex-wrap">
          <div class="avatar">
            <img
              src="https://image.flaticon.com/icons/svg/2431/2431970.svg"
              alt="..."
              class="img-fluid"
            />
          </div>
          <div class="title">
            <span>{{article.author.username}}</span>
          </div>
        </a>
        <div class="d-flex align-items-center flex-wrap">
          <div class="date">
            <i class="icon-clock"></i> {{article.createdAt.split('T')[0]}}
          </div>
          <div class="views">
            <i class="icon-eye"></i> 500
          </div>
          <div class="comments meta-last">
            <i class="icon-comment"></i>12
          </div>
        </div>
      </div>
      <div class="post-meta">
        <div class="category">
          <div class="widget tags border-0 m-0">
            <ul class="list-inline">
              <li
                class="list-inline-item"
                v-for="(tag, i) in article.tags"
                @remove="removeTag(tag)"
                :key="i"
                :title="tag"
              >
                <a href="#" class="tag" @click.prevent="searchTag(tag)">#{{tag}}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="position-relative">
        <div class="post-body-overlay position-absolute"></div>
        <div class="post-body">
          <span v-html="article.content"></span>
        </div>
      </div>
      <div class="text-center">
        <a href="articles" class="h3" @click.prevent="showDetail">Continue Reading ..?</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleItem",
  props: {
    article: Object
  },
  methods: {
    showDetail() {
      this.$emit("show-detail", this.article);
    },
    searchTag(payload) {
      this.$emit('search-tag', payload)
    }
  }
};
</script>

<style scoped>
.article-item {
  margin-bottom: 10vh;
}
.post-body {
  height: 200px;
  overflow: hidden;
}
.post-body-overlay {
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 10;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0) 100%
  );
}
</style>
