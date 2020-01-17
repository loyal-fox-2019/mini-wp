<template>
    <form class="w-100"
          @submit.prevent=""
          enctype="multipart/form-data"
          v-if="editVisibility">
        <label for="article-title">Title : </label>
        <sui-label color="teal" basic>10 - 100 character</sui-label>
        <div class="field">
            <div class="ui input">
                <input type="text"
                       id="article-title"
                       placeholder="Title"
                       v-model="title"
                       size="100"
                       minlength="10"
                       maxlength="100"
                       required>
            </div>
        </div>
        <br>
        <label for="article-tags">Tags : </label>
        <sui-label color="teal" basic>
            min 1 tag, 3 - 15 character
        </sui-label>
        <div class="field">
            <div class="ui input">
                <sui-dropdown
                        multiple
                        id="article-tags"
                        :options="tagList"
                        v-model="tags"
                        placeholder="Tags"
                        search
                        selection
                        allow-additions
                        required/>
            </div>
        </div>
        <br>
        <label>Feature Image : </label>
        <sui-label color="teal" basic>max size 5 Mb</sui-label>
        <div id="edit-image-container">
            <sui-image :src="data.featured_image"/>
        </div>
        <div class="field">
            <div class="ui input">
                <input type="file" ref="featured_image" name="featured_image" @change="handleFileUpload"/>
            </div>
        </div>
        <br>
        <label>Content : </label>
        <div class="field">
            <sui-label color="teal" basic>100 - 50.000 character</sui-label>
            <button class="ui button blue" type="submit" class="btn btn-primary">Update</button>
            <button class="ui button negative" class="btn btn-primary" @click="setEditVisibility">
                Cancel
            </button>
        </div>
        <div class="field">
            <local-quill-editor v-model="content"
                                ref="quillEditor"
                                :options="editorOption">
            </local-quill-editor>
        </div>
    </form>
</template>

<script>
    export default {
        name: "editArticleComponent"
    }
</script>

<style scoped>

</style>