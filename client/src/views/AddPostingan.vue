<template>
  <div class="card m-5">
    <div class="card-header">Add a Postingan</div>
    <div class="card-body">
      <blockquote class="blockquote mb-0">
        <form>
          <div class="form-group">
            <label for="formGroupExampleInput">Title</label>
            <input
              type="text"
              class="form-control"
              id="formGroupExampleInput"
              placeholder="Example input placeholder"
              v-model="form.title"
            />
          </div>
          <div>
            <label for="formGroupContent">Article Content</label>
            <editor-menu-bar
              class="bg-light text-center pt-2"
              :editor="editor"
              v-slot="{ commands, isActive }"
            >
              <div class="menubar">
                <i
                  class="material-icons cursorNya"
                  :class="{ 'is-active': isActive.bold() }"
                  @click="commands.bold"
                >format_bold</i>
                <i
                  class="material-icons cursorNya"
                  :class="{ 'is-active': isActive.underline() }"
                  @click="commands.underline"
                >format_underlined</i>
                <i
                  class="material-icons cursorNya"
                  :class="{ 'is-active': isActive.italic() }"
                  @click="commands.italic"
                >format_italic</i>
                <i
                  class="material-icons cursorNya"
                  :class="{ 'is-active': isActive.strike() }"
                  @click="commands.strike"
                >strikethrough_s</i>
                <b-icon
                  class="cursorNya"
                  :class="{ 'is-active': isActive.heading({level:1}) }"
                  @click="commands.heading({level:1})"
                  icon="type-h1"
                ></b-icon>
                <b-icon
                  class="cursorNya"
                  :class="{ 'is-active': isActive.heading({level:2}) }"
                  @click="commands.heading({level:2})"
                  icon="type-h2"
                ></b-icon>
                <b-icon
                  class="cursorNya"
                  :class="{ 'is-active': isActive.heading({level:3}) }"
                  @click="commands.heading({level:3})"
                  icon="type-h3"
                ></b-icon>
                <i
                  class="material-icons cursorNya"
                  :class="{ 'is-active': isActive.ordered_list() }"
                  @click="commands.bullet_list"
                >format_list_bulleted</i>
                <i
                  class="material-icons cursorNya"
                  :class="{ 'is-active': isActive.ordered_list() }"
                  @click="commands.bullet_list"
                >format_list_numbered</i>
              </div>
            </editor-menu-bar>
            <editor-content id="formGroupContent" class="border p-3" :editor="editor" />
          </div>
          <div>
            <b-form-file
              class="mt-2"
              v-model="form.file"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            ></b-form-file>
            <!-- <b-form-file v-model="form.file" class="mt-3" plain></b-form-file> -->
          </div>
          <div>
            <button type="button" class="btn btn-dark mt-2" @click="createArticle">Primary</button>
            <div v-html="sample"></div>
          </div>

          <!-- <footer class="blockquote-footer">
            New Article of
            <cite title="Source Title">Name</cite>
          </footer> -->
        </form>
      </blockquote>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History
} from "tiptap-extensions";
export default {
  name: "AddPostingan",
  components: {
    EditorMenuBar,
    EditorContent
  },
  data() {
    return {
      sample: "",
      form: {
        file: "",
        title: ""
      },
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new BulletList(),
          new OrderedList(),
          new ListItem(),
          new TodoItem(),
          new TodoList(),
          new Bold(),
          new Code(),
          new Italic(),
          new Link(),
          new Strike(),
          new Underline(),
          new History()
        ],
        content: `
          <h3>Type Here</h3>
          <p>Just Click and start making a cool article:)</p>
        `
      })
    };
  },
  methods: {
    createArticle() {
      this.sample = this.editor.getHTML()
      let formData = new FormData()
      formData.append('title', this.form.title)
      formData.append('file', this.form.file)
      formData.append('content', this.editor.getHTML())
      axios({
        method: 'post',
        url: 'http://localhost:3000/createArticle',
        data: formData,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data})=> {
        console.log('data hasbeen created ',data)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  beforeDestroy() {
    this.editor.destroy();
  }
};
</script>

<style scoped>
.cursorNya {
  cursor: pointer;
}
</style>