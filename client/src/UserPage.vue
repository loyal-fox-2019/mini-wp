<template>
  <div>
    <b-navbar toggleable="lg" type="dark" :style="{'background-color':'#006088'}" class="py-1 fixed-top">
      <b-navbar-brand href="#" class="ml-3 mr-0" style="color: white;" v-if="isUserState">
        <i class="fab fa-vuejs"></i>
        <span class="font-weight-bold" style="font-size:16px;font-family: 'Nunito', sans-serif;">My Site</span>
      </b-navbar-brand>
      <b-navbar-brand href="#" class="ml-3 mr-0" style="color: white;" v-else>
        <span class="font-weight-bold" style="font-size:16px;font-family: 'Nunito', sans-serif;" @click="showUserPage">Close</span>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <span class="navbar-text p-0" v-if="isUserState">
            <button type="button" class="btn btn-light text-primary mr-5" @click.prevent="showPostPage"><i class="far fa-paper-plane"></i> Write</button>
            <g-logout-button @authenticated="getAuth" class="mr-3"></g-logout-button>
          </span>
          <span v-else>
            <button type="button" class="btn btn-light shadow-sm mr-2" style="width:150px;" @click="saveArticle('draft')">Draft</button>
            <button type="button" class="btn btn-danger shadow-sm mr-4" style="width:150px;" @click="saveArticle('publish')">Publish</button>
          </span>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-container fluid :style="{'background-color':'#F6F7F7'}">
      <b-row v-if="articles.length === 0 && isUserState" class="mt-5 vh-100 justify-content-center" style="background-color:#F6F7F7;">
        <b-col cols="6" class="text-center mt-5">
          <i class="fab fa-vuejs fa-5x"></i>
          <h1 class="font-weight-light my-3">You don't have any article yet.</h1>
          <h3 class="font-weight-lighter my-3">Would you like to start one?</h3>
          <b-button variant="danger" class="mt-5" @click.prevent="showPostPage">Create article</b-button>
        </b-col>
      </b-row>

      <b-row v-else-if="articles.length > 0 && isUserState" class="mt-5">
        <b-col cols="2" class="vh-100 p-0 overflow-auto" style="border-right:solid 1px #DCDCDE">
          <b-nav vertical>
            <b-nav-item style="font-size: 16px;" @click.prevent="underConstruction"><i class="fas fa-tv"></i> View Site</b-nav-item>
            <b-nav-item style="font-size: 16px;" @click.prevent="underConstruction"><i class="fas fa-chart-bar"></i> Stats</b-nav-item>
            <b-nav-item style="font-size: 16px;" @click.prevent="underConstruction"><i class="fas fa-history"></i> Activity</b-nav-item>
            <a class="nav-link d-flex justify-content-between" style="font-size: 16px;" @click.prevent="underConstruction" href="#">
              <span><i class="fas fa-columns"></i> Plan</span>
              <span class="font-weight-bolder">Free</span>
            </a>
            <p class="text-secondary font-weight-bolder mx-3 pt-2 pb-0" style="font-size: 20px;">Manage</p>
            <a class="nav-link d-flex justify-content-between" style="font-size: 16px;" @click.prevent="showPostPage" href="#">
              <span><i class="far fa-file-alt"></i> Site Pages</span>
              <span><button type="button" class="btn btn-sm btn-outline-dark" @click="showPostPage">Add</button></span>
            </a>
            <a class="nav-link d-flex justify-content-between" style="font-size: 16px;" @click.prevent="showPostPage" href="#">
              <span><i class="fas fa-align-left"></i> Blog Posts</span>
              <span><button type="button" class="btn btn-sm btn-outline-dark" @click="showPostPage">Add</button></span>
            </a>
            <a class="nav-link d-flex justify-content-between" style="font-size: 16px;" @click.prevent="showPostPage" href="#">
              <span><i class="fas fa-photo-video"></i> Media</span>
              <span><button type="button" class="btn btn-sm btn-outline-dark" @click="showPostPage">Add</button></span>
            </a>
            <b-nav-item style="font-size: 16px;" @click.prevent="underConstruction"><i class="fas fa-comments"></i> Comments</b-nav-item>
            <a class="nav-link d-flex justify-content-between" style="font-size: 16px;" @click.prevent="underConstruction" href="#">
              <span><i class="fas fa-comment-dots"></i> Feedback</span>
              <span><button type="button" class="btn btn-sm btn-outline-dark">Add</button></span>
            </a>
            <a class="nav-link d-flex justify-content-between" style="font-size: 16px;" @click.prevent="underConstruction" href="#">
              <span><i class="fas fa-plug"></i> PLugins</span>
              <span><button type="button" class="btn btn-sm btn-outline-dark">Manage</button></span>
            </a>
            <b-nav-item style="font-size: 16px;" @click.prevent="underConstruction"><i class="fas fa-cloud-upload-alt"></i> Import</b-nav-item>
            <p class="text-secondary font-weight-bolder mx-3 pt-2 pb-0" style="font-size: 20px;">Personalize</p>
            <a class="nav-link d-flex justify-content-between" style="font-size: 16px;" @click.prevent="underConstruction" href="#">
              <span><i class="fas fa-tools"></i> Customize</span>
              <span><button type="button" class="btn btn-sm btn-outline-dark">Themes</button></span>
            </a>
          </b-nav>
        </b-col>
        <b-col class="m-5 mt-3 p-0">
          <b-navbar type="light" variant="light">
            <b-navbar-brand href="#" :style="[activeStatus === 'publish' ? {'border-bottom':'solid 2px black'} : '']" @click="switchStatus('publish')">
              Published <b-button pill variant="primary" size="sm" disabled v-if="activeStatus === 'publish'">{{ shownArticles.length }}</b-button>
            </b-navbar-brand>
            <b-navbar-brand href="#" :style="[activeStatus === 'draft' ? {'border-bottom':'solid 2px black'} : '']" @click="switchStatus('draft')">
              Drafts <b-button pill variant="primary" size="sm" disabled v-if="activeStatus === 'draft'">{{ shownArticles.length }}</b-button>
            </b-navbar-brand>
            <b-button variant="link" v-if="filterActive" @click="deactivateFilter">Show All</b-button>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-nav-form @submit.prevent="searchArticle">
                <b-form-select v-model="searchForm.selected" :options="searchOptions" size="sm" class="mr-2"></b-form-select>
                <b-form-input size="sm" class="mr-sm-2" placeholder="Search" v-model="searchForm.text"></b-form-input>
                <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
              </b-nav-form>
            </b-navbar-nav>
          </b-navbar>

          <div v-for="article in shownArticles" :key="article.id">
            <b-card class="my-2 p-0">
              <b-card-title class="d-flex justify-content-between">
                <a href="#" @click.prevent="editArticle(article._id)" class="text-decoration-none text-dark" style="font-size:25px;">{{ article.title }}</a>
                <a href="#" @click.prevent="deleteArticle(article._id)" class="text-decoration-none text-danger" style="font-size: 18px"><i class="far fa-trash-alt"></i></a>
              </b-card-title>
              <b-card-body class="d-flex justify-content-between p-0">
                <span>
                  <span v-for="tag in article.tags" :key="tag">
                    <b-button size="sm" class="rounded-pill mx-1 font-weight-light" style="font-size:12px;" variant="outline-success" @click="filterByTagName(tag)">{{ tag }}</b-button>
                  </span>
                </span>
                <span v-if="article.featured_image">
                  <img :src="article.featured_image" :style="[{'max-height':'100px','max-width':'100px'}]" class="img-thumbnail">
                </span>
              </b-card-body>
            </b-card>
          </div>
        </b-col>
      </b-row>

      <b-row v-if="!isUserState" class="mt-5">
        <b-col class="my-5">
          <b-form>
            <b-form-input 
              id="input-title"
              size="lg"
              placeholder="Article Title"
              style="font-size:50px;"
              class="mb-3"
              v-model="form.title"
            ></b-form-input>
            <vue-editor id="editor"
              useCustomImageHandler
              @image-added="uploadedImage"
              v-model="form.content"
            ></vue-editor>
            <b-form-input 
              id="input-tags"
              size="sm"
              placeholder="this,is,tags"
              class="mt-3"
              v-model="form.tags"
            ></b-form-input>
          </b-form>
        </b-col>
      </b-row>
    </b-container>

    <g-login-button class="d-none"></g-login-button>
  </div>
</template>

<script>
import GLoginButton from './components/GLoginButton';
import GLogoutButton from './components/GLogoutButton';
import googleMixin from './mixins/googleMixin';
import { VueEditor, Quill } from "vue2-editor";
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        title: '',
        content: '',
        featured_image: '',
        tags: ''
      },
      searchForm: {
        text: null,
        selected: 'title',
      },
      searchOptions: [
        {value: 'title', text: 'title'},
        {value: 'tags', text: 'tags'}
      ],
      editedId: null,
      articles: [],
      shownArticles: [],
      isUserState: true,
      activeStatus: '',
      filterActive: false,
      hoverTitle: false,
    }
  },
  created() {
    axios({
      method: 'GET',
      url: `${this.$baseUrl}/articles`,
      headers: {
        token: localStorage.token
      }
    })
      .then(({data}) => {
        this.articles = data.articles;
        this.switchStatus('publish');
      }).catch((err) => {
        console.log(err);
      });
  },
  methods: {
    switchStatus(status){
      this.activeStatus = status;
      this.shownArticles = [];
      this.articles.forEach(article => {
        if (article.status === this.activeStatus) {
          this.shownArticles.push(article);
        }
      });
    },
    deleteArticle(articleId) {
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          axios({
            method: 'DELETE',
            url: `${this.$baseUrl}/articles/${articleId}`,
            headers: {
              token: localStorage.token
            }
          })
            .then(({data}) => {
              this.$swal(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              );
              this.deactivateFilter();
            }).catch((err) => {
              this.$swal(
                'Please Try Again!',
                'Something went wrong when deleting your article',
                'error'
              );
            });
        }
      })
    },
    deactivateFilter() {
      this.filterActive = false;
      this.searchForm.text = '';
      this.searchForm.selected = 'title';
      axios({
        method: 'GET',
        url: `${this.$baseUrl}/articles`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({data}) => {
          this.articles = data.articles;
          this.switchStatus(this.activeStatus);
        }).catch((err) => {
          console.log(err);
        });
    },
    searchArticle() {
      if (this.searchForm.selected === 'tags') {
        this.filterByTagName(this.searchForm.text);
      } else {
        this.filterActive = true;
        axios({
          method: 'GET',
          url: `${this.$baseUrl}/articles/title/${this.searchForm.text}`,
          headers: {
            token: localStorage.token
          }
        })
          .then(({data}) => {
            if (!data.articles.length) {
              this.deactivateFilter();
              this.$swal(
                'Warning!',
                'Got nothing with the search',
                'warning'
              )
            } else {
              this.articles = data.articles;
              this.switchStatus(this.activeStatus);
            }
          }).catch((err) => {
            console.log(err);
          });
      }
    },
    filterByTagName(tag) {
      this.filterActive = true;
      axios({
        method: 'GET',
        url: `${this.$baseUrl}/articles/tags/${tag}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({data}) => {
          if (!data.articles.length) {
            this.deactivateFilter();
            this.$swal(
              'Warning!',
              'Got nothing with the search',
              'warning'
            )
          } else {
            this.articles = data.articles;
            this.switchStatus(this.activeStatus);
          }
        }).catch((err) => {
          console.log(err);
        });
    },
    editArticle(articleId) {
      axios({
        method: 'GET',
        url: `${this.$baseUrl}/articles/${articleId}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({data}) => {
          this.form.title =  data.title;
          this.form.content =  data.content;
          this.form.featured_image = data.featured_image;
          this.form.tags =  data.tags.join();
          this.editedId = data._id;
          this.showPostPage();
        }).catch((err) => {
          console.log(err);
        });
    },
    getAuth(val) {
      if (!val) {
        const Toast = this.$swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', this.$swal.stopTimer)
            toast.addEventListener('mouseleave', this.$swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'success',
          title: 'Log out successfully'
        });

        this.$router.replace({ name: "login-page" });
      }
    },
    underConstruction() {
      this.$swal(
        'Warning!',
        'This feature is under construction',
        'warning'
      )
    },
    showPostPage() {
      this.isUserState = false;
    },
    showUserPage() {
      this.isUserState = true;
    },
    saveArticle(status) {
      const {title, content, featured_image, tags} = this.form;

      if (!this.editedId) {
        axios({
          method: 'POST',
          url: `${this.$baseUrl}/articles`,
          headers:{
            token: localStorage.token
          },
          data: {
            title,
            content,
            featured_image,
            tags: tags.split(','),
            status
          }
        })
          .then(({data}) => {
            this.$swal({
              position: 'top-end',
              icon: 'success',
              title: 'Your article has been saved',
              showConfirmButton: false,
              timer: 1500
            })
            location.reload();
          }).catch((err) => {
            console.log(err);
          });
      } else {
        axios({
          method: 'PATCH',
          url: `${this.$baseUrl}/articles/${this.editedId}`,
          headers:{
            token: localStorage.token
          },
          data: {
            title,
            content,
            featured_image,
            tags: tags.split(','),
            status
          }
        })
          .then(({data}) => {
            this.editedId = null;
            this.$swal({
              position: 'top-end',
              icon: 'success',
              title: 'Your article has been saved',
              showConfirmButton: false,
              timer: 1500
            });
            location.reload();
          }).catch((err) => {
            console.log(err);
          });
      }
    },
    uploadedImage(file, Editor, cursorLocation, resetUploader) { 
      let formData = new FormData();
      formData.append('file', file);

      axios({
        url: `${this.$baseUrl}/articles/image`,
        method: 'POST',
        headers:{
          token: localStorage.token
        },
        data: formData
      })
        .then(({data}) => {
          let url = data.filename;
          this.form.featured_image = url;
          Editor.insertEmbed(cursorLocation, "image", url);
          // resetUploader();
        })
        .catch((err) => {
          console.log(err);
        })
    },
  },
  components: {
    GLoginButton,
    GLogoutButton,
    VueEditor
  },
  mounted() {
    googleMixin.renderButton();
  },
  mixins: [googleMixin]
}
</script>

<style scoped>
.navbar-brand:hover {
  border-bottom: solid 2px black;
}

.navbar-brand {
  border-bottom: solid 2px transparent;
}
</style>