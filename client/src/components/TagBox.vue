<template>
  <div id="container">
    <TagSearch id="searchbar"></TagSearch>
    <div id="block">
      <h1 style="text-align: center; color: whitesmoke;">Find in Tags</h1>
      <div v-if="this.$root.tagList.length > 0">
        <TagButtonSearch
          v-for="(data, index) in this.$root.tagList"
          :key="index"
          :objectData="data"
        ></TagButtonSearch>
      </div>
    </div>
  </div>
</template>

<script>
import TagButtonSearch from "./TagButtonSearch";
import TagSearch from "../components/TagSearch";

export default {
  name: "TagBox",
  components: {
    TagButtonSearch,
    TagSearch
  }
};
</script>

<style scoped>
#block {
  height: 200px;
  width: 100%;
  background-color: rgba(63, 63, 63, 0.288);
  padding: 15px;
  margin-bottom: 9px;
  overflow: auto
}
#searchbar {
  margin: 5px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.089);
  border-radius: 30px;
  padding: 3px;
}
</style>