<template lang="html">
    <sui-modal v-model="open">
        <sui-modal-actions>
            <i class="remove icon" id="remove" @click="dismissContent"></i>
        </sui-modal-actions>
        <sui-modal-content scrolling>
            <sui-modal-description>
                <div id="sui-image-container">
                    <sui-image :src="data.featured_image" id="sui-image"></sui-image>
                </div>
                <div id="content">
                    <h1>{{ data.title }}</h1>
                    <p>
                        <i class="user icon"></i>{{ data.author.name }}
                        <i class="calendar icon"></i>
                        {{ data.created_at.split("T")[0]}}
                        <i class="clock icon"></i>
                        {{ data.created_at.split("T")[1].split(".")[0]}}
                    </p>
                    <hr>
                    <p v-html="data.content">
                        {{ data.content }}
                    </p>
                </div>
            </sui-modal-description>
        </sui-modal-content>
    </sui-modal>
</template>

<script>
    export default {
        name: "contentComponent",
        data() {
            return {
                open: true
            };
        },
        props: {
            data: Object
        },
        methods: {
            dismissContent: function () {
                this.$emit("dismiss");
            }
        }
    }
</script>

<style scoped>
    #sui-image-container {
        width: 100%;
        max-height: 350px;
        overflow: hidden;
    }

    #sui-image {
        display: block;
        margin-left: auto;
        margin-right: auto;
    }

    #remove {
        color: gray;
        cursor: pointer;
        font-size: 15px;
    }

    #content {
        padding: 20px;
        font-size: 13px;
    }

    .icon{
        padding: 20px;
        color: #3299a8;
    }
</style>