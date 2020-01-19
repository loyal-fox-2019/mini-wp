<template>
<div id="acc">
  <h2>Profile</h2>
  <hr class="pp">
    <p>Name: {{name}}</p>
    <p>status: online </p>
  <hr class="pp">
    <b-form-input size="sm" class="mr-sm-2" placeholder="Search with tag" v-model="word" @keyup.enter="searchTag"></b-form-input>

</div>
</template>

<script>
export default {
    data(){
        return {
            word: ''
        }
    },
    methods:{
        searchTag: function(){
            this.$emit('srcTag', this.word)
        }
    },
    props: ['name']

}
</script>

<style>

#acc{
    color: white;
    text-align: center
}

.pp{
    border: 1px solid white
}

</style>