<template>
  <div class="custom-container">
    <b-row class="vw-100 h-100">
      <b-col cols="2" class="p-2">
        <b-container>
          <b-list-group>
            <b-list-group-item :to="{ path: '/user/add-article' }" :active="$route.name === 'addArticle'">Add article</b-list-group-item>
            <b-list-group-item :to="{ path: '/user/all-articles' }" :active="$route.name === 'allArticles'">All articles</b-list-group-item>
            <b-list-group-item :to="{ path: '/user/published-articles'}" :active="$route.name === 'publishedArticles'">Published</b-list-group-item>
            <b-list-group-item :to="{ path: '/user/draft-articles'}" :active="$route.name === 'draftArticles'">Draft</b-list-group-item>
          </b-list-group>
        </b-container>
      </b-col>

      <b-col>
        <transition name="fade" mode="out-in">
          <router-view :userArticles="userArticles" @newArticle="$emit('newArticle', $event)" @updateArticleList="$emit('updateArticleList')"></router-view>
        </transition>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'user-page',
  props: ['userArticles']
}
</script>

<style scoped>
.custom-container {
  height: 90%;
}

.active {
  background-color: #6e8f8a !important;
  border-color: #6e8f8a !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0.3;
}
</style>
