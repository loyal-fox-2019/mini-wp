<template>
  <div>
    <TheNavbar></TheNavbar>
    <EditorForm></EditorForm>
  </div>
</template>

<script>
import TheNavbar from './components/TheNavbar'
import EditorForm from './components/EditorForm'
export default {
  name: 'app',
  components: {
    TheNavbar,
    EditorForm
  },
  data () {
    return {

    }
  },
  methods: {

  },
  created () {

  }
}
</script>

<style>

</style>