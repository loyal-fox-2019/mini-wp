<template>
    <div>
        <Navbar :isLogin="isLogin"></Navbar>
    </div>
</template>

<script>
import Navbar from '../../components/Navbar.vue';

export default {
    name: "Header",
    components: {
        Navbar
    },
    props: ["isLogin"]
}
</script>

<style scoped>

</style>