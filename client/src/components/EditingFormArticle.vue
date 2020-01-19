<template>
  <div>
    <h4 style="font-family: 'Exo', sans-serif;">Title</h4>
    <hr />
    <input
      v-model="title"
      type="text"
      placeholder="input your Title"
      class="shadow p-3 mb-5 bg-white rounded mt-1"
      style="width: 100%;"
    />
    <div class="shadow p-3 mb-5 bg-white rounded" style="height: 500px;">
      <h4 style="font-family: 'Exo', sans-serif;" id="asd">Description</h4>
      <hr />
      <!-- <textarea v-model='content' rows="4" cols="50" style="width: 100%;height: 80%;" placeholder="insert your content here !!">
      </textarea>-->
      <div id="add_content" style="height: 350px;"></div>
    </div>
    <b-form-tags v-model="value" class="mb-2"></b-form-tags>
    <button @click.prevent="edit" class="btn btn-success btn-lg btn-block mb-4">
      <i class="upload icon"></i> Edit
    </button>
  </div>
</template>
<script>
export default {
  name: "EditArticle",
  props: ["Information"],
  data() {
    return {
      title: "",
      quill: null,
      value: []
    };
  },
  methods: {
    edit() {
      let isi = this.quill.root.innerHTML;
      let formData = new FormData()
      formData.set("title", this.title);
      formData.set("description", isi);
      formData.set("tags", this.value);
      console.log(formData);
      this.axios
        .post(this.url, formData, { // katanya ga bisa pake put
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          (this.title = ""), (this.image = null);
          this.quill.root.innerHTML = "";
          this.$swal.fire({
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
          this.$router.push("/user");
        })
        .catch(function(error) {
          this.$swal.fire("got an error");
          console.log(error.response.data);
        });
    },
    quillInit() {
      this.quill = new Quill("#add_content", {
        theme: "snow"
      });
    }
  },
  mounted() {
    // console.log(this.Information);
    this.quillInit();
    (this.title = this.Information.title),
      (this.quill.root.innerHTML = this.Information.description);
    this.value = this.Information.tags;
  },
  computed: {
    url() {
      return "/articles/edit/" + this.Information._id;
    }
  }
};
</script>
<style scoped>
</style>