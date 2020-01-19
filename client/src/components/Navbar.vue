<template>
  <b-navbar variant="faded" type="light" class="custom-navbar py-0 pl-0">
    <b-navbar-brand
      :to="username ? { path: '/user/all-articles' } : { path: '/' }"
      class="d-flex align-items-center custom-color pr-2"
    >
      <img src="../assets/icon2.png" height="50" width="50" />
      GG-WP
    </b-navbar-brand>

    <b-navbar-nav class="ml-auto d-flex align-items-center" v-if="username">
      <b-nav-item :to="{ path: '/user/all-articles' }">
        <b-nav-text class="custom-color">{{ username }}</b-nav-text>
      </b-nav-item>
      <b-nav-item>
        <b-button size="sm" squared class="custom-btn-color" @click="logout"
          >Logout</b-button
        >
      </b-nav-item>
    </b-navbar-nav>

    <b-navbar-nav class="ml-auto" v-else>
      <b-nav-item :to="{ path: '/login' }" class="text-decoration-none">
        <span class="custom-color">Login</span>
      </b-nav-item>
      <b-nav-item :to="{ path: '/register' }" class="text-decoration-none">
        <span class="custom-color">Register</span>
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: 'nav-bar',
  props: ['username'],
  methods: {
    logout() {
      this.$swal.fire({
        icon: 'success',
        title: 'Logged out...',
        timer: 1250,
        showConfirmButton: false,
      })
      this.$emit('updateUserStatus', {})
      this.$router.push('/')
    },
  },
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

.custom-btn-color {
  background-color: #6e8f8a !important;
  border: #6e8f8a !important;
  border-color: #6e8f8a !important;
}

.custom-btn-color:hover {
  background-color: #a2b8b4 !important;
  border: #a2b8b4 !important;
  border-color: #a2b8b4 !important;
}
</style>
