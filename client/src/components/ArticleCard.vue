<template>
  <div class="column">
    <div class="ui card">
      <div class="image">
        <img :src="thumbnail" class="img-width" alt="thumbnail-img" />
      </div>
      <div class="content">
        <a class="header">{{title}} ....</a>
        <div class="meta">
          <span class="date">{{date}}</span>
        </div>
        <div class="description">{{content}} ....</div>
      </div>
      <div class="extra content">
        <div class="row">
          <div class="col-md-6"></div>
          <div class="col-md-6">
            <button class="ui red button d-blcok mx-auto" @click="deleteArticle">
              <i class="trash alternate icon"></i> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  props: ["thumbnail", "title", "content", "date", "id"],
  methods: {
    deleteArticle() {
      Swal.fire({
        title: "Are you sure Want to delete Article?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete Article"
      })
        .then(result => {
          if (result.value) {
            return axios({
              method: "delete",
              headers: {
                token: localStorage.getItem("token")
              },
              url: "http://localhost:3000/articles/" + this.id
            });
          } else {
            next();
          }
        })
        .then(deleted => {
          Swal.fire("Deleted!", "Article has been deleted.", "success");
          this.$emit("refreshData", "refresh");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.img-width {
  height: 150px!Important;
  display: block;
  margin-left: auto;
  margin-right: auto;
  object-fit: cover;
}
</style>