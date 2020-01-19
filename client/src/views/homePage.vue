<template>
    <div id="homePage"  class="divIdentifier">
        <!-- <h1 style='color:white'>MINI WordPress</h1> -->

        <div id="containerUserFormDiv" class="divIdentifier">
            <div id="userFormDiv">
                <userForm @login="$emit('login', $event)"></userForm>
            </div>
        </div>
        
        
    </div>
</template>






<script>
import userForm from '../components/userForm'

export default {
    name: 'homePage',
    components:{
        userForm
    }
}

</script>




<style scoped>
#homePage
{
    background-image: url('../assets/images/6905094-girl-brunette-sitting-cat-mood.jpg');
    background-attachment: fixed;
    /* background-repeat: no-repeat; */
    background-size: cover;
    width: 100vw;
    height: 100vh
}

#containerUserFormDiv
{
    width: 50%; 
    height: 100vh;
    overflow: hidden;
}

#userFormDiv
{   
    margin:auto;
    margin-top: 20%;
    width: 20vw
}




</style>