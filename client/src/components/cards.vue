<template>
  <div class="mt-4">
      <div :class="classDiv">
        <div :class="classImg" :style="'background-image: url('+articleData.featured_image+')'">
        </div>
        <div class="border-r border-b border-l border-gray-400 md:w-full md:border-l-0 md:border-t md:border-gray-400 bg-white rounded-b md:rounded-b-none md:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div class="mb-8">
              <div class="text-gray-900 font-bold text-xl mb-2 hover:text-gray-700 cursor-pointer" @click="emitDetail()">{{articleData.title}}</div>
              <p v-if="articleData.content.length > 400 && !readMoreActivated" class="text-gray-700 text-base" v-html="articleData.content.slice(0,300)">...</p>
              <p v-else v-html="articleData.content"></p>
              <a v-if="articleData.content.length > 400 && !readMoreActivated" @click="changeActivated" class="no-underline text-gray-700 hover:text-black cursor-pointer">Read more</a>
              <p v-if="readMoreActivated" v-html="articleData.content"></p>
              <a v-if="readMoreActivated" @click="showLess" class="no-underline text-gray-700 hover:text-black cursor-pointer">Hide</a>
            </div>
            <div class="flex items-center">
            <img class="w-10 h-10 rounded-full mr-4" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxnNKF87MRgQrwi9X6M10V7lraBWBmBDKYVFHMYmUJQuGLn9vbBw&s" alt="Avatar of Jonathan Reinink">
            <div class="text-md">
                <p class="text-gray-900 leading-none">{{articleData.author.name}}</p>
                <p class="text-gray-600">{{articleData.created_at.slice(0,10)}}</p>
            </div>
            </div>
            <div>Tags</div>
            <div class="flex">
              <div v-for="tag in articleData.tags" :key="tag">
                <div class="mx-1 p-1 bg-black text-white hover:border border-white cursor-pointer" @click.prevent="addTag(tag)">{{tag}}</div>
              </div>
            </div>
            <div class="flex mt-3 justify-center">
              <button class="right-0 mr-1 border-2 border-black p-2 bg bg-white rounded-lg hover:bg-blue-700 hover:text-white hover:border-blue-400" v-if="profile" @click.prevent="update">Update</button>
              <button class="right-0 ml-1 border-2 border-black p-2 bg bg-white rounded-lg hover:bg-red-700 hover:text-white hover:border-red-400" v-if="profile" @click.prevent="deleteArticle">Delete</button>
            </div>
        </div>
        </div>
  </div>
</template>

<script>
let baseUrl = 'http://localhost:3000'

export default {
  props:['articleData','profile'],
  data(){
    return {
      readMoreActivated: false,
      classDiv:'w-12/12 md:w-12/12 md:flex',
      classImg:'h-48 md:h-auto md:w-48 flex-none bg-cover rounded-t md:rounded-t-none md:rounded-l text-center overflow-hidden',
    }
  },
  methods: {
    addTag(tag) {
      axios({
        method: 'put',
        url: 'http://localhost:3000/user',
        data: {
          tag
        },
        headers: { token : localStorage.getItem('access_token')}
      })
        .then( ({data}) => {
          this.$emit('addTag',tag)
          Swal.fire({
            icon:'success',
            title:'add tag success',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch( err => {
          Swal.fire({
            icon:'error',
            title:'add tag failed',
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    changeActivated(){
      this.readMoreActivated= true
      this.classDiv = 'w-12/12 md:w-12/12 md:flex flex-col'
      this.classImg = 'h-auto md:h-auto md:w-auto flex-none bg-cover rounded-t md:rounded-t-none md:rounded-l text-center'
    },
    showLess() {
      this.readMoreActivated= false
      this.classDiv= 'w-12/12 md:w-12/12 md:flex'
      this.classImg= 'h-48 md:h-auto md:w-48 flex-none bg-cover rounded-t md:rounded-t-none md:rounded-l text-center overflow-hidden'
    },
    emitDetail() {
      this.$emit('emitDetail',{
        page: 'detail',
        title: this.articleData.title,
        content: this.articleData.content,
        image: this.articleData.featured_image
      })
    },
    update() {
      this.$emit('updateArticle',{data:this.articleData})
    },
    deleteArticle() {
        Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          axios({
            method: 'delete',
            url: `${baseUrl}/article/${this.articleData._id}`,
            headers: { token: localStorage.getItem('access_token')}
          })
            .then( ({data}) => {
              Swal.fire({
                icon: 'success',
                title: 'delete success.',
                showConfirmButton: false,
                timer: 1500
              })
              this.$emit('deleteArticle',this.articleData._id)
            })
            .catch( err => {
              Swal.fire({
                icon: 'error',
                title: 'delete failed.',
                showConfirmButton: false,
                timer: 1500
              })
            })
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    }
  }
}
</script>

<style>

</style>