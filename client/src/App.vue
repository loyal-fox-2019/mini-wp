<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark positionNya">
      <a class="navbar-brand cursorNya" @click.prevent="showHomePage">Mini Word Press</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-end" id="navbarTogglerDemo02">
        <i @click.prevent="showAddPostinganPage" class="cursorNya material-icons" style="color:white;margin-right:12px">border_color</i>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          <div @click="showProfilePage" class="img-frame-circle">
            <img
              src="data:image/jpeg;base64,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"
              alt="Image"
              class="img-fluid"
            />
          </div>
        </form>
      </div>
    </nav>
    <RegisterLogin @login-component="hideLoginRegister" v-show="registerLoginPage"></RegisterLogin>
    <ProfilePage :articles="userArticles" v-show="profilePage"></ProfilePage>
    <AddPostingan v-show="AddPostinganPage"></AddPostingan>
    <HomePage :articles="articles" v-show="homePage"></HomePage>
  </div>
</template>

<script>
import HomePage from "./views/HomePage";
import ProfilePage from "./views/ProfilePage";
import RegisterLogin from "./views/RegisterLogin";
import AddPostingan from './views/AddPostingan'
export default {
  name: "App",
  components: {
    HomePage,
    RegisterLogin,
    ProfilePage,
    AddPostingan
  },
  created() {},

  data() {
    return {
      articles: null,
      userArticles: null,
      homePage: false,
      registerLoginPage: true,
      profilePage: false,
      AddPostinganPage: false
    };
  },
  methods: {
    showHomePage() {
      axios({
        method: 'get',
        url: 'http://localhost:3000/findAllArticle'
      })
      .then(({data}) => {
        this.articles = data
      })
      .catch((err) => {
        console.log(err)
      })
      console.log(this.articles);
      
      this.homePage = true;
      this.registerLoginPage = false;
      this.profilePage = false;
      this.AddPostinganPage = false;
    },
    showLoginPage() {
      this.homePage = false;
      this.registerLoginPage = true;
      this.profilePage = false;
      this.AddPostinganPage = false;
    },
    showProfilePage() {
      axios({
        method: 'get',
        url: 'http://localhost:3000/findUserArticle',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        this.userArticles = data
      })
      .catch((err) => {
        console.log(err)
      })
      this.homePage = false;
      this.registerLoginPage = false;
      this.profilePage = true;
      this.AddPostinganPage = false;
    },
    showAddPostinganPage(){
      this.homePage = false;
      this.registerLoginPage = false;
      this.profilePage = false;
      this.AddPostinganPage = true;
    }
    ,
    hideLoginRegister(value){
      if (value) {
        this.showProfilePage()
      }
    }
    
  }
};
</script>
<style scoped>
.img-frame-circle {
  position: relative;
}

.cursorNya{
  cursor: pointer;
}

.img-frame-circle > .img-fluid {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-left: 10px;

  object-fit: cover;
  object-position: center right;
}
</style>