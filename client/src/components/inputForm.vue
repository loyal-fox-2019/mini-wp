<template>
    <div class="mt-3 md:w-8/12">
        <form>
            <div class="px-3">
                <label class="ml-3 block uppercase tracking-wide text-gray-700 text-md font-bold mb-2" for="grid-title">
                    title
                </label>
                <input v-model="title" class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-title" type="text" placeholder="Input title">
            </div>
            <div class="px-3">
                <label class="ml-3 block uppercase tracking-wide text-gray-700 text-md font-bold mb-2 sm:w-8/12 " for="grid-title">
                    description
                </label>
                <wysiwyg v-model="content" class="bg bg-gray-100 focus:bg-white focus:border-gray-500"></wysiwyg>
            </div>
            <div class="px-3">
                <label class="ml-3 block uppercase tracking-wide text-gray-700 text-md font-bold mb-2 sm:w-8/12 " for="grid-title">
                    tags
                </label>
                <input v-model="tags" class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-title" type="text" placeholder="Input title">
            </div>
            <div class="px-3">
                <label class="ml-3 block uppercase tracking-wide text-gray-700 text-md font-bold mb-2 sm:w-8/12 " for="grid-title">
                    upload image
                </label>
                <input @change="image" class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="file" name="file">
            </div>
            <div class="flex justify-center">
                <button v-if="update" class="bg bg-gray-900 text-white px-3 rounded-lg py-2 uppercase mt-2 border-2 hover:border-gray-700" @click.prevent="updateArticle">update</button>
                <button v-else class="bg bg-gray-900 text-white px-3 rounded-lg py-2 uppercase mt-2 border-2 hover:border-gray-700" @click.prevent="addArticle">submit</button>
            </div>
        </form>
    </div>
</template>

<script>
let baseUrl = 'http://localhost:3000'

export default {
    props:['updateData','toAdd'],
    data() {
        return {
            title: '',
            content: '',
            tags: '',
            featured_image: [],
            update: false
        }
    },
    watch: {
        updateData: {
            immediate: true,
            deep: true,
            handler: function (n,o) {
                this.title = n.title
                this.content = n.content,
                this.tags = n.tags.join(' '),
                // this.featured_image = n.featured_image
                this.update = n.update
            }
        },
    },
    methods: {

        image(event) {
            console.log(event.target.files[0])
            this.featured_image = event.target.files
        },
        addArticle() {
            let fd = new FormData()
            fd.append('title',this.title)
            fd.append('content',this.content)
            fd.append('featured_image',this.featured_image),
            fd.append('tags',this.tags)
            axios({
                method: 'post',
                url: `${baseUrl}/article`,
                data: fd,
                headers: { token: localStorage.getItem('access_token') }
            })
                .then( ({data}) => {
                    Swal.fire({
                        icon:'success',
                        title:'Article added.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.$emit('addArticle',{
                        data
                    })
                    this.title = '',
                    this.content = '',
                    this.featured_image = '',
                    this.tags = ''
                })
                .catch( err => {
                    Swal.fire({
                        icon:'error',
                        title: err.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
        },
        updateArticle() {
            axios({
                method: 'put',
                url: `${baseUrl}/article/${this.updateData._id}`,
                data: {
                    title: this.title,
                    content: this.content,
                    tags: this.tags,
                    featured_image: this.featured_image
                },
                headers: { token: localStorage.getItem('access_token') }
            })
                .then( ({data}) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Update success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.$emit('editArticle',{
                        title:this.title,
                        content:this.content,
                        featured_image:this.featured_image,
                        tags:this.tags,
                        _id:this.updateData._id,
                        author:this.updateData.author,
                        created_at:this.updateData.created_at
                    })
                    this.title = '',
                    this.content = '',
                    this.featured_image = '',
                    this.tags = ''
                    this.update = false
                })
                .catch( err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Update failed',
                        text:err.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
        }

    }
}
</script>

<style>

</style>