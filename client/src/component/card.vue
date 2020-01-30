<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="card">
                    <div class="card-body">
                        <a v-on:click="viewArticle(article._id)" href="#"><h5 class="card-title">{{ article.title }}</h5></a>
                        <a href="#" class="btn btn-primary" v-if="idUser === article.userId" v-on:click='showEdit(article._id)'>edit</a>
                        <!-- <button type="button" v-if="idUser === article.userId" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                            Launch demo modal
                        </button>
                        <ModalDelete :idArticle="article._id" :articleTitle="article.title" ></ModalDelete> -->
                        <button type="button" v-if="idUser === article.userId" class="btn btn-primary" v-on:click="deleteConfirm(article._id)">delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ModalDelete from './ModalDelete'
export default {
    data(){
        return{
            idUser: localStorage.getItem('id')
        }
    },
    components: {
        ModalDelete
    },
    props:{
       article:{
           type: Object,
       }
   },
   methods: {
       showEdit(id){
           const dataEdit = {
               article: this.article,
               command: 'editArticle'
           }
           this.$emit('showEdit', dataEdit)
       },
       deleteConfirm(id){
            console.log(id)
            axios.delete(`http://localhost:3000/miniwp/article/${id}`,{
               headers: {
                   Authorization: localStorage.getItem('token')
                }
           })
           .then(response => {
               console.log(response)
               this.$emit('backHome', 'listArticle')
           })
        }
   }
}
</script>

<style scoped>

</style>