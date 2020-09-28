<template lang="html">
    <form class="ui" @submit.prevent="search(searchValue)">
        <sui-input
                placeholder="Search and press enter..."
                icon="search" size="50"
                v-model="searchValue">
        </sui-input>
    </form>
</template>

<script>
    export default {
        name: "searchComponent",
        data() {
            return {
                searchValue: null
            }
        },
        methods: {
            search: function (data) {
                this.$emit('search', data);
            }
        }
    }
</script>

<style scoped>
    .ui {
        margin: 0 10px 5px 0;
    }
</style>