<template>
  <div>
    <!-- Start of Main Content-Articles -->
    <div class="main-content-article">
      <div class="row justify-content-between">
        <div class="col-sm-6 cust-margin-1">
          <h1 v-if="selectedSub.contentSub=='myArticles'">My Articles</h1>
          <h1 v-if="selectedSub.contentSub=='discoverArticles'">Discover Articles</h1>
          <h1 v-if="selectedSub.contentSub=='findTags'">Search Articles by Tag</h1>
          <h1 v-if="selectedSub.contentSub=='findAuthors'">Search Articles by Author</h1>
          <h1 v-if="selectedSub.contentSub=='fullArticle'">{{fullArticle.title}}</h1>
        </div>
        <div class="col-sm-4 cust-margin-1" id="cust-post-search">
          <form class="form-inline my-2 my-lg-0">
            <!-- Search My Articles -->
            <input
              v-if="selectedSub.contentSub=='myArticles'"
              autocomplete="off"
              class="form-control mr-sm-2 cust-post-search-bar"
              type="text"
              id="articleSearch"
              placeholder="Search My Articles. . ."
              aria-label="Search"
              v-model="searchMyArticles"
            />
            <!-- Search My Articles -->

            <!-- Discover Articles Search -->
            <input
              v-if="selectedSub.contentSub=='discoverArticles'"
              autocomplete="off"
              class="form-control mr-sm-2 cust-post-search-bar"
              type="text"
              id="articleSearch"
              placeholder="Search Article Title. . ."
              aria-label="Search"
              v-model="searchDiscover"
            />
            <!-- Discover Articles Search -->

            <!-- Search by TagName -->
            <input
              v-if="selectedSub.contentSub=='findTags'"
              autocomplete="off"
              class="form-control mr-sm-2 cust-post-search-bar"
              type="text"
              id="articleSearch"
              placeholder="Search Tag Name. . ."
              aria-label="Search"
              v-model="searchTags"
            />
            <!-- Search by TagName -->

            <!-- Search by Author -->
            <input
              v-if="selectedSub.contentSub=='findAuthors'"
              autocomplete="off"
              class="form-control mr-sm-2 cust-post-search-bar"
              type="text"
              id="articleSearch"
              placeholder="Search Authors. . ."
              aria-label="Search"
              v-model="searchAuthor"
            />
            <!-- Search by Author -->
          </form>
        </div>
      </div>

      <hr class="main-content-article-hr" />
    </div>
    <!-- Cards -->
    <div class="row row-cols-2 justify-content-around" v-if="selectedSub.contentSub=='myArticles'" >
      <!-- insert card Articles Here -->
      <div  class="card bg-dark text-white articleContent col-5"  v-for="(value, index) in myArticles" :key="index">
        <img v-bind:src="value.image_url" class="card-img cust-cardImg" alt="..." />
        <div class="card-img-overlay">
          <h5 class="card-title">{{value.title}}</h5>
          <p v-if="selectedSub.contentSub!='myArticles'"
            class="card-text"
          >Author: {{value.authorID.name}}
          </p>
          <p v-else
            class="card-text"
          >Status: {{value.status}}
          </p>
          <p class="card-text">{{value.created_at}}</p>
          <button href="#" class="readFull btn btn-primary" @click="readFullArticle(value)">Read Full Article</button>
          <div v-if="selectedSub.contentSub=='myArticles'">
          <button href="#" class="cardButton btn btn-warning" @click="toggleEdit(value)"><i class="far fa-edit"></i></button>
          <button href="#" class="cardButton btn btn-danger" @click="deleteArticle(value._id)"><i class="fas fa-trash-alt"></i></button>
          </div>
        </div>
      </div>    
    </div>
    <!-- End of Cards -->
    <!-- Discover -->
    <div class="row row-cols-2 justify-content-around" v-if="selectedSub.contentSub=='discoverArticles'" >
      <!-- insert card Articles Here -->
      <div  class="card bg-dark text-white articleContent col-5"  v-for="(value, index) in discoverArticles" :key="index">
        <img v-bind:src="value.image_url" class="card-img cust-cardImg" alt="..." />
        <div class="card-img-overlay">
          <h5 class="card-title">{{value.title}}</h5>
          <p v-if="selectedSub.contentSub!='myArticles'"
            class="card-text"
          >Author: {{value.authorID.name}}
          </p>
          <p v-else
            class="card-text"
          >Status: {{value.status}}
          </p>
          <p class="card-text">{{value.created_at}}</p>
          <button href="#" class="readFull btn btn-primary" @click="readFullArticle(value)">Read Full Article</button>
          <div v-if="selectedSub.contentSub=='myArticles'">
          <button href="#" class="cardButton btn btn-warning" @click="toggleEdit(value)"><i class="far fa-edit"></i></button>
          <button href="#" class="cardButton btn btn-danger" @click="deleteArticle(value._id)"><i class="fas fa-trash-alt"></i></button>
          </div>
        </div>
      </div>    
    </div>
    <!-- Discover -->

    <!-- tag Articles -->
    <div class="row row-cols-2 justify-content-around" v-if="selectedSub.contentSub=='findTags'" >
      <!-- insert card Articles Here -->
      <div  class="card bg-dark text-white articleContent col-5"  v-for="(value, index) in articleTagSearch" :key="index">
        <img v-bind:src="value.image_url" class="card-img cust-cardImg" alt="..." />
        <div class="card-img-overlay">
          <h5 class="card-title">{{value.title}}</h5>
          <p v-if="selectedSub.contentSub!='myArticles'"
            class="card-text"
          >Author: {{value.authorID.name}}
          </p>
          <p v-else
            class="card-text"
          >Status: {{value.status}}
          </p>
          <p class="card-text">{{value.created_at}}</p>
          <button href="#" class="readFull btn btn-primary" @click="readFullArticle(value)">Read Full Article</button>
          <div v-if="selectedSub.contentSub=='myArticles'">
          <button href="#" class="cardButton btn btn-warning" @click="toggleEdit(value)"><i class="far fa-edit"></i></button>
          <button href="#" class="cardButton btn btn-danger" @click="deleteArticle(value._id)"><i class="fas fa-trash-alt"></i></button>
          </div>
        </div>
      </div>    
    </div>
    <!-- Tag Articles -->
    <!-- Author Search -->
    <div class="row row-cols-2 justify-content-around" v-if="selectedSub.contentSub=='findAuthors'" >
      <!-- insert card Articles Here -->
      <div  class="card bg-dark text-white articleContent col-5"  v-for="(value, index) in articleAuthorSearch" :key="index">
        <img v-bind:src="value.image_url" class="card-img cust-cardImg" alt="..." />
        <div class="card-img-overlay">
          <h5 class="card-title">{{value.title}}</h5>
          <p v-if="selectedSub.contentSub!='myArticles'"
            class="card-text"
          >Author: {{value.authorID.name}}
          </p>
          <p v-else
            class="card-text"
          >Status: {{value.status}}
          </p>
          <p class="card-text">{{value.created_at}}</p>
          <button href="#" class="readFull btn btn-primary" @click="readFullArticle(value)">Read Full Article</button>
          <div v-if="selectedSub.contentSub=='myArticles'">
          <button href="#" class="cardButton btn btn-warning" @click="toggleEdit(value)"><i class="far fa-edit"></i></button>
          <button href="#" class="cardButton btn btn-danger" @click="deleteArticle(value._id)"><i class="fas fa-trash-alt"></i></button>
          </div>
        </div>
      </div>    
    </div>
    <!-- Author Search -->
    <!-- End of Main Content-Articles -->

    <!-- Start of add an Article -->
    <div v-if="selectedSub.contentSub=='addArticle' || selectedSub.contentSub=='editMode'">
      <h1 v-if="selectedSub.contentSub=='addArticle'">Add an Article</h1>
      <h1 v-if="selectedSub.contentSub=='editMode'">Edit Article</h1>
      <hr class="main-content-article-hr" />
      <b-form>
        <b-form-group
        id="input-group-1"
        label="Article Title:"
        label-for="articleTitle"
      >
      <b-form-input
          id="articleTitle"
          v-model="articleTitle"
          type="text"
          required
          placeholder="Enter title"
        ></b-form-input>
      </b-form-group>

      <b-form-group
          id="input-group-2"
          label="Article Thumbnail:"
          label-for="articleThumnail"
          description="We recommend using landscape oriented images for better display."
        >
        <b-form-file
        @change="onFileChange"
        v-model="file"
        :state="Boolean(file)"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
    ></b-form-file>
        </b-form-group>

      <b-form-group
          id="input-group-3"
          label="Article Content:"
          label-for="articleContent"
        >
         <quill-editor ref="myTextEditor"
                v-model="articleContent"
                :config="editorOption"
                id="quillEditor">
        </quill-editor>

    <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0" @change="statusChange">Private</b-form-checkbox>
    <br>
    <b-form-group
        id="input-group-4"
        label="Article Tags:"
        label-for="articleTags"
      >
      <b-form-input
          id="articleTags"
          v-model="articleTags"
          type="text"
          required
          placeholder="#tag1#tag2#tag3...."
        ></b-form-input>
      </b-form-group>
      <b-button v-if="selectedSub.contentSub=='addArticle'" variant="info" @click="submitArticle">Submit Article</b-button>
      <b-button v-if="selectedSub.contentSub=='editMode'" variant="info">Edit Article</b-button>
      </b-form>
    </div>
    <!-- End of Add an Article -->
    <!-- Full Article -->

    <b-container fluid id="fullArticle" v-if="selectedSub.contentSub=='fullArticle'">
      <center>
      <img id="fullThumb" v-bind:src="fullArticle.image_url" alt=". . .">
      </center>
      <br>
      <h3>By {{fullArticle.authorID.name}}</h3>
      <br>
      <p v-html="fullArticle.content"></p>
    </b-container>

    <!-- End of Full Article -->
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  name: "MainContent",
  data() {
    return {
      articleTitle:'',
      file: null,
      articleContent: '',
      articleTags: '',
      articleStatus: true,
      fullArticle: null,
      searchMyArticles: '',
      searchDiscover: '',
      searchTags: '',
      searchAuthor: '',
      content: '<h2>Example</h2>',
      editorOption: {}
    };
  },
  computed:{
    myArticles(){
      if(this.searchMyArticles==''||this.searchMyArticles==null){
        return this.selectedSub.articles
        }
      return this.selectedSub.articles.filter(element=> element.title.includes(this.searchMyArticles))
    },
    discoverArticles(){
      if(this.searchDiscover==''||this.searchDiscover==null){
        return this.selectedSub.articles
        }
      return this.selectedSub.articles.filter(element=> element.title.includes(this.searchDiscover))
    },
    articleTagSearch(){
      if(this.searchTags==''||this.searchTags==null){
        return this.selectedSub.articles
        }
      return this.selectedSub.articles.filter(element =>
            element.tags.some(tags=>{
              tags.includes(this.searchTags)
            })
      )
    },
    articleAuthorSearch(){
      if(this.searchAuthor==''||this.searchAuthor==null){
        return this.selectedSub.articles
        }
      return this.selectedSub.articles.filter(element=> element.authorID.name.includes(this.searchAuthor))
    }
  },
  props: ["selectedSub"],
  components:{
    quillEditor
  },
  methods:{
    submitArticle(){
      let data = new FormData()
            data.append('title', this.articleTitle)
            data.append('content', this.articleContent)
            data.append('image_url', this.file)
            data.append('tags', this.articleTags)
            data.append('status', this.articleStatus)
      // console.log(data)
      axios({
        method: 'post',
        url: 'http://35.247.164.26:3000/articles',
        data: data,
        headers: {
          token : localStorage.getItem('token'),
        }
      })
      .then(({ data })=>{
        Swal.fire({
              icon: 'success',
              title: 'Article Created',
              text: 'Your article has been successfully created'
          })
        this.selectedSub.contentSub = 'myArticles'
        this.selectedSub.articles = data
        this.articleTitle =''
        this.file = null
        this.articleContent = ''
        this.articleTags = ''
        this.articleStatus = true

      })
      .catch(err=>{
        Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to Create Article'
          })
      })
    },
    toggleEdit(articleData){
      this.selectedSub.contentSub = 'editMode'
      this.articleTitle = articleData.title
      this.file = null
      this.articleContent = articleData.content
      this.articleTags = '#'+articleData.tags.join('#')
      this.articleStatus = true
    },
    onFileChange(){
      this.file = event.target.files[0]
    },
    statusChange(){
      if(this.articleStatus){
        this.articleStatus = false
      }else{
        this.articleStatus = true
      }
    },
    readFullArticle(article){
      this.fullArticle = article
      this.selectedSub.contentSub='fullArticle'
      // console.log(this.fullArticle)
    },
    deleteArticle(articleID){
        this.$bvModal.msgBoxConfirm('Are you sure you want to delete this article?')
        .then(value => {
          if(value){
                  return axios({
            method: 'delete',
            url: 'http://35.247.164.26:3000/articles/'+articleID,
            headers:{
              token : localStorage.getItem('token')
              }
            })
          }
        })
          .then(({ data })=>{
          Swal.fire({
              icon: 'success',
              title: 'Deleted',
              text: 'Your article has successfully been deleted'
          })
          data.forEach(element => {
            if(element.status){
              element.status = 'Public'
            }else{
              element.status = 'Private'
            }
          })
          this.selectedSub.articles = data
        })
        .catch(err=>{
          Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Article Deletion: Failed'
          })
        })
        
    }
  }
};
</script>

<style scoped>
#cust-post-search {
  margin-top: 2%;
}

.cust-margin-1 {
  margin-top: 0.5%;
}

.cust-post-search-bar {
  width: 25vw !important;
}
.card-title {
  background-color: rgba(0, 0, 0, 0.75);
  font-size: 1.5rem;
  text-align: center;
  border-radius: 7px;
}
.card-text {
  background-color: rgba(0, 0, 0, 0.75);
  font-size: 1rem;
  border-radius: 7px;
  width: 50%;
}

.articleCards {
    margin-bottom: 2%;
}
.articleContent {
  height: 27vh;
  margin-bottom: 2%;
}
.articleContent:hover {
    transform: scale(0.98);
    transition: 1s;
}
.cardButton {
    margin-left: 1%;
    margin-top: 2%;
    float: right;
}
.authorCard {
    background-color: rgba(0, 0, 0, 0.75);
    border-radius: 7px;
    text-align: start;
    width: 35%;
    font-size: 1rem;
}
.readFull {
    float: left;
}

#fullThumb {
  max-height: 50vh;
}
.cust-cardImg {
  height: 26vh;
}
#quillEditor {
  background-color: white;
}
</style>