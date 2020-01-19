<template>
  <div class="p-3 h-64 mt-5 bg bg-gray-100 rounded-lg border border-gray-400 text-blue-900">
    <h1 class="ml-3 font-bold text-gray-900 underline">MOST FAVORITES</h1>
    <div class="overflow-y-scroll overflow-y-hidden h-48 mt-3">
        <div v-for="i in 10" :key="i">
            <smallCard></smallCard>
        </div>
    </div>
  </div>
</template>

<script>
import smallCard from '../components/smallCard'
export default {
    components: {
        smallCard
    }
}
</script>

<style>

</style>