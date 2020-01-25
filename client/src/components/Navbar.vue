<template>
  <nav class="nav d-flex justify-content-between bg-danger" id="nav-tab">
    <div class="d-flex" id="left-nav">
      <a class="nav-link active" href="#" @click="writePage('mine')">
        <i class="fas fa-ghost"></i> My Site
      </a>
      <a class="nav-link active" href="#" @click="writePage('all')">
        <i class="far fa-newspaper"></i> Reader
      </a>
    </div>
    <div class="d-flex" id="right-nav">
      <button type="button" class="btn btn-light mr-4 mt-1 mb-1" @click="writePage('write')">
        <i class="far fa-sticky-note"></i> Write
      </button>
      <a class="nav-link mt-1" href="#" @click="logOut">
        <i class="fas fa-sign-out-alt"></i>
      </a>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    writePage: function(page) {
      this.$emit("page", page);
    },
    logOut: function() {
      this.$emit("page", "log-out");
    }
  }
};
</script>

<style>
</style>