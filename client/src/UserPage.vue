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

    <b-container fluid>
      <b-row v-if="articles.length === 0 && isUserState" class="mt-5 vh-100 justify-content-center" style="background-color:#F6F7F7;">
        <b-col cols="6" class="text-center mt-5">
          <i class="fab fa-vuejs fa-5x"></i>
          <h1 class="font-weight-light my-3">You don't have any article yet.</h1>
          <h3 class="font-weight-lighter my-3">Would you like to start one?</h3>
          <b-button variant="danger" class="mt-5" @click.prevent="showPostPage">Create article</b-button>
        </b-col>
      </b-row>

      <b-row v-else-if="articles.length > 0 && isUserState">
        <b-col cols="2" class="vh-100 p-0 overflow-auto mt-3">
          <b-nav vertical>
            <b-nav-item style="font-size: 16px;" @click.prevent="underConstruction"><i class="fas fa-tv"></i> View Site</b-nav-item>
            <b-nav-item style="font-size: 16px;" @click.prevent="underConstruction"><i class="fas fa-chart-bar"></i> Stats</b-nav-item>
            <b-nav-item style="font-size: 16px;" @click.prevent="underConstruction"><i class="fas fa-history"></i> Activity</b-nav-item>
            <a class="nav-link d-flex justify-content-between" style="font-size: 16px;" @click.prevent="underConstruction" href="#">
              <span><i class="fas fa-columns"></i> Plan</span>
              <span class="font-weight-bolder">Free</span>
            </a>
            <p class="text-secondary font-weight-bolder mx-3 pt-2 pb-0" style="font-size: 20px;">Manage</p>
            <a class="nav-link d-flex justify-content-between" style="font-size: 16px;" @click.prevent="underConstruction" href="#">
              <span><i class="far fa-file-alt"></i> Site Pages</span>
              <span><button type="button" class="btn btn-sm btn-outline-dark">Add</button></span>
            </a>
            <a class="nav-link d-flex justify-content-between" style="font-size: 16px;" @click.prevent="underConstruction" href="#">
              <span><i class="fas fa-align-left"></i> Blog Posts</span>
              <span><button type="button" class="btn btn-sm btn-outline-dark">Add</button></span>
            </a>
            <a class="nav-link d-flex justify-content-between" style="font-size: 16px;" @click.prevent="underConstruction" href="#">
              <span><i class="fas fa-photo-video"></i> Media</span>
              <span><button type="button" class="btn btn-sm btn-outline-dark">Add</button></span>
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
      </b-row>

      <b-row v-if="!isUserState" class="mt-5">
        <b-col class="mt-5">
          <b-form @submit="saveArticle">
            <b-form-input 
              id="input-large"
              size="lg"
              placeholder="Article Title"
              style="font-size:50px;"
              class="mb-3"
            ></b-form-input>
            <vue-editor id="editor" useCustomImageHandler @image-added="uploadedImage" v-model="form.content"></vue-editor>
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
      },
      articles: [],
      isUserState: true,
    }
  },
  methods: {
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
    saveArticle() {

    },
    uploadedImage(file, Editor, cursorLocation, resetUploader) { 
      const formData = new FormData();
      formData.append("image", file);
 
      axios({
        url: 'https://api.imgur.com/3/image',
        method: 'POST',
        headers:{
          'Authorization': 'Client-ID 993793b1d8d3e2e'
        },
        data: formData
      })
        .then((result) => {
          console.log(result);
          let url = result.data.data.link
          Editor.insertEmbed(cursorLocation, 'image', url);
        })
        .catch((err) => {
          console.log(err);
        })
    }
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

</style>