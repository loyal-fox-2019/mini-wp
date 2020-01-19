<template lang="html">
    <sui-modal v-model="open">
        <sui-modal-actions>
            <i :class="editIcon" @click="setEditVisibility"></i>
            <i class="remove icon" id="remove" @click="dismissContent"></i>
        </sui-modal-actions>
        <sui-modal-content scrolling id="modal">
            <edit-article-component :data="data"
                                    @cancelEdit="setEditVisibility"
                                    @updateData="updateData"
                                    @dismiss="dismissContent"
                                    v-if="editVisibility"/>
            <sui-modal-description v-if="!editVisibility">
                <div id="sui-image-container">
                    <sui-image :src="data.featured_image" id="sui-image"/>
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
    import editArticleComponent from "./editArticleComponent";

    export default {
        name: "contentComponent",
        data() {
            return {
                open: true,
                title: null,
                tags: null,
                content: null,
                editVisibility: false,
                editorOption: {
                    theme: 'snow'
                },
            };
        },
        props: {
            data: Object,
            editVisibility: Boolean
        },
        methods: {
            dismissContent: function () {
                this.$emit("dismiss");
            },
            setEditVisibility: function () {
                if (this.editVisibility) {
                    this.editVisibility = false
                } else {
                    this.editVisibility = true
                }
            },
            updateData: function () {
                this.$emit('updateData')
            }
        },
        mounted() {
            this.title = this.data.title;
            this.tags = this.data.tags;
            this.content = this.data.content
        },
        computed: {
            editIcon: function () {
                if (this.editVisibility) {
                    this.$toast.info({
                        title: 'Edit Mode',
                        message: 'This is article edit mode'
                    });
                    return "check icon";
                }
                this.$toast.info({
                    title: 'View Mode',
                    message: 'This is article view mode'
                });
                return "pencil icon";
            }
        },
        components: {
            LocalQuillEditor: VueQuillEditor.quillEditor,
            editArticleComponent
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

    .icon {
        padding: 20px;
        color: #3299a8;
        cursor: pointer;
    }

    .field {
        margin-top: 10px;
    }
</style>