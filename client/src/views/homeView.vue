<template>
  <b-container>
    <b-row>
        <navigationBar 
          @changeLogin="changeLogin($event)" 
          :name="name">
        </navigationBar>
        <section class="pages-wrapper mt-5">
          <formArticle v-if="page=='addArticle'" @changePage="changePage($event)"></formArticle>
          <listArticle v-if="page=='listArticle'"></listArticle>
        </section>
    </b-row>
  </b-container>
</template>

<script>
import navigationBar from '../components/navigationBar'
import formArticle from '../components/formArticle'
import listArticle from '../components/listArticle'

export default {
  data() {
    return {
      name: '',
      page: 'listArticle'
    }
  },
  methods: {
    getName() {
      this.name = localStorage.getItem('name')
    },
    changeLogin(event) {
      this.$emit('changeLogin', event)
    },
    changePage(event) {
      this.page = event
    }
  },
  created() {
    this.getName()
  },
  components: {
    navigationBar,
    formArticle,
    listArticle
  }
}
</script>

<style scoped>
  .pages-wrapper {
    width: 100%;
    padding: 2rem;
  }
</style>