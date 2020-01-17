<template>
  <div @click="showDetail" class="article-item">
    <div class="post-thumbnail">
      <img
        :src="article.featured_image"
        alt="..."
        class="img-fluid"
      />
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
            <img src="https://image.flaticon.com/icons/svg/2431/2431970.svg" alt="..." class="img-fluid" />
          </div>
          <div class="title">
            <span>{{article.author.username}}</span>
          </div>
        </a>
        <div class="d-flex align-items-center flex-wrap">
          <div class="date">
            <i class="icon-clock"></i> 2 months ago
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
              <li class="list-inline-item" v-for="(tag, i) in article.tags"
                @remove="removeTag(tag)"
                :key="i"
                :title="tag"> 
                <a href="#" class="tag">#{{tag}}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="post-body">
        <!-- <p>{{article.content.slice(0, 100)}} ...</p> -->
        <span v-html="article.content"></span>
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
      this.$emit('show-detail')
    }
  }
};
</script>

<style scoped>
.article-item {
  margin-bottom: 10vh
}
</style>
