<template>
   <div class="shadow bg-white rounded p-8 mb-8">
      <form class="flex flex-col w-full" @submit.prevent="submitArticle">
         <div class="px-6">
            <input type="text" id="title" placeholder="Title" class="mt-3 mb-6 py-2 rounded px-3 w-full" :disabled="isUploading"/>
         </div>

         <div class="px-6 w-full mb-6">
            <!-- <input type="text" id="content" placeholder="Content" class="my-3 py-2 rounded px-3 w-full"/> -->
            <wysiwyg v-model="myHTML"></wysiwyg>
         </div>

         <div class="mb-6 px-6">
            <p>Featured Image<span class="text-red-400">*</span></p>
            <input type="file" ref="file" @change="uploadImage" :disabled="isUploading">
         </div>

         <VueTagsInput
            v-model="tag"
            :tags="tags"
            @tags-changed="newTags => tags = newTags"
            class="tag-input px-5 mb-6"
         ></VueTagsInput>

         <div class="px-6 w-full mb-6">
            <p class="text-sm text-gray-500 mb-2">If you choose "public" audience, your post will be able to be read by other users</p>

            <div class="flex items-center">
               <div class="px-2">
                  <input type="radio" v-model="audience" value="private" checked>Private
               </div>
               <div class="px-2">
                  <input type="radio" v-model="audience" value="public">Public
               </div>
            </div>
         </div>

         <div class=" px-6 w-full mb-6">
            <input type="submit" value="Post" class="w-full rounded py-2 text-xl font-semibold text-white bg-gray-500 hover:bg-teal-500 cursor-pointer" :disabled="isUploading"/>
         </div>
      </form>
   </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input'
import axios from '../services/server'

export default {
   name: 'ArticleWrite',

   components: {
      VueTagsInput
   },

   data() {
      return {
         title: '',
         tag: '',
         tags: [],
         myHTML: '',
         audience: 'private',
         file: '',
         image: '',
         isUploading: false
      }
   },

   methods: {
      submitArticle: async function() {
         const tags = this.tags.map(tag => tag.text)

         try {
            this.isUploading = true

            const {data} = await axios.post(`/article`, {
               title: this.title,
               content: this.myHTML,
               tags: this.tags,
               featured_image: this.image,
               audience: this.audience
            })

            this.isUploading = false
         }
         catch (error) {
            Swal.fire({
               position: 'center',
               icon: 'error',
               title: 'Posting new article has failed',
               text: error.response.data.message,
               showConfirmButton: true,
               timer: 2300
            })
         }
      },

      uploadImage: async function() {
         try {
            this.isUploading = true
            this.file = this.$refs.file.files[0]
            let formData = new FormData()
            formData.append('image', this.file)

            const {data} = await axios.post('/imgUpload', formData, {
               headers: {
                  'content-type': 'multipart/form-data'
               }
            })

            this.image = data.image
            this.isUploading = false
         }
         catch (error) {
            Swal.fire({
               position: 'center',
               icon: 'error',
               title: 'Upload image has failed',
               text: error.response.data.message,
               showConfirmButton: true,
               timer: 2300
            })
         }
      }
   }
}
</script>

<style scoped>
   .tag-input {
      width: 80% !important;
      
   }
</style>