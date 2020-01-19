<template>
  <div class="ui labeled button" tabindex="0">
    <div class="ui button">{{objectData.name}}</div>
    <a class="ui basic label">{{objectData.count}}</a>
  </div>
</template>

<script>
export default {
  name: "TagButtonSearch",
  props: ["objectData"]
};
</script>

<style scope>
.labeled {
  height: 30px;
  margin: 5px !important;
}
</style>