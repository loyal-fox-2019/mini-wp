<template>
  <b-button class="bbtn">
      {{btn}}
  </b-button>
</template>

<script>

export default {
name: 'TagButton',
props: ['btn']
}
</script>

<style scope>
.bbtn{
    height: 30px;
    margin-right: 5px;
}
</style>