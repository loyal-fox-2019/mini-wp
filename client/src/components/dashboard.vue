<template>
  <section id="main">
    <div id="navigation">
      <b-nav class="justify-content-center">
        <b-nav-item class="nav-item" @click="navigation('myarticle')">My Articles</b-nav-item>
        <b-nav-item class="nav-item" @click="navigation('create')">Create Article</b-nav-item>
      </b-nav>
    </div>
    <div id="page" class="mt-2">

      <!-- Create new article -->
      <div id="create" v-show="show === 'create'">
        <h1 style="text-align: center;">Create New Article</h1>
        <section id="form">
          {{featured_image}}
          <b-form-input
            v-model="title"
            class="mt-3 mb-2"
            placeholder="Enter your article title">
          </b-form-input>
          <!-- WYSIWYG -->
          <quill-editor ref="myTextEditor"
            v-model="content"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)">
          </quill-editor>
          <!--  -->
          <b-form-tags v-model="tags" class="mb-2 mt-2"></b-form-tags>
          <form action="/upload-single" method="post" enctype="multipart/form-data">
            <input type="file" @change="uploadToGCS" ref="file"
            class="mt-2 mb-2"/>
          </form>
          <!-- <b-form-file
            v-on:change="uploadToGCS" ref="file"
            placeholder="Choose an image or drop it here..."
            drop-placeholder="Drop image here..."
          ></b-form-file> -->
          <div class="text-center mt-3">
            <b-button
              pill variant="outline-primary"
              v-b-modal.modal-1>
              Preview
            </b-button>
            <b-button
              v-if="!loading"
              pill variant="outline-primary"
              @click="publishAttempt">Publish
            </b-button>
            <b-button pill v-else
            variant="outline-primary" disabled>
              <b-spinner small></b-spinner>
            </b-button>
          </div>

        </section>
      </div>
      <div id="my-article" v-show="show === 'myarticle'"></div>
    </div>
    <!-- Modal here -->
    <b-modal id="modal-1" ok-only :title="title">
      <p class="my-4" v-html="content"></p>
    </b-modal>
    <!--  -->
  </section>
</template>

<script>
import hljs from 'highlight.js';
import axios from '../../api/server.js';
import Axios from 'axios';

export default {
  name: 'dashboard',
  data() {
    return {
      title: '',
      content: '',
      tags: [],
      featured_image: '',
      show: 'myarticle',
      loading: false,
      editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image', 'video']
            ],
            syntax: {
              highlight: text => hljs.highlightAuto(text).value
            }
          }
      }
    };
  },
  methods: {
    publishAttempt() {
      this.loading = true;
      const docs = {
        title: this.title,
        content: this.content,
        tags: this.tags,
        featured_image: this.featured_image,
      };
      axios
        .post('/articles', docs, { headers: { token: localStorage.getItem('token') } })
        .then(() => {
          this.$Swal('Article published!');
          this.$emit('pagearticle', 'articles')
        })
        .catch((error) => {
          if (!error.response.data.errors) {
            this.$swal(
              'Something went wrong with the Server.',
              "i'm sorry but, i might screwed up now :(",
              'error'
            )
          }
          const errors = error.response.data.errors;
          let text = '';
          if (errors.length === 1) {
            text = `${errors[0]}.`;
          } else {
            errors.forEach((err, i) => {
              if(i === errors.length-1 && error.length > 1) {
                let str = `and ${err}.`;
                text += str;
              } else {
                let str = `${err}, `;
                text += str;
              }
            });
          }
          this.$swal(
            'Validation Error',
            text,
            'error'
          );
        })
        .finally(() => {
          setTimeout(() => {
            this.loading = false;
          }, 500);
        })
    },
    navigation(value) {
      this.show = value;
    },
    uploadToGCS () {
      this.loading = true;
      let formData = new FormData();
      formData.append("image", this.$refs.file.files[0]);
      Axios({
        method: 'post',
        url: 'http://localhost:3000/articles/featuredimage',
        data: {
          formData,
        },
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((data) => {
          console.log(data)
          this.featured_image = data;
          console.log(data, "ini")
        })
        .catch((err) => {
          this.$swal(err.response.data)
        })
        .finally(() => {
          this.loading = false;
        })
    },
    onEditorBlur(editor) {
      console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      console.log('editor ready!', editor)
    }
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quill
    },
    contentCode() {
      return hljs.highlightAuto(this.content).value
    }
  },
  components: {
  },
};
</script>

<style scoped>
#form {
  left: 25%;
  width: 50vw;
  position: absolute;
}
#navigation {
  color: white;
  background-color: darkslategray
}
.nav-item {
  font-size: 20px;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}
</style>
