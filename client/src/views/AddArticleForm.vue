<template>
  <div class="mt-2 p-2 custom-container-that-user-unique">
    <b-form>
      <div class="text-center text-light mb-4">
        <h1>Create New Article</h1>
      </div>
      <b-form-row>
        <b-col cols="6">
          <b-input type="text" placeholder="Article Title"></b-input>
        </b-col>
        <b-col>
          <b-form-file placeholder="Featured image"></b-form-file>
        </b-col>
      </b-form-row>
      <vue-editor v-model="content" class="mt-2 bg-light"></vue-editor>
      <b-form-tags
        v-model="tags"
        class="my-2"
        separator=" ,;"
        size="sm"
        tag-class="super-unique-custom-tag-ever-made"
        remove-on-delete
        no-outer-focus
      ></b-form-tags>
      <b-button class="super-unique-custom-button" type="submit"
        >Create!</b-button
      >
    </b-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
  name: 'add-article-form',
  data: function() {
    return {
      tags: [],
      content: '',
    }
  },
  components: {
    VueEditor,
  },
}
</script>

<style>
.custom-container-that-user-unique {
  background-color: rgb(0, 0, 0, 0.1) !important;
}

.super-unique-custom-tag-ever-made {
  background-color: #6e8f8a !important;
}

.super-unique-custom-button {
  background-color: #6e8f8a !important;
  border: #6e8f8a !important;
  border-color: #6e8f8a !important;
}

.super-unique-custom-button:hover {
  background-color: #a2b8b4 !important;
  border: #a2b8b4 !important;
  border-color: #a2b8b4 !important;
}

.ql-editor {
  height: 60vh !important;
}
</style>
