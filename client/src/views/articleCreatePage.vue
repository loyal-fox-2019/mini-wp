<template>
    <div style="padding:1%">
        <div style="text-align:center">
                <h1>Your New Article</h1>
        </div>
        
        <goBackButton 
            @goBack="$emit('goBack', 'contentPage')">
        </goBackButton>

        <div id="divArticleFormContainer">
            <createEditArticle 
                :articlePageMode="articlePageMode"
                @createArticle="createArticle">
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
        'articlePageMode'
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
        createArticle(fd){
            axios({
                method: 'post',
                url: '/articles',
                headers:{
                    token: localStorage.getItem('token')
                },
                data: fd
            })
            .then( ({data})=>{
                // this.setAllVariableToDefault()
                swal.fire({
                    title: "Your Article has been saved",
                    icon: "success",
                    confirmButtonText: 'Back to Home'
                })
                .then( ({value})=>{
                    if(value)
                        this.$emit('goBack', 'contentPage')
                })
            })
            .catch( ({ response })=>{
                console.log(`error @createArticle - articleCreatePage.vue \n=========================================\n`, response.data.message)
                swal.fire(
                    "Error",
                    response.data.message[0],
                    'error'
                )
            })
        },
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