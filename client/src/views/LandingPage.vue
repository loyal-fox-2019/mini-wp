<template>
  <LandingComponent></LandingComponent>
</template>

<script>
import LandingComponent from '../components/LandingComponent.vue'

export default {
  name: 'landing-page',
  data: function() {
    return {
      username: true,
    }
  },
  components: {
    LandingComponent,
  },
}
</script>

<style scoped></style>
