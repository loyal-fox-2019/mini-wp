<template>
  <div>
    <h1>User Page</h1>
    <g-login-button class="d-none"></g-login-button>
    <g-logout-button @authenticated="getAuth"></g-logout-button>
  </div>
</template>

<script>
import GLoginButton from './components/GLoginButton';
import GLogoutButton from './components/GLogoutButton';
import googleMixin from './mixins/googleMixin';

export default {
  methods: {
    getAuth(val) {
      if (!val) {
        const Toast = this.$swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', this.$swal.stopTimer)
            toast.addEventListener('mouseleave', this.$swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'success',
          title: 'Log out successfully'
        });

        this.$router.replace({ name: "login-page" });
      }
    }
  },
  components: {
    GLoginButton,
    GLogoutButton
  },
  mounted() {
    googleMixin.renderButton();
  },
  mixins: [googleMixin]
}
</script>

<style scoped>

</style>