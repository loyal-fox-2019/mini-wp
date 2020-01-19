<template>
  <div>
      <div class="h-auto w-full bg-cover bg-center" :style="'background-image: url('+articleDetail.image+');height:70vh'"></div>
      <div class="w-10/12 mx-auto py-5">
        <h1 class=" text-3xl font-bold text-center">{{articleDetail.title}}</h1>
        <p v-html="articleDetail.content" style="text-align: justify;line-height: 2.0" class="mt-5"></p>
      </div>
  <div>
</template>

<script>
export default {
    props: ['articleDetail']
}
</script>

<style>

</style>