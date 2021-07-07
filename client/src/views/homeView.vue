<template>
  <b-container>
    <b-row>
        <navigationBar 
          @changeLogin="changeLogin($event)" 
          @changePage="changePage($event)"
          :name="name">
        </navigationBar>
        <section class="pages-wrapper mt-5">
          <formArticle v-if="page=='newArticle'" @changePage="changePage($event)" :idArticle="idArticle"></formArticle>
          <listArticle 
            @editArticle="editArticle($event)" 
            @showArticle="showArticle($event)" 
            v-if="page=='listArticle'"></listArticle>
          <showArticle 
            v-if="page=='showArticle'" 
            :idArticle="idArticle"></showArticle>
        </section>
    </b-row>
  </b-container>
</template>

<script>
import navigationBar from '../components/navigationBar'
import formArticle from '../components/formArticle'
import listArticle from '../components/listArticle'
import showArticle from '../components/showArticle'

export default {
  data() {
    return {
      name: '',
      page: 'listArticle',
      idArticle: ''
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
    },
    editArticle(event) {
      this.idArticle = event
      this.changePage('newArticle')
    },
    showArticle(event) {
      this.idArticle = event
      this.changePage('showArticle')
    }
  },
  created() {
    this.getName()
  },
  components: {
    navigationBar,
    formArticle,
    listArticle,
    showArticle
  }
}
</script>

<style scoped>
  .pages-wrapper {
    width: 100%;
    padding: 2rem;
  }
</style>