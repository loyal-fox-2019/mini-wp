<template>
    <div style="padding:1%">
        <div style="text-align:center">
                <h1>Your New Article</h1>
        </div>
        
        <goBackButton 
            @goBack="$emit('goBack', 'contentPage')">
        </goBackButton>

        <div id="divArticleFormContainer">
            <createEditArticle></createEditArticle>
        </div>


  </div>
</template>



<script>
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
            featuredImage:'',
            setPictureTempUrl:''
        }
    },
    methods:{

    }


}
</script>



<style scoped>
#divArticleFormContainer{
    /* border: solid red 2px; */

    padding: 1%;
    margin:auto;
    height: fit-content;
    width: 80%

}


</style>