<template>
    <div class="md:flex-1 mt-2 mb:mt-0 md:px-3">
      <form>
      <div class="mb-4">
        <label class="block uppercase tracking-wide text-xs font-bold">Title</label>
        <input v-model="title" class="w-full shadow-inner p-2 border-0" type="text" name="name" placeholder="Your article's title">
      </div>
      <div class="mb-4">
        <quill-editor
              ref="myTextEditor"
              v-model="content"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
        ></quill-editor>
      </div>
      <div class="mb-4">
        <label class="block uppercase tracking-wide text-xs font-bold">Tags</label>
        <div class="flex">
          <button @click.prevent="createTags" class="inline text-white font-bold bg-blue-400 py-2 px-2 rounded hover:bg-blue-600">Generate</button>
          <input v-model="tags" class="inline w-full shadow-inner p-2 border-0" type="text" name="name" placeholder="Related tags">
        </div>
      </div>
      <div class="mb-4">
        <label class="block uppercase tracking-wide text-xs font-bold">Image</label>
        <input type="file" name="image" ref="file" @change="onFileChanged" class="w-full shadow-inner p-2 border-0" placeholder="Image is required!">
      </div>
      <div class="md:flex-1 px-3 text-center md:text-right">
          <input type="hidden" name="sponsor" value="0">
          <input @click.prevent="updateArticle" class="button p-2 text-cream-300 bg-brick-500 hover:bg-brick-600" type="submit" value="Save Changes">
        </div>
      </form>
    </div>
</template>

<script>
export default {
  name: "EditorForm",
  props: {
    article: Object
  },
  data() {
    return {
      title: this.article.title,
      tags: this.article.tags,
      image: '',
      content: this.article.content,
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["clean"],
            ["link"]
          ]
        }
      }
    };
  },
  methods: {
    onEditorBlur(editor) {},
    onEditorFocus(editor) {},
    onEditorReady(editor) {},
    updateArticle() {
      let formData = new FormData();
      formData.append("title", this.title || this.article.title);
      formData.append("tags", this.tags || this.article.tags);
      formData.append("image", this.image);
      formData.append("content", this.content || this.article.content);
      this.$axios({
        method: 'PUT',
        url: `articles/${this.article._id}`,
        headers: {
          access_token: localStorage.getItem("access_token")
        },
        data: formData 
      })
        .then(({ data }) => {
          Swal.fire({
            title: 'Success!',
            text: `Article with ID ${this.article._id} successfully updated`,
            icon: 'success',
            confirmButtonText: 'Close'
          })
          this.$emit("my-detail", this.article._id);
        })
        .catch(err => {
          Swal.fire({
            title: 'Error!',
            text: err,
            icon: 'error',
            confirmButtonText: 'Close'
          })
        })
        .finally(() => {
          this.reset();
        })
    },
    onFileChanged(event) {
      this.image = this.$refs.file.files[0];
    },
    reset() {
      this.title = ""
      this.tags = ""
      this.image = ""
      this.content = ""
    },
    createTags() {
      this.$axios({
        method: 'POST',
        url: 'articles/tags',
        headers: {
          access_token: localStorage.getItem("access_token")
        },
        data: {
          content: this.content || this.article.content
        }
      })
        .then(({ data }) => {
          this.tags = Object.keys(data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quill;
    },
    contentCode() {
      return hljs.highlightAuto(this.content).value;
    }
  }
};
</script>

<style scoped>
#column {
  margin-top: 2vh;
  margin-right: 9vh;
}
</style>