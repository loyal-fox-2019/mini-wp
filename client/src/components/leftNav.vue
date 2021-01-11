<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-2 bg-light responseVertical" id="col-left">
          <div
            class="nav flex-column nav-pills"
            id="v-list-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            <a
              class="nav-link active"
              id="blogPost-tab"
              data-toggle="pill"
              href="#blogPost"
              @click="blogPost"
              role="tab"
              aria-controls="blogPost"
              aria-selected="false"
            >Blog Posts</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "leftNav",
  methods: {
    blogPost() {
      this.$emit("showPost");
    }
  }
};
</script>

<style>
</style>