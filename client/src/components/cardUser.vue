<template>
    <div class="divIdentifier" style="width:fit-content">
        <h3 class="elementIdentifier">component cardUSer</h3>
        <div class="card mb-3" style="max-width: 540px; border:none">
            <div class="row no-gutters">
                <div class="col-md-4 image-cropper">
                <!-- <div class="col-md-4"> -->
                    <img 
                        class="card-img" alt="..." 
                        v-if="loggedInUserDetail.profilePicture"
                        :src="loggedInUserDetail.profilePicture" >

                    <img 
                        class="card-img" alt="..." 
                        v-else :src="blankProfilePicture">
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">{{ loggedInUserDetail.fullName }}</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
export default {
    props:[
        'loggedInUserDetail'
    ],
    data(){
        return{
            blankProfilePicture: require('../assets/images/persons/blankProfilePicture.webp')
        }
    }



}
</script>



<style scoped>
.image-cropper {
    /* border: solid 2px red; */
    border: dotted 1px #e8e7e6;
    width: auto;
    height: 11rem;
    position: relative;
    overflow: hidden;
    border-radius: 60%;
    
}

.card-img{
    /* border:solid 2px red; */
    /* width: auto; */
    /* height: 100% */

    /* margin-top: 20% */
    
    
}


</style>