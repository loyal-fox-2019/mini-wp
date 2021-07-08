<template>
  <div
    class="container d-flex align-items-center justify-content-center custom-container"
    v-else
  >
    <b-card class="rounded-0 custom-card text-center text-light">
      <b-card-title>
        <h1>Create An Article In Minutes</h1>
      </b-card-title>
      <hr class="border border-dark" />
      <b-card-text class="lead mb-0">
        GG-WordPress gives you everything you need to start write an article
        today.
      </b-card-text>
      <b-button
        :to="{ path: '/login' }"
        variant="dark"
        squared
        class="custom-color lead mt-4"
        >Write now</b-button
      >
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'landing-component',
}
</script>

<style scoped>
.custom-container {
  height: 90%;
}

.custom-color {
  background-color: #6e8f8a !important;
  border: #6e8f8a !important;
  border-color: #6e8f8a !important;
}

.custom-color:hover {
  background-color: #a2b8b4 !important;
  border: #a2b8b4 !important;
  border-color: #a2b8b4 !important;
}

.custom-card {
  background-color: rgb(0, 0, 0, 0.1) !important;
}
</style>
