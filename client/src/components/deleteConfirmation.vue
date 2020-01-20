<template>
    <transition name="modal">
    <div class="modal-mask">
        <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Delete this article?</h5>
                <button @click="gajadiDelete" type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" @click="showModal = false">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p><strong>{{content.title}}</strong></p>
            </div>
            <div class="modal-footer">
                <button @click="gajadiDelete" type="button" class="btn btn-secondary" @click="showModal = false">Close</button>
                <button @click="deleteArticle" type="button" class="btn btn-primary">Yes</button>
            </div>
            </div>
        </div>
        </div>
    </div>
    </transition>
</template>

<script>
import Axios from 'axios'

export default {
    data(){
        return{
            content : {},
            jadiDelete : 'yes'
        }
    },
     props : {
        id : String,
    },
    methods : {
        deleteArticle(){
            Axios({
                url : `http://localhost:3000/article/${this.$props.id}`,
                headers : {
                    token : localStorage.token
                },
                method : 'delete',
            })
            .then(response => {
                console.log("berhasil delete")
                console.log(response)
                this.jadiDelete = "yes"
                this.closeDelete()
            })
            .catch(err=>{
                console.log("gagal delete")
                console.log(err)
            })
        },
        gajadiDelete(){
            this.jadiDelete = "no"
            this.closeDelete()
        },
        closeDelete(){
            this.$emit('done', this.jadiDelete)
        }
    },
    created(){
        Axios.get(`http://localhost:3000/article/${this.$props.id}`)
        .then(({data}) => {
            this.content = data
        })
    }
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>