<template>
    <div class="p-3">
        <h1>Search Result</h1>
        <goBackButton
            @goBack="$emit('goBack', 'contentPage')">
        </goBackButton>
        
        <div class="alert alert-danger mx-4 my-2" role="alert" v-if="filterResult.length === 0">
           no result
         </div>

        <!-- start of div content small card -->
            <div class="divContentSmallCard">
                <div class="row row-cols-1 row-cols-md-4" >
                <!-- {{ allArticlesArray }} -->
                <div v-for="article in filterResult" :key="article._id">
                    <!-- <h5>{{article}}</h5> -->
                    <cardSmall 
                        :articleDetail="article" 
                        :author="loggedInUserDetail._id"
                        @switchToArticleReader="$emit('switchToArticleReader', $event)"
                        @switchToArticleEditPage="$emit('switchToArticleEditPage', $event)"
                        @switchToUserContentPage="$emit('switchToUserContentPage', $event)"
                        @switchToFilterResultPage="$emit('switchToFilterResultPage', $event)">
                    </cardSmall>
                </div>
                


                </div>
            </div>
        <!-- end of div content small card -->


    </div>
</template>




<script>
import swal from 'sweetalert2'
import axios from '../../config/axios'

import goBackButton from '../components/goBackButton'
import cardSmall from '../components/cardSmall'

export default {
    name:'filterResultPage',
    props:[
        'searchPayload',
        'loggedInUserDetail'
    ],
    components:{
        goBackButton,
        cardSmall
    },
    data(){
        return{
            filterResult:{}
        }
    },
    methods:{
        setFilterResult(data){
            this.filterResult = data
        },
        findFilteredResult(){
            axios({
                method: 'post',
                url: '/articles/filter',
                headers:{
                    token: localStorage.getItem('token')
                },
                data: this.searchPayload
            })
            .then( ({data})=>{
                // console.log(' \n======================\n DATA at fileter', data)
                this.setFilterResult(data)
            })
            .catch( ({response})=>{
                console.log(`error @findFilteredResult - findResultPage.vue \n=========================================\n`, response.data.message)
                swal.fire(
                    "Error",
                    response.data.message,
                    'error'
                )
            })
        }
    },
    created(){
        this.findFilteredResult()
    }

}
</script>




<style>


</style>