<template>
  <b-row>
    <b-col md="2" class="width-col-md">
      <SideBar @menuClick="activePage = $event"></SideBar>
    </b-col>
    <b-col>
      <ListArticle v-if="activePage === 'ListArticle'"></ListArticle>
      <FormArticle v-else-if="activePage === 'FormArticle'"></FormArticle>
      <SearchArticle v-else-if="activePage === 'SearchArticle'"></SearchArticle>
    </b-col>
  </b-row>
</template>

<script>
import SideBar from "../components/SideBar";
import ListArticle from "./ListArticle";
import FormArticle from "./FormArticle";
import SearchArticle from "./SearchArticle";
export default {
  components: {
    SideBar,
    ListArticle,
    FormArticle,
    SearchArticle
  },
  data() {
    return {
      activePage: "ListArticle"
    };
  }
};
</script>

<style scoped>
.after-login {
  height: calc(100vh - 49px);
  width: 100vw;
  overflow-y: scroll;
  background-color: #f1f1f1;
}
.width-col-md {
  max-width: 150px!Important;
}
</style>