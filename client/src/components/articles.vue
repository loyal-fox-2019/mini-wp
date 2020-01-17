<template>
  <div id="main-div">


    <!-- If loading display this section -->
    <section>
      <section id="header-text" class="mt-5 text-center"
      style="color: #007bff" v-show="!showDetail">
        <h1>TODAY A READER TOMORROW A LEADER</h1>
        <hr>
      </section>
      <section id="list-articles" class="container" v-if="!showDetail">


        <b-nav-form class="justify-content-center mb-5">
          <form action="submit" @submit.prevent="titleSearchMethod">
            <b-form-input size="sm" v-debounce="titleSearchMethod"
            v-model="titlesearch" class="mr-sm-2" placeholder="Search by title"></b-form-input>
            <b-button size="sm" pill variant="outline-primary"
            class="my-2 my-sm-0" @click="titleSearchMethod" >Search</b-button>
          </form>
        </b-nav-form>


        <section v-if="loading" id="loading">
          <div class="row row-cols-4 justify-content-center">
            <b-card-text class="text-center mt-2 mb-5">
              <b-spinner style="width: 5rem; height: 5rem;" variant="success" label="Spinning"></b-spinner>
              <br>
              <!-- Should display random quotes when loading -->
              <h1 class="mt-5">
                Loading...
              </h1>
              <!--  -->
            </b-card-text>
          </div>
        </section>
        <!-- -->
        
        <div id="non-loading" v-else>

          <section v-show="notFound" id="empty">
            <img src="../assets/emptyArticlesArray.svg" alt="Snow" style="width:100%;" id="image-notfound">
            <div class="centered">Upps... <br>We cannot find article that match</div>
          </section>


          <div class="row row-cols-4 mb-5 justify-content-center animated fadeIn">
            <b-card
              href="#"
              v-for="article in articles"
              :key="article._id"
              :title="article.title"
              :img-src="article.featured_image"
              img-alt="Image"
              img-top
              tag="article"
              style="max-width: 15rem; margin: 5px"
              class="mb-2"
              @click.prevent="current(article)"
            >
              <b-card-text>
                Published at: <strong>{{date(article.createdAt)}}</strong>
                <br>
                By: <strong>{{article.author.fullname}}</strong>
                <br>
                <br>
                <em>Tags: <a v-for="tag in article.tags" @click.prevent="changeTag(tag)" :key="tag" href="#" >{{tag}},</a></em>
              </b-card-text>
              <b-button href="#" @click="current(article)" variant="outline-primary">Read full</b-button>
            </b-card>
          </div>

        </div>
      </section>
      <section v-else id="detail-section">
        <h1 class="text-center">{{currentArticle.title}}</h1>
        <div class="text-center">
          <b-button variant="primary" @click="back">Back to articles list</b-button>
        </div>
        <div class="mt-3 mb-0" id="featuredimage">
          <b-img id="article-img" :src="currentArticle.featured_image" fluid alt="Responsive image"></b-img>
        </div>
        <div id="detail" v-html="currentArticle.content"></div>
        <div id="footer">
          <strong>"{{currentArticle.title}}"</strong> was published at {{date(currentArticle.createdAt)}}.<br>
          Author: <strong>{{currentArticle.author.fullname}}</strong> <br>
          <em>Tags: <a v-for="tag in currentArticle.tags" @click.prevent="changeTag(tag)" :key="tag" href="#" >{{tag}},</a></em>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import axios from '../../api/server';

export default {
  props: {
    page: {
      type: String,
    },
  },
  data() {
    return {
      titlesearch: '',
      message: 'Hello world',
      articles: [],
      loading: true,
      tagSearch: '',
      notFound: false,
      currentArticle: {},
      showDetail: false,
    };
  },
  methods: {
    back() {
      this.showDetail = false;
      this.currentArticle = {};
    },
    current(value) {
      this.loading = true;
      this.currentArticle = value;
      setTimeout(() => {
        this.loading = false;
        this.showDetail = true;
      }, 500);
    },
    changeTag(value) {
      this.tagSearch = value
      this.titleSearchMethod();
    },
    titleSearchMethod() {
      this.showDetail = false
      this.currentArticle = {};
      // method to filter articles by it title or it tags
      this.loading = true;
      axios
        .get(`/articles/search?f=${this.tagSearch}&title=${this.titlesearch}`)
        .then(({ data }) => {
          // check if data empty or not, if empry empry section will show
          if (data.length === 0) {
            this.notFound = true
          } else {
            this.notFound = false;
          }
          this.articles = data
          this.tagSearch = '';
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
          setTimeout(() => {
            this.loading = false;
          }, 500);
        });
    },
    date(value) {
      // method to get good format date to display, eg: DAY, DD MM YYY
      const fulldate = value.split('T')[0]
      const date = fulldate.split('-')[2]
      const day = this.getDay(fulldate)
      const month = this.getMonth(fulldate)
      const year = fulldate.split('-')[0]
      const display = `${day}, ${date} ${month} ${year}`
      return display
    },
    getDay(date) {
      const d = new Date(date)
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const day = days[d.getDay()]
      return day;
    },
    getMonth(date) {
      const d = new Date(date)
      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const month = months[d.getMonth()];
      return month;
    },
    fetchData() {
      this.showDetail = false
      this.currentArticle = {};
      this.loading = true;
      axios
        .get('/articles')
        .then(({ data }) => {
          this.articles = null;
          this.articles = data;
          setTimeout(() => {
            this.loading = false;
          }, 500);
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
    },
  },
  computed: {
    
  },
  watch: {
    page: function(value) {
      if (value === 'articles') {
        this.fetchData();
      }
    },
  },
};
</script>

<style scoped>
#loading {
  margin-top: 10%
}
b-card {
  margin: 1rem;
}
hr {
  left: 50%;
  transform: translate(50%, 0);
  width: 50vw;
}

#header-text {
  /* margin-top: 10% !; */
  padding: 2rem;
}

#empty {
  position: relative;
  text-align: center;
  color: white;
}
.centered {
  color: white;
  border-radius: 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  padding: 1rem;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: black;
}

#image-notfound {
  height: 50vh;
}
#detail {
  position: relative;
  margin-top: 5%;
  margin-left: 10%;
  margin-right: 10%;
  border: 2px solid darkslategray;
  padding: 1em;
}

#footer {
  margin-top: 3em;
  text-align: left;
  margin-left: 10%;
  margin-right: 10%;
  margin-bottom: 2%;
  border: 1px solid darkslategray;
  padding: 1em;
  width: 20vw;
}
#featuredimage {
  position: relative;
  left: 50%;
  margin-top: 5%;
  width: 40vw;
  transform: translate(-50%, 0%)
}
#article-img{
  border: 2px dotted darkslategray;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 1rem;
  box-shadow: 1rem 1rem 1rem darkslategray;
  border-radius: 1em;
}
#detail-section {
  margin-top: 5%;
  margin-bottom: 2%;
  width: 70vw;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0%);
  background-color: snow;
  /* background: rgba(0, 0, 0, 0.384); */
  border-radius: 1rem;
  padding: 1em;
}
</style>