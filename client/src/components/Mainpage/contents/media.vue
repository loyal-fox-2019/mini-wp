<template>
    <div>
        <h1>Media</h1>
        <h2>Upload image</h2>
        <form enctype="multipart/form-data" @submit.prevent="upload">
            <input type="file" name="file" />
        </form>
    </div>
</template>

<script>
    import axiosReq from "../../../config/axiosReq";
    export default {
        name: "Media",
        method: {
            upload() {
                axiosReq({
                    method: "POST",
                    url: "/api/images"
                })
            }
        }
    }
</script>

<style scoped>

</style>