<template>
  <div class="container" id="profile">
    <div class="span3 well">
      <center>
        <a v-on:click.prevent
          ><img
            :src="currUser.avatar"
            name="aboutme"
            width="140"
            height="140"
            class="img-circle"
        /></a>
        <br />
        <h3>Hello, @{{ currUser.username }}!</h3>
      </center>
    </div>

    <!-- <div
      class="col-md-10 blogShort"
      v-bind:key="article._id"
      v-for="article in currUser.articles"
    >
      <h1>{{ article.title }}</h1>
      <img
        :src="article.featuredImage"
        alt="post img"
        class="pull-left img-responsive thumb margin10 img-thumbnail"
      />
      <article v-html="article.content.substring(0, 100)"></article>
      <a class="btn btn-blog pull-right marginBottom10" v-on:click.prevent
        >READ MORE</a
      >
    </div> -->

    <b-card no-body>
      <b-tabs card>
        <b-tab title="View All">
          <div
            class="mt-2"
            v-for="article in currUser.articles"
            v-bind:key="article._id"
          >
            <b-card-title>{{ article.title }}</b-card-title>
            <b-card-img :src="article.featuredImage"></b-card-img>
            <b-card-text class="mt-2" v-html=" "></b-card-text>
            <b-button v-on:click="openEditCurrArticle(article)"
              ><i class="fas fa-pen"></i
            ></b-button>
            <b-button v-on:click="deleteArticle(article)"
              ><i class="fas fa-trash"></i
            ></b-button>

            <!-- <b-modal hide-footer id="modal-1" :title="article.title">
              <b-card-img bottom :src="article.featuredImage"></b-card-img>
              <b-card-text class="mt-2" v-html="article.content"></b-card-text>
              <modal-footer>
                <b-button>Edit</b-button>
                <b-button>Delete</b-button>
              </modal-footer>
            </b-modal> -->
          </div>
        </b-tab>

        <!-- CREATE NEW ARTICLE -->
        <b-tab no-body title="Create New Article">
          <b-card>
            <label class="sr-only" for="inline-form-input-title">Title</label>
            <b-input-group prepend="Title" class="mb-2 mr-sm-2 mb-sm-0">
              <b-input
                v-model="newArticle.title"
                id="inline-form-input-title"
                placeholder="Title"
              ></b-input>
              <b-button style="display:block" @click="saveArticle"
                >Save Article</b-button
              >
            </b-input-group>
            <br />
            <!-- input image -->
            <div class="input-image">
              <div v-show="!image">
                <input type="file" @change="onFileChange" />
              </div>
              <div v-show="image">
                <b-card-img :src="image" />
              </div>
            </div>
            <b-button v-show="image" style="display:block" @click="removeImage"
              >Remove image</b-button
            >
            <b-card-text id="editor">
              <textarea
                :value="newArticle.content"
                @input="updateCreateArticle"
              ></textarea>
              <div v-html="compiledMarkdownCreate"></div>
            </b-card-text>
          </b-card>
          <!-- <b-card-img
            bottom
            src="https://picsum.photos/600/200/?image=25"
          ></b-card-img>
          <b-card-footer>Picture 2 footer</b-card-footer> -->
        </b-tab>

        <b-tab
          v-if="editCurrArticle"
          v-bind:active="editCurrArticle"
          no-body
          title="Edit Article"
        >
          <!-- <b-card-img bottom :src="editCurrArticle.featuredImage"></b-card-img>
           -->
          <label class="sr-only" for="inline-form-input-title">Title</label>
          <b-input-group prepend="Title" class="mb-2 mr-sm-2 mb-sm-0">
            <b-input
              v-model="editCurrArticle.title"
              id="inline-form-input-title"
              placeholder="Title"
            ></b-input>
            <b-button style="display:block" @click="updateArticle"
              >Update Article</b-button
            >
          </b-input-group>
          <br />
          <!-- input image -->
          <div class="input-image">
            <div v-show="!image">
              <input type="file" @change="onFileChange" />
            </div>
            <div v-show="image">
              <b-card-img :src="image" />
            </div>
          </div>
          <b-button v-show="image" style="display:block" @click="removeImage"
            >Remove image</b-button
          >
          <b-card-text id="editor">
            <textarea
              :value="editCurrArticle.content"
              @input="updateEditArticle"
            ></textarea>
            <div v-html="compiledMarkdownEdit"></div>
          </b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Profile',
  data() {
    return {
      editCurrArticle: null,
      input: '# hello',
      newArticle: {
        title: null,
        image: null,
        content: '# add new content here!'
      },
      image: null,
      newLists: null
    };
  },
  computed: {
    compiledMarkdownEdit: function() {
      // this.input = this.editCurrArticle.content;
      return marked(this.editCurrArticle.content, { sanitize: true });
    },
    compiledMarkdownCreate: function() {
      return marked(this.newArticle.content, { sanitize: true });
    }
  },
  props: {
    currUser: Object
  },
  methods: {
    openEditCurrArticle(article) {
      this.editCurrArticle = article;
      // this.input = this.editCurrArticle.content;
      this.image = this.editCurrArticle.featuredImage;
      console.log(this.editCurrArticle);
    },
    updateEditArticle: _.debounce(function(e) {
      this.editCurrArticle.content = e.target.value;
    }, 300),
    updateCreateArticle: _.debounce(function(e) {
      this.newArticle.content = e.target.value;
    }, 300),
    onFileChange: function(e) {
      // buat ambil image
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      this.newArticle.image = files[0];
      this.createImage(files[0]);
    },
    createImage: function(file) {
      // buat bikin image
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm.image = e.target.result;
      };

      reader.readAsDataURL(file);
    },
    removeImage: function(e) {
      // buat remove image
      this.image = null;
    },
    saveArticle: function() {
      console.log(this.newArticle);

      const formData = new FormData();
      formData.append('title', this.newArticle.title);
      formData.append('content', this.newArticle.content);
      formData.append('featuredImage', this.newArticle.image);

      // create the article!
      axios
        .post(`http://localhost:3000/articles/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            token: localStorage.getItem('token')
          }
        })
        .then(function(response) {
          console.log(response.data);
          return axios.get('http://localhost:3000/articles');
        })
        .then(result => {
          console.log(result);
          this.newLists = result.data;
          // console.log(this.posts);
          // this.posts = result.data;
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    deleteArticle: function(article) {
      const { _id } = article;

      axios
        .delete(`http://localhost:3000/articles/${_id}`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(function(response) {
          console.log(`SUCCESS DELETE POST ${_id}`);
          return axios.get('http://localhost:3000/articles', {
            headers: {
              token: localStorage.getItem('token')
            }
          });
        })
        .then(result => {
          console.log(result);
          this.posts = result.data;
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    updateArticle: function() {
      console.log(this.editCurrArticle.title);
      console.log(this.image);
      console.log(this.editCurrArticle.content);

      const formData = new FormData();
      formData.append('title', this.editCurrArticle.title);
      formData.append('content', this.editCurrArticle.content);
      formData.append('featuredImage', this.image);

      // update the article!
      axios
        .put(
          `http://localhost:3000/articles/${this.editCurrArticle._id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              token: localStorage.getItem('token')
            }
          }
        )
        .then(function(response) {
          console.log(response.data);
          return axios.get('http://localhost:3000/articles', {
            headers: {
              token: localStorage.getItem('token')
            }
          });
        })
        .then(result => {
          console.log(result);
          this.newLists = result.data;
          // console.log(this.posts);
          // this.posts = result.data;
        })
        .catch(function(error) {
          console.error(error);
        });
    }
  },
  components: {}
};
</script>

<style>
html,
body,
#editor {
  margin: 0;
  height: 100%;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #333;
}

textarea,
#editor div {
  margin-top: 1em;
  display: inline-block;
  width: 49%;
  height: 100vh;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 20px;
}

textarea {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: 'Monaco', courier, monospace;
  padding: 20px;
}

code {
  color: #f66;
}
</style>
