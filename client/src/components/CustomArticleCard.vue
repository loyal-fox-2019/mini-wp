<template>
  <div class="card mb-2 custom-card">
    <div class="row no-gutters">
      <div class="col-md-2" :style="styles"></div>
      <div class="col-md-10 text-light">
        <div class="card-body pb-1">
          <h4 class="card-title mb-0 text-capitalize">
            {{ title }}
          </h4>
          <p class="card-text mb-0">
            <small class="font-italic">{{ createdAt }}</small>
          </p>
          <p class="card-text">By {{ author.username }}</p>
          <p class="card-text text-truncate lead" v-html="content"></p>
          <div class="mb-2" v-if="!tags"></div>
          <div v-else class="mb-2">
            <b-badge
              href="#"
              variant="light"
              v-for="(tag, index) in tags"
              :key="index"
              class="mr-1"
              >{{ tag }}</b-badge
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'custom-article-card',
  data: function() {
    return {
      styles: {
        background: `url(${this.imgSrc})`,
        'background-size': 'cover',
        'background-repeat': 'no-repeat',
      },
    }
  },
  props: [
    'id',
    'imgSrc',
    'title',
    'content',
    'createdAt',
    'tags',
    'author',
  ],
}
</script>

<style scoped>
.custom-card {
  background-color: rgb(0, 0, 0, 0.3) !important;
}
</style>
