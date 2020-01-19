<template>
  <a href="#" @click.prevent="signOut()">Sign out</a>
</template>

<script>
export default {
  methods: {
    signOut() {
      const auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        this.$emit('authenticated', false);
      });
    },
  },
};
</script>
