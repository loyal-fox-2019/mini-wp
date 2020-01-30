<template>
<!-- Modal -->
<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">confirmation:</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        are you sure want delete this item ?
        {{articleTitle}}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" v-on:click="deleteConfirm(idArticle)">Save changes</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
    props: {
        idArticle:{
            type: String
        },
        articleTitle:{
            type: String
        }
    },
    methods: {
        deleteConfirm(id){
            console.log(id)
        //     axios.delete(`http://localhost:3000/miniwp/article/${id}`,{
        //        headers: {
        //            Authorization: localStorage.getItem('token')
        //         }
        //    })
        //    .then(response => {
        //        console.log(response)
        //        this.$emit('backHome', 'listArticle')
        //    })
        }
    }
}
</script>

<style>

</style>