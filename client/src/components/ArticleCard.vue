<template>
  <div class="card mb-2 custom-card">
    <div class="row no-gutters">
      <div class="col-md-2" :style="styles">
      </div>
      <div class="col-md-9 text-light">
        <div class="card-body pb-1">
          <h4 class="card-title mb-0 text-capitalize">Ceritanya nanti jadi judul ya</h4>
          <p class="card-text mb-0">
            <small class="font-italic">Last updated 3 mins ago</small>
          </p>
          <p class="card-text">By Author</p>
          <p class="card-text text-truncate lead">
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </p>
          <div>
            <b-badge href="#" variant="light">Javascript</b-badge>
            <b-badge href="#" variant="light">Python</b-badge>
            <b-badge href="#" variant="light">Java</b-badge>
            <b-badge href="#" variant="light">C++</b-badge>
            <b-badge href="#" variant="light">C#</b-badge>
            <b-badge href="#" variant="light">Typescript</b-badge>
            <b-badge href="#" variant="light">HTML</b-badge>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'article-card',
  data: function() {
    return {
      styles: {
        background: `url(${this.imgSrc})`,
        'background-size': 'inherit',
        'background-repeat': 'no-repeat'
      }
    }
  },
  props: ['imgSrc']
}
</script>

<style scoped>
.custom-card {
  background-color: rgb(0, 0, 0, 0.1) !important;
}
</style>
