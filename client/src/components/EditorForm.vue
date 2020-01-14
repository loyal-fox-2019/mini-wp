<template>
  <div class=" bg-white p-8 w-4/5 mx-auto max-w-xl rounded-lg shadow mt-4">
    <div id="preview" class="mt-4">
      <img v-if="url" :src="url" class=" max-w-lg rounded-lg mx-auto" />
    </div>
    <form class="my-4 text-lg">
      <div>
        <input class="shadow-md border rounded-sm border-gray-200 w-full p-2" placeholder="Title">
      </div>
      <div class="overflow-auto z-0">
        <wysiwyg class="h-full my-4 w-full rounded-sm shadow-md overflow-auto" v-model="content"/>
      </div>
      <div class="mb-4">
        <span>Set Featured Image: </span>
        <input type="file" @change="onFileChange">
      </div>
      <button
        class="bg-blue-400 px-2 py-1 rounded-sm shadow-md text-white hover:bg-blue-700"
        type="submit">
        Submit 
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'EditorForm',
  component: {
  },
  data () {
    return {
      content: '',
      url: null
    }
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    }
  }
}
</script>

<style scoped>

</style>