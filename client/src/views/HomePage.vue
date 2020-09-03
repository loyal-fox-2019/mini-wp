<template>
  <div class="homepage">
    <Navbar @loginStatus="status" @changePage="changePage" @searchContent="searchContent"> </Navbar>
    <div class="content">
      <div class="container side-line pb-4">
        <div v-if="page == 'showAllArticle'">
          <CardAll v-for="article in articles" :key="article._id" :article="article" @readMore="readMore" class="mt-4"> </CardAll>
        </div>
        <div v-if="page == 'showArticle'">
          <CardAll v-for="article in articles" :key="article._id" :article="article" @readMore="readMore" class="mt-4"> </CardAll>
        </div>
        <div v-else-if="page == 'detailArticle'">
          <Detail :article='articleDetail' @changePage="changePage" @editArticle="editArticle"> </Detail>
        </div>
        <Create v-else-if="page =='createArticle'" @changePage="changePage"></Create>
        <Edit v-else-if="page == 'editArticle'" :article='articleDetail'  @changePage="changePage"></Edit>
      </div>
    </div>
  </div>
</template>

<script>
import Detail from '../components/DetailArticle'
import CardAll from '../components/Card'
import Navbar from '../components/navbar'
import Create from '../components/CreateArticle'
import Edit from '../components/EditArticle'
import axios from '../server'
import swal from 'sweetalert2'

export default {
  data () {
    return {
      articles: [],
      articleDetail: [],
      page: 'showAllArticle',
    }
  },
  components : {
    Navbar, CardAll, Detail, Create, Edit
  },
  methods: {
    status(status) {
      this.$emit('loginStatus', status)
    },
    changePage(e) {
      if(e == 'showAllArticle') this.fetchAllArticle()
      else if(e == 'showArticle') this.fetchArticle()
      this.page = e
    },
    searchContent(e) {
      let url 
      if (!e) url = `articles/all`
      else url = `articles/search?content=${e}`
      this.page = 'showAllArticle'
      axios({
        method: 'GET',
        url,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        this.articles = data
      })
      .catch(err => {
        swal.fire({
          title: "Error!",
          text: err.response.data.message,
          icon: "error",
          confirmButtonText: "Ok"
        });
      })
    },
    fetchArticle() {
      axios({
        method: 'GET',
        url: 'articles',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        this.articles = data
        if(this.articles.length == 0) {
          swal.fire({
            title: "No data founded!",
            text: `Lets write youre Article .......`,
            icon: "success",
            confirmButtonText: "Ok"
          });
        }
      })
      .catch(err => {
        swal.fire({
          title: "Error!",
          text: err.response.data.message,
          icon: "error",
          confirmButtonText: "Ok"
        });
      })
    },
    fetchAllArticle() {
      axios({
        method: 'GET',
        url: 'articles/all',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        this.articles = data
        if(this.articles.length == 0) {
          swal.fire({
            title: "No data founded!",
            text: `Lets write youre Article .......`,
            icon: "success",
            confirmButtonText: "Ok"
          });
        }
      })
      .catch(err => {
        swal.fire({
          title: "Error!",
          text: err.response.data.message,
          icon: "error",
          confirmButtonText: "Ok"
        });
      })
    },
    readMore(val) {
      this.articleDetail = val
      this.page = 'detailArticle'
    },
    editArticle(val) {
      this.articleDetail = val
      this.page = 'editArticle'
    }
  },
  created () {
    this.fetchAllArticle()
  }
}
</script>

<style scoped>

.content {
  height: 89.5vh;
  width: 100vw;
}

.side-line {
  overflow: scroll;
  height: 100%;
  border-left: 3px solid #007bff;
  border-right: 3px solid #007bff
}
</style>