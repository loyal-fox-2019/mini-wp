<template>
    <div style="padding:1%">
        <div style="text-align:center">
                <h1>{{ pageTitle }}</h1>
        </div>
        
        <goBackButton 
            @goBack="$emit('goBack', 'contentPage')">
        </goBackButton>

        <div id="divArticleFormContainer">
            <createEditArticle 
                :articlePageMode="articlePageMode"
                @goBack="$emit('goBack', 'contentPage')">
                </createEditArticle>
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
            pageTitle:''
        }
    },
    methods:{

    },
    mounted: function(){
        if(this.articlePageMode === 'createMode')
            this.pageTitle = 'Your New Article'
        else if(this.articlePageMode === 'editMode')
            this.pageTitle = 'Edit Article'
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