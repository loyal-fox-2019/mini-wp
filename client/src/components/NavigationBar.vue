<template>
  <div>
    <header>
      <div class="row no-gutters">
        <div class="col-1 logoWP justify-content-center" v-on:click="gobackhome">
          <div class="row mt-3 roLogo">
            <div class="col-2">
              <div class="logo">
                <i class="fab fa-wordpress fa-lg"></i>
              </div>
            </div>
            <div class="col-8">
              <h5 id="tulisanWP">MiniWP</h5>
            </div>
          </div>
        </div>
        <div class="col-5">
          <b-navbar-nav class="ml-auto navbar">
            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" placeholder="Search by title" v-model="title"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" v-on:click="search">Search</b-button>
            </b-nav-form>
          </b-navbar-nav>
        </div>
        <div class="col-6">
          <nav class="navbar d-flex justify-content-end position-relative">
            <div id="kananNav">
              <div class="form-inline">
                <!-- <i class="fas fa-user-circle fa-lg" id="iconUser"></i> -->
                <button class="btn btn-outline-danger tombol mx-2" v-on:click="logout">Logout</button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import axios from "axios";
export default {
  name: "NavigationBar",
  data() {
    return {
      title: "",
      baseUrl: "http://localhost:3000"
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$emit("udahLogout");
    },
    search() {
      let url = this.baseUrl;
      let title = this.title;
      console.log(title, "ini title");
      axios({
        method: "GET",
        url: `${url}/title/${title}`
      })
        .then(found => {
          // console.log(found);
          this.$emit("byTitle", found);
        })
        .catch(err => {
          console.log(err);
        });
    },
    gobackhome() {
      this.$emit("gobackhome");
    }
  }
};
</script>

<style scoped>
#iconUser:hover {
  color: #cfb495;
  cursor: pointer;
}
#iconWrite {
  border-color: white;
}
.navbar {
  background-color: #4d4646;
  min-height: 60px;
}

.logoWP {
  background-color: #cfb495;
  max-height: 70px;
  max-width: 300px;
}

.logoWP:hover {
  cursor: pointer;
}
.roLogo {
  /* margin-left: 1px; */
  color: #4d4646;
}

#tulisanWP {
  font-size: 21px;
  font-weight: 800;
}
</style>