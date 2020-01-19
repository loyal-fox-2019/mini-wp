<template>
    <div>
        <form>
            <div class="form-group">
                <div v-if="pictureTempUrl" style="text-align:center">
                    <img :src="pictureTempUrl" class="userProfilePicture" style="height:300px; width:auto; ">
                    <button type="button" class="btn btn-outline-secondary" @click="cancelPicture" style="border:dashed 1px; vertical-align: top; border-radius:10px">
                        <small>cancel</small>
                    </button>
                </div>

                <div class="form-row">
                    <label for="inputAddress2">Give your article an image</label>

                    <div class="custom-file">
                    <b-form-file
                        v-model="featuredImage"
                        @change="setPictureTempUrl"
                        :state="Boolean(file)"
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
                <input type="text" class="form-control" id="Title" required>
            </div>
            
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Your Story</label>
                <wysiwyg v-model="content" required></wysiwyg>
            </div>

            <div class="form-group" data-toggle="tooltip" data-placement="top" title="click tag to delete">
                <label for="Title">Tags</label>
            </div>
            <div  class="form-group" data-toggle="tooltip" data-placement="top" title="click tag to delete">
                <button  
                    v-for="x in 30" :key="x" 
                    type="button" 
                    class="btn btn-outline-info tagButton">Info | x
                </button>
            </div>

            <div class="form-group " data-toggle="tooltip" data-placement="top" title="add multiple tags separated with comma">
                <label for="Title">add tags</label>
                <input type="text" class="form-control" id="Title" placeholder="add multiple tags separated with comma" required>
            </div>

            <div class="form-group" style="margin-top:1%">
                <button type="submit" class="btn btn-primary">Save</button>
            </div>
        </form>
    </div>
</template>




<script>
export default {
    data(){
        return{
            content:''
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
</style>