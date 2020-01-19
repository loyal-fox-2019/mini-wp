<template>
  <b-button class="bbtn" @click.prevent="changeTagSearch">{{btn}}</b-button>
</template>

<script>
export default {
  name: "TagButton",
  props: ["btn"],
  methods: {
    changeTagSearch() {
      this.$router.push('/')
      this.$root.TagSearch = this.btn;
    }
  }
};
</script>

<style scope>
.bbtn {
  height: 30px;
  margin-right: 5px;
}
</style>