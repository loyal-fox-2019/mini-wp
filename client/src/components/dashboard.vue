<template>
  <section id="main">

    <!-- Show vue-loading-overlay -->
    <loading 
    :color="'#007bff'"
    :background-color="'#000'"
    :active.sync="isLoading" 
    :is-full-page="fullPage"
    :loader="'bars'"
    ></loading>
    <!-- vue-loading-overlay -->

    <div id="navigation">
      <b-nav class="justify-content-center">
        <b-nav-item class="nav-item" @click="navigation('myarticle')" >My Articles</b-nav-item>
        <b-nav-item class="nav-item" @click="navigation('create')">Create Article</b-nav-item>
      </b-nav>
    </div>
    <div id="my-article" v-show="show === 'myarticle'">
      <h1 style="text-align: center; color: #007bff;" id="header-text" class="mt-1">My Articles</h1>
      <div class="text-center mt-0" >
        <p id="text"><em>If your article empty, click refresh</em></p>
        <b-button pill @click="refresh" variant="secondary">Refresh</b-button>
      </div>
      <div id="my-article-table">
        <table class="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">TITLE</th>
              <th scope="col">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="articleEdit in myArticles" :key="articleEdit._id">
              <th scope="row">{{articleEdit._id}}</th>
              <td>{{articleEdit.title}}</td>
              <td>
                <b-button pill class="mr-2" @click="updateArticle(articleEdit)" variant="primary">EDIT</b-button><b-button @click="removeArticle(articleEdit._id)" pill variant="primary">REMOVE</b-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Modal here -->
    <b-modal id="modal-center" centered :title="currentItem.title">
      <p class="my-4" v-html="currentItem.content"></p>
    </b-modal>
    <!--  -->
    <div id="page" class="mt-2">
      <!-- Create new article -->
      <div id="create" v-show="show === 'create'">
        <h1 style="text-align: center;" class="mt-5">Create New Article</h1>
        <section id="form">
          <div class="justify-content-center" v-show="featured_image != ''">
            <b-img :src="featured_image" fluid alt="Responsive image"></b-img>
          </div>
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
          <div v-if="!isUpdate">
            <!-- <input type="file" v-on:change="fileHandle" ref="file"/> -->
            <b-form-file
              v-model="file"
              :state="Boolean(file)"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            ></b-form-file>

            <div class="text-center mt-3 mb-3" v-show="!buttonPressed">
              <b-button
                pill variant="outline-primary"
                @click="fileHandle"
                >
                Upload Image
              </b-button>
              <b-button
                pill variant="outline-primary"
                v-show="file"
                @click="removeImage"
                >
                Remove Image
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


            <div class="text-center mt-3 mb-3" v-show="buttonPressed">
              <b-button
                disabled
                pill variant="outline-primary"
                @click="fileHandle"
                >
                Upload Image
              </b-button>
              <b-button
                disabled
                pill variant="outline-primary"
                @click="removeImage"
                >
                Remove Image
              </b-button>
              <b-button
                disabled
                pill variant="outline-primary"
                @click="publishAttempt">Publish
              </b-button>
            </div>


          </div>
          <div v-else>
            <div class="text-center mt-3 mb-3" v-show="!buttonPressed">
              <b-button
                v-if="!loading"
                pill variant="outline-primary"
                @click="updateAttempt">Update
              </b-button>
              <b-button pill v-else
              variant="outline-primary" disabled>
                <b-spinner small></b-spinner>
              </b-button>
            </div>

            <div class="text-center mt-3 mb-3" v-show="buttonPressed">
              <b-button
                disabled
                v-if="!loading"
                pill variant="outline-primary"
                @click="updateAttempt">Update
              </b-button>
            </div>
          </div>

        </section>
      </div>
      <div id="my-article" v-show="show === 'myarticle'"></div>
    </div>
  </section>
</template>

<script>
import hljs from 'highlight.js';
import axios from '../../api/server.js';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  props: {
    page: {
      type: String,
    },
  },
  name: 'dashboard',
  data() {
    return {
      fullPage: true,
      buttonPressed: false,
      isLoading: false,
      file: null,
      isUpdate: false,
      currentItem: {},
      myArticles: [],
      fields: [
        { key: '_id', label: 'Article Id' },
        { key: 'title', label: 'title' }
      ],
      edit: true,
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
    refresh() {
      this.fetchMyData();
    },
    removeImage() {
      this.file = null;
    },
    updateArticle(value) {
      this.isUpdate = true;
      this.currentItem = value;
      this.title = this.currentItem.title;
      this.content = this.currentItem.content;
      this.tags = this.currentItem.tags;
      this.navigation('create');
    },
    removeArticle(articleId) {
      this.$swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.isLoading = true
          axios
            .delete(`/articles/${articleId}`, { headers: { token: localStorage.getItem('token') } })
            .then(() => {
              this.$swal(
                'Deleted!',
                'Your article has been deleted.',
                'success'
              )
              this.fetchMyData();
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
              }
            })
            .finally(() => {
              setTimeout(() => {
                this.isLoading = false;
                this.show = 'myarticle';
                this.fetchMyData();
              }, 500)
            })
    },
    fetchMyData() {
      this.myArticles = null;
      this.isLoading = true;
      axios
        .get('/user/articles', { headers: { token: localStorage.getItem('token') } })
        .then(({ data }) => {
          this.myArticles = data;
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
            this.isLoading = false;
          }, 500);
        })

    },
    updateAttempt() {
      this.buttonPressed = true;
      this.loading = true;
      const docs = {
        title: this.title,
        content: this.content,
        tags: this.tags,
      };
      axios
        .put(`/articles/${this.currentItem._id}`, docs, { headers: { token: localStorage.getItem('token') } })
        .then(() => {
          this.$swal('Article updated!')
          this.fetchMyData();
          this.currentItem = {};
          this.title = '';
          this.content = ''
          this.isUpdate = false;
          this.navigation('myarticle');
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
            this.buttonPressed = false;
            this.loading = false;
            this.fetchMyData();
          }, 500);
        })
    },
    publishAttempt() {
      this.buttonPressed = true;
      this.isLoading = true;
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
        this.title = '';
        this.content = '';
        this.featured_image = '';
        this.$swal('Article published!');
        this.fetchMyData();
        this.show = 'myarticle';
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
            this.buttonPressed = false;
            this.loading = false;
            this.isLoading = false;
            this.fetchMyData();
          }, 500);
        })
    },
    navigation(value) {
      this.tags = '';
      this.featured_image = '';
      if (value === 'myarticle') {
        this.fetchMyData();
      }
      this.show = value;
    },
    fileHandle() {
      this.buttonPressed = true;
      this.isLoading = true;
      this.loading = true;
      this.featured_image = '';
      let formData = new FormData();
        formData.append("image", this.file);
        axios.post(`/articles/image`, formData, { headers: { token: localStorage.getItem('token'), "Content-Type": "multipart/form-data", } })
        .then(({ data }) => {
          this.featured_image = data;
        })
        .catch((error) => {
          this.loading = false;
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
          this.loading = false;
          this.isLoading = false;
          this.buttonPressed = false;
        }, 500)
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
  watch: {
    page: function(value) {
      if (value === 'Dashboard') {
        this.fetchMyData();
      }
    },
  },
  components: {
    Loading,
  },
};
</script>

<style scoped>

#main {
  overflow-x: hidden;
}
#create {
  width: 100vw;
  overflow-x: hidden;
  /* background-color: white; */

}

#form {
  left: 25%;
  width: 50vw;
  position: absolute;
}
#navigation {
  margin-top: 5%;
  background-color: white;
  /* color: white !important; */
}
.nav-item {
  font-size: 20px;
  color: white !important;
  /* -webkit-text-stroke-width: 1px; */
  /* -webkit-text-stroke-color: black; */
}
#my-article-table {
  position: relative;
  left: 25%;
  width: 50vw;
  margin-top: 5%;
}
#my-article-table {
  position: absolute;
  left: 25%;
  top: 30%;
}
#text {
  text-align: center;
}
#header-text {
  padding: 0;
  font-size: 3em;
  margin: 0;
}
</style>
