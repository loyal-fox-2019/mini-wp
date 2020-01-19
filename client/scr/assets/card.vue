<template>
<div> 
  <span v-if="edit">
    <b-form enctype="multipart/form-data">
      <b-form-group label="Title:">
        <b-form-input v-model="title"></b-form-input>
      </b-form-group>

      <b-form-group label="Content">
        <areas id="ar" ref="myTextEditor"
          v-model="content"
          :config="editorOption">
        </areas>
      </b-form-group>
      <br><br><br>
      <b-form-group label="Tags">
          <b-form-tags
          v-model="tags"
          tag-variant="dark"
          tag-pills
          size="lg"
          separator=" "
          placeholder="Enter new tags"
          class="mb-2"
         ></b-form-tags>
      </b-form-group>

      <b-form-group label="image">
        <b-form-file v-on:change="uploadImage"></b-form-file>
      </b-form-group>

      <b-button type="submit" variant="primary" @click.prevent="handleOk">edit article</b-button>
      <b-button type="reset" variant="danger" @click.prevent="edit = false">Cancel</b-button>
    </b-form>

  </span>
  <b-card no-body class="overflow-hidden">
    <b-row no-gutters>
      <b-col md="2">
        <b-card-img :src="data.image" class="rounded-0 profile"></b-card-img>
      </b-col>
      <b-col md="10">
        <b-icon-trash font-scale="2" class="del" @click="del(data['_id'])"></b-icon-trash>
        <b-icon-box-arrow-up-right font-scale="2" class="del" @click="edi"></b-icon-box-arrow-up-right>
        <b-card-body v-bind:title="data.title">
          <b-card-text v-html="data.content">
          </b-card-text>
          <h6>Tags:</h6>
            <b-button pill disabled variant="info" size="sm" v-for="(tag, i) in data.tag" v-bind:key="i">{{tag}}</b-button>
           <small class="text-muted">{{ new Date(data.created_at).toLocaleString()}}</small>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
  <br>

</div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
    name:'card',
    data(){
        return {
            title: this.data.title,
            content: this.data.content,
            tags: this.data.tag,
            image:'',
            edit: false,
            editorOption: {}
        }
    },
    components: {
      areas: quillEditor
    },
    methods:{
        serch: function(params){
          this.$emit("even", this.child)
        },
        edi:function(){
          this.edit = true
        },
        uploadImage: function(){
            this.image = event.target.files[0]
        },
        del: function(id){
          this.$emit('del', id)
        },
        handleOk:function(){
          let data = new FormData
          data.append('title', this.title)
          data.append('content', this.content)
          data.append('tag', this.tags)
          data.append('image', this.image)
          data.id = this.data['_id']
          this.edit = false
          this.$emit('edit', data)
        }
    },
    props:['index', 'data']

}
</script>

<style>
.del{
  position: relative;
  float: right
}
.del:hover{
  color: red;
}
.profile{
  width: 10px;
  height: 200px
}
.text-muted{
  position: relative;
  float: right;
}
</style>