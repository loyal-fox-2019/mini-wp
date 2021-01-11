<template>
    <div style="padding:1%">
        <div style="text-align:center">
                <h1>Edit Your Article</h1>
        </div>
        <!-- {{articleEditPayload.articleDetail._id}} -->
        <goBackButton 
            @goBack="$emit('goBack', 'contentPage')">
        </goBackButton>

        <div id="divArticleFormContainer">
            <createEditArticle 
                :articlePageMode="articleEditPayload.mode"
                :articleDetail="articleEditPayload.articleDetail"
                @editArticle="editArticle"
                @deleteArticle="deleteArticle">
            </createEditArticle>
        </div>


  </div>
</template>



<script>
import swal from 'sweetalert2'
import axios from '../../config/axios'

import goBackButton from '../components/goBackButton'
import createEditArticle from '../components/createEditArticle'

export default {
    name: 'articlePage',
    props:[
        'articleEditPayload'
    ],
    components:{
        goBackButton,
        createEditArticle
    },
    data(){
        return{
            
        }
    },
    methods:{
        editArticle(fd){
            for (var pair of fd.entries()) {
                console.log(pair[0]+ ', ' + pair[1]); 
            }
            console.log(' \n======================\n UDAH TEMBUS SINI di page siap axios')
            axios({
                method: 'patch',
                url: `/articles/${this.articleEditPayload.articleDetail._id}`,
                headers:{
                    token: localStorage.getItem('token')
                },
                data:fd
            })  
            .then( ({data})=>{
                console.log(`TCL: editArticle -> data`, data)
                swal.fire({
                    title: "Your Article has been updated",
                    icon: "success",
                    confirmButtonText: 'Back to Home'
                })
                .then( ({value})=>{
                    if(value)
                        this.$emit('goBack', 'contentPage')
                })
            })
            .catch( ({ response })=>{
                console.log(`error @editArticle - articleEditPage.vue \n=========================================\n`, response.data.message)
                swal.fire(
                    "Error",
                    response.data.message,
                    'error'
                )
            })
        },
        deleteArticle(articleId){
            axios({
                method: 'delete',
                url: `/articles/${articleId}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then( ({data})=>{
                swal.fire({
                    title: "Your Article has been deleted",
                    confirmButtonText: 'Back to Home'
                })
                .then( ({value})=>{
                    if(value)
                        this.$emit('goBack', 'contentPage')
                })
            })
            .catch( ({ response })=>{
                console.log(`error @deleteArticle - articleEditPage.vue \n=========================================\n`, response.data.message)
                swal.fire(
                    "Error",
                    response.data.message,
                    'error'
                )
            })
        }
    },
    mounted: function(){
       
    }


}
</script>



<style scoped>
#divArticleFormContainer{
    /* border: solid red 2px; */

    /* padding: 1%; */
    padding-left : 1%;
    padding-right: 1%;
    margin: auto;
    height: fit-content;
    width: 80%

}


</style>