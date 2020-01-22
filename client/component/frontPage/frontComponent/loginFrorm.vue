<template>
   <div>
        <form>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" v-model="email" class="form-control">
            </div>
            <div class="form-group">
                <label for="password">password</label>
                <input type="password" v-model="password" class="form-control">
            </div>
            <!-- <button class="btn btn-primary" v-on:click="checkLogin">Login</button> -->
            <a class="btn btn-primary" href="#" v-on:click="checkLogin">login</a>
        </form>
   </div>
</template>

<script>
export default {

}
</script>

<style>

</style>