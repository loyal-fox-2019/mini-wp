<template>
  <div>
    <!-- Start of Main Content-Articles -->
    <div class="main-content-article">
      <div class="row justify-content-between">
        <div class="col-sm-6 cust-margin-1">
          <h1 v-if="selectedSub=='myArticles'">My Articles</h1>
          <h1 v-if="selectedSub=='discoverArticles'">Discover Articles</h1>
          <h1 v-if="selectedSub=='findTags'">Search Articles by Tag</h1>
          <h1 v-if="selectedSub=='findAuthors'">Search Articles by Author</h1>
        </div>
        <div class="col-sm-4 cust-margin-1" id="cust-post-search">
          <form class="form-inline my-2 my-lg-0">
            <!-- Search My Articles -->
            <input
              v-if="selectedSub=='myArticles'"
              autocomplete="off"
              class="form-control mr-sm-2 cust-post-search-bar"
              type="text"
              id="articleSearch"
              placeholder="Search My Articles. . ."
              aria-label="Search"
            />
            <!-- Search My Articles -->

            <!-- Discover Articles Search -->
            <input
              v-if="selectedSub=='discoverArticles'"
              autocomplete="off"
              class="form-control mr-sm-2 cust-post-search-bar"
              type="text"
              id="articleSearch"
              placeholder="Search Article Title. . ."
              aria-label="Search"
            />
            <!-- Discover Articles Search -->

            <!-- Search by TagName -->
            <input
              v-if="selectedSub=='findTags'"
              autocomplete="off"
              class="form-control mr-sm-2 cust-post-search-bar"
              type="text"
              id="articleSearch"
              placeholder="Search Tag Name. . ."
              aria-label="Search"
            />
            <!-- Search by TagName -->

            <!-- Search by Author -->
            <input
              v-if="selectedSub=='findAuthors'"
              autocomplete="off"
              class="form-control mr-sm-2 cust-post-search-bar"
              type="text"
              id="articleSearch"
              placeholder="Search Authors. . ."
              aria-label="Search"
            />
            <!-- Search by Author -->
          </form>
        </div>
      </div>

      <hr class="main-content-article-hr" />
    </div>
    <!-- Cards -->
    <div class="row row-cols-2">
      <!-- insert card Articles Here -->
        <div class="col-6 articleCards">
          <b-card
            overlay
            img-src="https://picsum.photos/900/250/?image=3"
            img-alt="Card Image"
            text-variant="white"
            title="Image Overlay"
            class="articleContent"
          >
          <b-card-text class="authorCard" v-if="selectedSub!='myArticles'">
              Author: Okka Linardi
          </b-card-text>
          <b-card-text class="authorCard" v-else>
              Status: Public
          </b-card-text>
          <b-button href="#" variant="primary" class="readFull">Read Full Article</b-button>
          <div v-if="selectedSub=='myArticles'">
          <b-button href="#" variant="warning" class="cardButton"><i class="far fa-edit"></i></b-button>
          <b-button href="#" variant="danger" class="cardButton"><i class="fas fa-trash-alt"></i></b-button>
          </div>
          </b-card>
        </div>
        
    </div>
    <!-- End of Cards -->
    <!-- End of Main Content-Articles -->

    <!-- Start of add an Article -->
    <div v-if="selectedSub=='addArticle'">
      <h1>Add an Article</h1>
      <hr class="main-content-article-hr" />
      <div class="add-an-article-section col-sm-6">
        <form action="/upload-single" method="post" enctype="multipart/form-data">
          <div class="form-group">
            <label for="articleTitle">Title:</label>
            <input type="text" class="form-control" id="articleTitle" />
          </div>
          <div class="form-group">
            <label for="articleImage">Image:</label>
            <input type="file" name="file" />
          </div>
          <div class="form-group">
            <label for="articleContent">Article:</label>
            <textarea type="text" class="form-control" id="articleContent"></textarea>
          </div>
          <div>
            <button type="button" class="btn btn-warning">
              Submit
              Article
            </button>
          </div>
        </form>
      </div>
    </div>
    <!-- End of Add an Article -->
  </div>
</template>

<script>
export default {
  name: "MainContent",
  data() {
    return {};
  },
  props: ["selectedSub"]
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
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
  border-radius: 7px;
}
.articleCards {
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
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 7px;
    text-align: start;
    width: 35%;
}
.readFull {
    float: left;
}
</style>