<template>
    <div>
        <h1>all the articles</h1>

      <goBackButton
        @goBack="$emit('goBack', 'contentPage')">
      </goBackButton>


    </div>
</template>

<script>
import goBackButton from '../components/goBackButton'

export default {
    name: 'userContentPage',
    components:{
        goBackButton
    }



}
</script>




<style>




</style>