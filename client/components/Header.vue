<template>
  <header class="container">
    <b-navbar>
      <b-navbar-nav>
        <b-navbar-brand>Mini WordPress</b-navbar-brand>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-button
          v-show="state !== 0 && state !== 1"
          v-on:click="$emit('userSignOut')"
          >Log Out</b-button
        >
      </b-navbar-nav>
    </b-navbar>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    state: Number
  }
};
</script>

<style></style>
