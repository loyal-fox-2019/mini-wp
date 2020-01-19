<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-2 bg-white responseVertical" id="col-left">
          <div
            class="nav flex-column nav-pills"
            id="v-list-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            <a
              class="nav-link active"
              id="blogPost-tab"
              data-toggle="pill"
              href="#blogPost"
              role="tab"
              aria-controls="blogPost"
              aria-selected="false"
            >Blog Posts</a>
          </div>
        </div>

        <div class="col-10 bg-light responseVertical">
          <div class="contentRight p-5">
            <div
              class="tab-pane fade show active"
              id="blogPost"
              role="tabpanel"
              aria-labelledby="blogPost-tab"
            >
              <h4>Posts</h4>
              <div class="navPosts">
                <div class="box border">
                  <ul class="nav nav-pills" id="pills-tab" role="tablist">
                    <li class="nav-item">
                      <a
                        class="nav-link active"
                        id="pills-published-tab"
                        data-toggle="pill"
                        href="#pills-published"
                        role="tab"
                        aria-controls="pills-published"
                        aria-selected="true"
                      >Published</a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        id="pills-draft-tab"
                        data-toggle="pill"
                        href="#pills-drafts"
                        role="tab"
                        aria-controls="pills-draft"
                        aria-selected="false"
                      >Drafts</a>
                    </li>
                    <li class="nav-item-search">
                      <input v-model="search" type="text" class="form-control" placeholder="🔍" />
                    </li>
                  </ul>
                </div>
              </div>

              <div class="tab-content">
                <div
                  class="tab-pane fade show active"
                  id="pills-published"
                  role="tabpanel"
                  aria-labelledby="pills-published-tab"
                >
                  <div class="list-group-item section-header is-compact">
                    <div class="sectionHeaderLabel">
                      <span>Posts</span>
                    </div>
                    <div class="button sectionHeaderAction">
                      <button
                        class="btn btn-danger"
                        data-toggle="modal"
                        data-target="#addArticleModal"
                      >add new article</button>
                    </div>
                  </div>
                </div>

                <div
                  class="tab-pane fade"
                  id="pills-drafts"
                  role="tabpanel"
                  aria-labelledby="pills-drafts-tab"
                >
                  <div class="empty-content text-center">
                    <img
                      src="https://angialand.com.vn/wp-content/uploads/2018/04/404-not-found.png"
                      alt="page"
                      class="mt-5"
                    />
                    <h4 class="my-3">No Posts Found</h4>
                    <a href="#" class="btn btn-danger btn-s small">Add New Post</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>