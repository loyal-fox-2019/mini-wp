<template>
    <div style="margin-left:1%">
        <button 
            id="goBackButton" 
            type="button" 
            class="btn btn-primary" 
            style="border:none; background-color: unset;" 
            @click.prevent="$emit('goBack')">
            <img src="../assets/images/icons/goback (1).webp" alt="go back" class="iconButton">
        </button>
    </div>
</template>



<script>
export default {


}
</script>


<style>

</style>