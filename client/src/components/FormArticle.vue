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
    <b-form-file
      v-model="image"
      :state="Boolean(image)"
      placeholder="Choose a picture or drop it here..."
      drop-placeholder="Drop file here..."
    ></b-form-file>
    <b-form-tags v-model="value" class="mb-2"></b-form-tags>
    <button @click.prevent="save" class="btn btn-success btn-lg btn-block mb-4">
      <i class="upload icon"></i> Create
    </button>
  </div>
</template>
<script>
export default {
  name: "FormArticle",
  data() {
    return {
      title: "",
      image: null,
      quill: null,
      value: []
    };
  },
  methods: {
    save() {
      this.$swal.fire({
        icon: "info",
        title: "Your work on process..",
        text: "In will take a little time, please wait...",
        showConfirmButton: false,
        timer: 5000
      });

      let isi = this.quill.root.innerHTML;
      const formData = new FormData();
      formData.append("image", this.image);
      formData.set("title", this.title);
      formData.set("description", isi);
      formData.set("tags", this.value);
      console.log(formData);
      this.axios({
        url: "/articles",
        headers: {
          token: localStorage.getItem("token")
        },
        method: "POST",
        data: formData
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
          this.$root.myArticles.push(data);
        })
        .catch(function(error) {
          console.log(error.response);
          this.$swal.fire(error.response.data.message);
        });
    },
    quillInit() {
      this.quill = new Quill("#add_content", {
        theme: "snow"
      });
    }
  },
  mounted() {
    this.quillInit();
  }
};
</script>
<style scoped>
</style>