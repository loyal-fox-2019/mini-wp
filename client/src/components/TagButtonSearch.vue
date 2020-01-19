<template>
  <div class="ui labeled button" tabindex="0" @click.prevent="changeTagSearch">
    <div class="ui button">{{objectData.name}}</div>
    <a class="ui basic label">{{objectData.count}}</a>
  </div>
</template>

<script>
export default {
  name: "TagButtonSearch",
  props: ["objectData"],
  methods: {
    changeTagSearch() {
      console.log(this.objectData.name);
      this.$root.TagSearch = this.objectData.name;
    }
  }
};
</script>

<style scope>
.labeled {
  height: 30px;
  margin: 5px !important;
}
</style>