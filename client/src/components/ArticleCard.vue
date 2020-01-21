<template>
  <div id="container" v-if="!deleted">
    <div class="card">
      <div class="image">
        <img
          :src="articleData.image"
          id="gambar"
          class="ui medium bordered image"
          alt="harusnya image"
        />
      </div>
      <div class="content">
        <div class="header text-primary" style="font-size: 1.4rem">{{articleData.title}}</div>
        <div class="meta">
          <a class="text-secondary">By: {{articleData.creator.name}}, {{tanggal}}</a>
        </div>
        <div class="description" style="margin: 15px 0" v-html="articleData.description"></div>
      </div>
      <div class="extra content">
        <span>
          <i class="tags icon"></i>
          <span v-for="(tag, index) in articleData.tags" :key="index">
            <TagButton :btn="tag"></TagButton>
          </span>
        </span>
      </div>
      <div class="extra content" style="text-align: center;" v-if="$route.path == '/user'">
        <div class="ui large buttons">
          <b-link :to="theId">
            <button class="ui button positive">Edit</button>
          </b-link>
          <div class="or"></div>
          <button class="ui button negative" @click.prevent="showMsgBoxTwo">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TagButton from "./TagButton";
export default {
  name: "ArticleCard",
  components: { TagButton },
  props: ["articleData"],
  data() {
    return {
      boxTwo: "",
      deleted: false
    };
  },
  computed: {
    tanggal() {
      return new Date(this.articleData.created_at).toLocaleDateString();
    },
    theId: function() {
      return "/edit/" + this.articleData._id;
    }
  },
  methods: {
    showMsgBoxTwo() {
      this.boxTwo = "";
      this.$bvModal
        .msgBoxConfirm("Please confirm that you want to delete this article.", {
          title: "Please Confirm",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "YES",
          cancelTitle: "NO",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          this.boxTwo = value;
        })
        .catch(err => {
          // An error occurred
          console.log(err);
          this.$swal.fire(err);
        });
    }
  },
  watch: {
    boxTwo: function() {
      if (this.boxTwo == true) {
        this.axios
          .delete("/articles/" + this.articleData._id, {
            headers: {
              token: localStorage.getItem("token")
            }
          })
          .then(({ data }) => {
            console.log(data);
            this.$swal.fire(data.title + " deleted");
            this.deleted = true;
          })
          .catch(err => {
            console.log(err.response);
            this.$swal.fire(err.response.data.message);
          });
      }
    }
  }
};
</script>

<style scoped>
#container {
  width: 60vw;
  display: flex;
  justify-content: center;
  margin: 10px;
  border: 1px solid rgba(34, 27, 27, 0.507);
  padding: 5px 0;
}
#gambar {
  width: 58vw;
}
.card > div {
  margin: 9px;
}
</style>