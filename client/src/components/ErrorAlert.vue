<template>
    <div>
        <div class="alert alert-danger" role="alert">
            {{errStatus[0]}} | {{errStatus[1]}}
        </div>
    </div>
</template>

<script>
export default {
    name: 'ErrorAlert',
    data() {
        return {
            msg: ''
        }
    },
    props: ['errStatus']
}
</script>

<style lang="css" scoped>
    
</style>