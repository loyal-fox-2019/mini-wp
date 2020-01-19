<template>
    <div>
        <navbar @signOut="logout"></navbar>
        <sidebar></sidebar>
    </div>
</template>

<script>
import navbar from './navbar'
import sidebar from './sidebar'
export default {
    name: 'homePage',
    components: {
        navbar,
        sidebar
    },
    methods: {
        logout: function(){
            this.$emit('logout')
        }
    }
}
</script>

<style scoped>

</style>