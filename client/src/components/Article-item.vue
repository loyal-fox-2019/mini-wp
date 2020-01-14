<template>
  <div @click="showDetail">
    <div class="post-thumbnail">
      <img
        src="https://images.unsplash.com/photo-1569429379101-35f2598ece66"
        alt="..."
        class="img-fluid"
      />
    </div>
    <div class="post-details">
      <div class="post-meta d-flex justify-content-between">
        <div class="category">
          <a href="#">Business</a>
          <a href="#">Financial</a>
        </div>
      </div>
      <h1>
        <a href="#">
        test altas db
          <i class="fa fa-bookmark-o"></i>
        </a>
      </h1>
      <div class="post-footer d-flex align-items-center flex-column flex-sm-row">
        <a href="#" class="author d-flex align-items-center flex-wrap">
          <div class="avatar">
            <img src="https://image.flaticon.com/icons/svg/2431/2431970.svg" alt="..." class="img-fluid" />
          </div>
          <div class="title">
            <span>John Doe</span>
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
      <div class="post-body">
        <span>content article</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleItem",
  methods: {
    showDetail() {
      this.$emit('show-detail')
    }
  }
};
</script>

<style>
</style>
