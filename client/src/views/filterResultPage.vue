<template>
    <div>
        <h1>Search Result</h1>
        <goBackButton
            @goBack="$emit('goBack', 'contentPage')">
        </goBackButton>

        {{searchPayload}}


    </div>
</template>




<script>
import goBackButton from "../components/goBackButton"

export default {
    name:'filterResultPage',
    props:[
        'searchPayload'
    ],
    components:{
        goBackButton
    },
    


}
</script>




<style>


</style>