<template>
    <div style="top:0">
        
        <form @submit.prevent="submitForm">
            <div class="form-group" style="margin-top:1%">
                <button type="submit" class="btn btn-primary">Save</button>
                <button v-if="articlePageMode==='editMode'" type="submit" class="btn btn-danger" @click.prevent="deleteArticle">Delete Article</button>
            </div>

            <div class="form-group">
                <div v-if="pictureTempUrl" id="divPictureDisplay" >
                    <img :src="pictureTempUrl" class="userProfilePicture" style=" width:100%; height:auto;  ">
                <!-- <div id="divPictureDisplay" > -->
                    <!-- <img src="../assets/images/landscapes/6794583-free-taiwan-wallpaper.jpg" id="userProfilePicture"> -->
                    <button type="button" class="btn btn-outline-secondary" @click="cancelPicture" style="border:dashed 1px; vertical-align: top; border-radius:10px">
                        <small>cancel</small>
                    </button>
                </div>

                <div class="form-row">
                    <label for="inputAddress2">Cover your article with beautiful image</label>

                    <div class="custom-file">
                    <b-form-file
                        v-model="featuredImage"
                        @change="setPictureTempUrl"
                        :state="Boolean(featuredImage)"
                        action="/upload-single"
                        method="post"
                        enctype="multipart/form-data">
                    </b-form-file>
                    <label class="custom-file-label" for="customFile">Choose file</label>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label for="Title">Title</label>
                <input type="text" class="form-control" id="Title" style="font-weight:bold" required v-model="title">
            </div>
            
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Your Story</label>
                <wysiwyg v-model="content" required></wysiwyg>
            </div>

            <div class="form-group" data-toggle="tooltip" data-placement="top" title="click tag to delete">
                <label for="Title">Tags</label>
            </div>
            <div  class="form-group" data-toggle="tooltip" data-placement="top" title="click tag to delete" v-if="tagList.length > 0">
                <!-- {{ tagListDisplay }} -->
                <button  
                    v-for="tag in tagListDisplay" :key="tag" 
                    type="button" 
                    class="btn btn-outline-info tagButton"
                    @click.prevent="removeDisplayedTag(tag)">{{tag}} | x
                </button>
            </div>

            <div class="form-group " data-toggle="tooltip" data-placement="top" title="add multiple tags separated with comma, extra space will be ignored">
                <label for="Title">add tags</label>
                <input 
                    type="text" 
                    class="form-control" 
                    id="Title" 
                    placeholder="add multiple tags separated with comma, extra space will be ignored" 
                    v-model="tagList">
            </div>

            <div class="form-group" style="margin-top:1%; float:right">
                <button type="submit" class="btn btn-primary">Save</button>
            </div>

            
        </form>
    </div>
</template>




<script>
import axios from '../../config/axios'
import swal from 'sweetalert2'

export default {
    props:[
        'articlePageMode',
        'articleDetail'
    ],
    data(){
        return{
            title:'',
            content:'',
            featuredImage:'',
            tagList:'',
            tagListArrayForm: [],
            pictureTempUrl:''
        }
    },
    methods:{
        // setters
        setAllVariableToDefault(){
            this.title = ''
            this.content = ''
            this.featuredImage = ''
            this.tagList = ''
        },
        setOnEditMode(){
            this.title = this.articleDetail.title
            this.content = this.articleDetail.content
            this.tagList = this.articleDetail.tagList.join(',')
            this.pictureTempUrl = this.articleDetail.featuredImage
            this.featuredImage = this.articleDetail.featuredImage
        },
        setPictureTempUrl(e){
            const file = e.target.files[0]
            this.pictureTempUrl = URL.createObjectURL(file)
        },
        cancelPicture(){
            this.pictureTempUrl = ''
        },
        // others
        submitForm(){
            if(this.articlePageMode === 'createMode')
                this.createArticle()
            else if(this.articlePageMode === 'editMode')
                this.editArticle()
        },
        createArticle(){
            swal.fire({
                title: "Post Your Article",
                icon: 'info',
                showCancelButton: true,
                confirmButtonText: "Post It",
            })
            .then(result=>{
                if(result.value)
                  {
                    const fd = new FormData()
                    fd.append('title', this.title)
                    fd.append('content', this.content)
                    fd.append('file', this.featuredImage)
                    this.tagListArrayForm.forEach(element => {
                        fd.append('tagList', element)
                    });

                    this.$emit('createArticle', fd)
                  }
            })
        },
        editArticle(){
            let queryKey = []
            const updateKeys = ['title', 'content', 'featuredImage']
            updateKeys.forEach(element => {
                if(this[element] !== this.articleDetail[element])
                    queryKey.push(element)
            });


            let push = []
            this.tagListArrayForm.forEach(element => {
                if(this.articleDetail.tagList.indexOf(element) === -1)
                    push.push(element)
            });
            let pull = []
            this.articleDetail.tagList.forEach(element => {
                if(this.tagListArrayForm.indexOf(element) <= 0)
                    pull.push(element)
            })

            if( queryKey.length>0 || push.length>0 || pull.length>0)
              {
                swal.fire({
                    title: "Save Change to Article",
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonText: "Post It",
                })
                .then(result=>{
                    if(result.value)
                    {
                        let fd = new FormData()
                        queryKey.forEach(element => {
                            fd.append( element, this[element] )
                        });
                        fd.delete('featuredImage')

                        if(this.featuredImage !== this.articleDetail.featuredImage)
                            fd.append('file', this.featuredImage)

                        if(push.length > 0)
                          {
                            console.log(' \n======================\n JALAN PUSH')
                            push.forEach(element => {
                            fd.append('push', element)
                            });
                          }
                        
                        if(pull.length > 0)
                          {
                            console.log(' \n======================\n JALAN PULL')
                            pull.forEach(element => {
                            fd.append('pull', element)
                            });
                          }
                        
                        this.$emit('editArticle', fd)
                    }
                })
              }
        },
        deleteArticle(){
            swal.fire({
                title: 'Delete Article',
                text: 'You can\'t undo this action',
                showCancelButton: true,
                confirmButtonText: 'Confirm'
            })
            .then(result=>{
                if(result.value)
                  {
                      this.$emit('deleteArticle', this.articleDetail._id)
                  }
            })
        },
        removeDisplayedTag(tagRemoved){
            // manual 1 1
            // const tempTagList = this.tagList.split(',').map(e=> e.trim())
            // const newTagList = tempTagList.filter(tag => tag !== tagRemoved)
            // this.tagList = newTagList.join(',')

            // lebih keren
            // this.tagList = this.tagList.split(',').map(e=> e.trim()).filter(tag => tag !== tagRemoved).join(',')
            
            // pake data yang emangnya uda diset sama computed
            this.tagList = this.tagListArrayForm.filter(tag => tag !== tagRemoved).join(',')
        }
    },
    mounted: function(){
        if(this.articlePageMode === 'createMode')
            this.setAllVariableToDefault()
        else if(this.articlePageMode === 'editMode')
            this.setOnEditMode()


    },
    computed:{
        tagListDisplay(){
            // const tagListArray = this.tagList.split(',').map(function(e){return e.trim()}) // longer notation
            // const tagListArray = this.tagList.split(',').map(e=> e.trim()) //shorter notation
            // console.log(' \n======================\n', tagListArray)
            this.tagListArrayForm = this.tagList.split(',').map(e=> e.trim())
            return this.tagListArrayForm
        }
    }



}
</script>



<style scoped>
@import "../../node_modules/vue-wysiwyg/dist/vueWysiwyg.css";

.tagButton{
    border: dashed 1px grey;
    border-radius: 20px
}

#divPictureDisplay{
    /* border: solid 2px red; */
    text-align:center; 
    height: fit-content
}

#userProfilePicture{
    width: 100%;
    height: auto
}
</style>