<template lang="html">
    <sui-modal v-model="open" id="modal">
        <sui-modal-actions>
            <i :class="editIcon" @click="setEditVisibility"></i>
            <i class="remove icon" id="remove" @click="dismissContent"></i>
        </sui-modal-actions>
        <sui-modal-content scrolling>
<!--            <form class="w-100"-->
<!--                  @submit.prevent=""-->
<!--                  enctype="multipart/form-data"-->
<!--                  v-if="editVisibility">-->
<!--                <label for="article-title">Title : </label>-->
<!--                <sui-label color="teal" basic>10 - 100 character</sui-label>-->
<!--                <div class="field">-->
<!--                    <div class="ui input">-->
<!--                        <input type="text"-->
<!--                               id="article-title"-->
<!--                               placeholder="Title"-->
<!--                               v-model="title"-->
<!--                               size="100"-->
<!--                               minlength="10"-->
<!--                               maxlength="100"-->
<!--                               required>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <br>-->
<!--                <label for="article-tags">Tags : </label>-->
<!--                <sui-label color="teal" basic>-->
<!--                    min 1 tag, 3 - 15 character-->
<!--                </sui-label>-->
<!--                <div class="field">-->
<!--                    <div class="ui input">-->
<!--                        <sui-dropdown-->
<!--                                multiple-->
<!--                                id="article-tags"-->
<!--                                :options="tagList"-->
<!--                                v-model="tags"-->
<!--                                placeholder="Tags"-->
<!--                                search-->
<!--                                selection-->
<!--                                allow-additions-->
<!--                                required/>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <br>-->
<!--                <label>Feature Image : </label>-->
<!--                <sui-label color="teal" basic>max size 5 Mb</sui-label>-->
<!--                <div id="edit-image-container">-->
<!--                    <sui-image :src="data.featured_image"/>-->
<!--                </div>-->
<!--                <div class="field">-->
<!--                    <div class="ui input">-->
<!--                        <input type="file" ref="featured_image" name="featured_image" @change="handleFileUpload"/>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <br>-->
<!--                <label>Content : </label>-->
<!--                <div class="field">-->
<!--                    <sui-label color="teal" basic>100 - 50.000 character</sui-label>-->
<!--                    <button class="ui button blue" type="submit" class="btn btn-primary">Update</button>-->
<!--                    <button class="ui button negative" class="btn btn-primary" @click="setEditVisibility">-->
<!--                        Cancel-->
<!--                    </button>-->
<!--                </div>-->
<!--                <div class="field">-->
<!--                    <local-quill-editor v-model="content"-->
<!--                                        ref="quillEditor"-->
<!--                                        :options="editorOption">-->
<!--                    </local-quill-editor>-->
<!--                </div>-->
<!--            </form>-->

            <!-- line between -->

<!--            <edit-article-component v-if="editVisibility"/>-->

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
            data: Object
        },
        methods: {
            dismissContent: function () {
                this.$emit("dismiss");
            },
            setEditVisibility: function () {
                if (this.editVisibility){
                    this.editVisibility = false
                } else {
                    this.editVisibility = true
                }
            }
        },
        mounted() {
            this.title = this.data.title;
            this.tags = this.data.tags;
            this.content = this.data.content
        },
        computed:{
            editIcon: function () {
                if (this.editVisibility){
                    return "check icon"
                }
                return "pencil icon"
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

    #edit-image-container {
        width: 200px;
        margin: 10px;
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