<template>
  <!-- <div class="row"> -->
  <div class="col-4">
    <div
      class="card overflow-auto mt-3 ml-5 shadow p-3 mb-5 bg-white rounded"
      style="width: 20rem;"
    >
      <img class="card-img-top" :src="data.file" alt="Card image cap" />
      <div class="card-body">
        <h4>{{ data.title }}</h4>
        <!-- <p>{{data._id}}</p> -->
        <p>By {{ data.author }}</p>
        <p>Created at {{data.createdAt}}</p>
        <!-- <p class="card-text">{{ data.content }}</p> -->

        <div class="row mb-2">
          <div class="col-4">
            <div class="btn btn-primary" v-on:click="edit(data)">
              <i class="far fa-edit"></i>
            </div>
          </div>
          <div class="col-4">
            <div class="btn btn-danger" @click="$bvModal.show('bv-modal-example')">
              <!-- <div class="btn btn-danger" v-on:click="del(data)"> -->
              <i class="far fa-trash-alt"></i>
            </div>
          </div>
          <div class="col-4">
            <div class="btn btn-primary" v-on:click="readMore(data)">
              <i class="fab fa-readme"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal id="bv-modal-example" hide-footer>
      <template v-slot:modal-title>Are you sure you want to delete this post?</template>
      <div class="d-block text-center">
        <h3>This action is dangerous, you can't get it back</h3>
      </div>
      <div class="row">
        <div class="col-6">
          <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Cancel</b-button>
        </div>
        <div class="col-6">
          <b-button class="mt-3 danger" block @click.prevent="del(data)">Yes</b-button>
        </div>
      </div>
    </b-modal>
  </div>
  <!-- </div> -->
</template>
<script>
import axios from "axios";
export default {
  name: "articles",
  props: ["data"],
  components: {},
  data() {
    return {
      baseUrl: "http://localhost:3000"
    };
  },
  methods: {
    edit(data) {
      this.$emit("edit", data);
    },
    del(data) {
      let id = data._id;
      let url = this.baseUrl;
      // console.log(id, "ini yang mau dihapus");
      axios({
        method: "DELETE",
        url: `${url}/delete/${id}`,
        headers: { token: localStorage.getItem("token") }
      })
        .then(deleted => {
          this.$emit("gobackhome", "gobackhome");
        })
        .catch(err => {
          console.log(err);
        });
    },
    readMore(data) {
      this.$emit("readmore", data);
    }
  }
};
</script>

<style scoped>
.article {
  /* padding: 10px; */
  margin: 10px;
  background-color: white;
  justify-content: center;
  align-self: center;
  align-items: stretch;
  width: 100%;
  border: 1px solid gray;
}
.card {
  min-height: 50vh;
  max-height: 50vh;
}
.article:hover {
  cursor: pointer;
}
.editDelete {
  display: flex;
  flex-direction: column;
}

.danger {
  background-color: #dc3545;
}
</style>