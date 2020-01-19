<template>
    <div>
        <h1>article reader</h1>

        <goBackButton 
            @goBack="$emit('goBack', 'contentPage')">
        </goBackButton>


        <div id="articleReaderDiv">
            <div >
                <img :src="articleDetail.featuredImage" alt="" id="featuredImage">
            </div>
            <div>
                <h1>{{articleDetail.title}}</h1>
            </div>
            <div v-html="articleDetail.content">
            </div>

            <div  class="form-group" data-toggle="tooltip" data-placement="top" title="click tag to delete" v-if="tagListArray.length > 0">
                <!-- {{ tagListDisplay }} -->
                <button  
                    v-for="tag in tagListArray" :key="tag" 
                    type="button" 
                    class="btn btn-outline-info tagButton"
                    @click.prevent="$emit('switchToFilterResultPage', { tagList: tag })">{{tag}}
                </button>
            </div>

<!-- {{tagListArray}} -->

        </div>
    </div>
</template>



<script>
import swal from 'sweetalert2'
import axios from '../../config/axios'

import goBackButton from '../components/goBackButton'
export default {
    name: 'articleReaderPage',
    props:[
        'articleReaderId'
    ],
    components:{
        goBackButton
    },
    data(){
        return{
            articleDetail: {},
            tagListArray: []
        }
    },
    methods:{
        setArticleDetail(data){
            this.articleDetail = data
        },
        setTagListArray(data){
            this.tagListArray = data
        },
        fetchArticleDetail(){
            axios({
                method: 'get',
                url: `/articles/one/${this.articleReaderId}`,
                headers:{
                    token : localStorage.getItem('token')
                }
            })
            .then( ({data})=>{
                console.log(`TCL: fetchArticleDetail -> data`, data)
                this.setArticleDetail(data)
                this.setTagListArray( data.tagList.slice(',') )
            })
            .catch( ({response})=>{
                console.log(`error @fetchArticleDetail - articleReaderPage.vue \n=========================================\n`, response.data.message)
                swal.fire(
                    "Error",
                    response.data.message,
                    'error'
                )
            })
        }
    },
    created(){
        this.fetchArticleDetail()
    }




}
</script>



<style scoped>
#articleReaderDiv{
    /* border: solid 2px red; */
    margin:auto;
    margin-bottom:3%;
    width: 70%
}

#featuredImage{
    width:100%;
    height: auto
}

.tagButton{
    border: dashed 1px grey;
    border-radius: 20px
}

</style>