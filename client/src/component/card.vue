<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="card">
                    <div class="card-body">
                        <a v-on:click="viewArticle(data._id)" href="#"><h5 class="card-title">{{ data.title }}</h5></a>
                        <a href="#" class="btn btn-primary" v-on:click='editdata(data._id)'>edit</a>
                        <a href="#" class="btn btn-danger" v-on:click='deletedata(data._id)'>delete</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
   props:{
       data:{
           type: Object
       }
   },
   methods: {

   }
}
</script>

<style scoped>

</style>