<template>
  <div class="add-post container">
    <header class="text-center m-4">
      <h3 class="h3">Add Article</h3>
    </header>
    <form action="#" class="commenting-form">
      <div class="row">
        <div class="form-group col-md-6">
          <input type="text" name="title" id="title" placeholder="Title" class="form-control" v-model="title">
        </div>
        <div class="form-group col-md-6">
          <input type="text" name="tags" id="tags" placeholder="Tags" class="form-control">
        </div>
        <div class="form-group col-md-12">
          <input type="text" name="image" id="image" placeholder="image link" class="form-control">
        </div>
        <div class="form-group col-md-12">
          <wysiwyg v-model="content" />
        </div>
        <div class="form-group col-md-12 text-right">
          <button type="submit" class="btn btn-secondary">Submit</button>
        </div>
      </div>
    </form>
    <div>
      <h4>Preview: </h4>
      <div class="text-center">
        <h5 class="h3">{{title}}</h5>
      </div>
      <span v-html="content"></span>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      content: '',
      title: ''
    }
  }
}
</script>

<style scoped>
.add-post {
  max-width: 50vw;
}
</style>
