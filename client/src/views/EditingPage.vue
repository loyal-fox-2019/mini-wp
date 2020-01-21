<template>
  <div id="hadeh">
    <tuk-edit v-if="article" :Information="article"></tuk-edit>
  </div>
</template>

<script>
import EditingFormArticle from "../components/EditingFormArticle.vue";
export default {
  name: "EditingPage",
  components: {
    tukEdit: EditingFormArticle
  },
  data() {
    return {
      article: null
    };
  },
  beforeCreate() {
    console.log("sukam");
    if (!this.$root.nowLogin) this.$router.push("/");
    else {
      this.axios
        .get("/articles/" + this.$route.params.id, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          this.article = data;
          console.log(data);
        })
        .catch(err => {
          console.log(err.response.data);
          this.$swal.fire("error", "Sorry something when wrong here");
        });
    }
  }
};
</script>

<style scoped>
#hadeh {
  background-color: rgba(240, 248, 255, 0.438);
  overflow-y: auto;
  width: 100vw;
  height: 90vh;
  padding: 5vh 5vh 10vh 5vh;
}
</style>