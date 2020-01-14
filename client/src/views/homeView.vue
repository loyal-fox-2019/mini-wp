<template>
  <b-container>
    <b-row>
        <navigationBar></navigationBar>
        <section class="pages-wrapper mt-5">
          <formArticle></formArticle>
        </section>
    </b-row>
  </b-container>
</template>

<script>
import navigationBar from '../components/navigationBar'
import formArticle from '../components/formArticle'
export default {
  data() {
    return {

    }
  },
  components: {
    navigationBar,
    formArticle
  }
}
</script>

<style scoped>
  .pages-wrapper {
    width: 100%;
  }
</style>