<template>
  <b-navbar variant="faded" type="light" class="custom-navbar py-0 pl-0">
    <b-navbar-brand href="#" class="d-flex align-items-center custom-color pr-2">
      <img src="../assets/icon2.png" height="50" width="50" />
      GG-WP
    </b-navbar-brand>

    <b-navbar-nav class="ml-auto">
      <b-nav-item><span class="custom-color">Login</span></b-nav-item>
      <b-nav-item><span class="custom-color">Register</span></b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: 'nav-bar',
}
</script>

<style scoped>
.custom-navbar {
  background-color: rgb(0, 0, 0, 0.5) !important;
}

.custom-color {
  color: #6e8f8a !important;
}

.custom-color:hover {
  color: #a2b8b4 !important;
}
</style>
