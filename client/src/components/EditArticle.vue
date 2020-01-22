<template>
  <div>
    <div class="container-fluid mt-4" id="dashboard-content">
      <div id="add-article">
        <form @submit.prevent="updatedArticle">
          <div class="form-group">
            <input
              v-model="title"
              type="text"
              class="form-control rounded-0"
              id="create-title"
              placeholder="Add title"
            />
          </div>
          <div>
            <!-- Styled -->
            <b-form-file type="file" v-model="image" ref="file" />
          </div>
          <div class="form-group mt-3">
            <wysiwyg v-model="content" />
          </div>
          <b-form-tags
            v-model="tags"
            separator=" "
            placeholder="Enter new tags separated by space"
            remove-on-delete
            no-add-on-enter
            class="mb-2"
          ></b-form-tags>
          <button type="submit" class="btn btn-primary publish">
            <i class="far fa-edit"></i> Updated
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../server'
import swal from 'sweetalert2'

export default {
  props: ['article'],
  data() {
    return {
      title: "",
      content: "",
      image: null,
      tags: []
    };
  },
  methods: {
    updatedArticle() {
      const formData = new FormData()
        
        if(this.image == null) formData.set('image', "") 
        else formData.append('image',this.image)
        formData.set('title', this.title)
        formData.set('content', this.content)
        formData.set('tags', this.tags)
      
      axios({
        method: 'PUT',
        url: `articles/${this.article._id}`,
        data: formData,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        swal.fire({
          title: "Success!",
          text: `${data.message}`,
          icon: "success",
          confirmButtonText: "Ok"
        });
        this.$emit('changePage', 'showArticle')
      })
      .catch(err => {
        swal.fire({
          title: "Error!",
          text: err.response.data.message,
          icon: "error",
          confirmButtonText: "Ok"
        });
      })
    }
  },
  created() {
    this.title = this.article.title,
    this.content = this.article.content,
    this.tags = this.article.tags
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');

#add-article {
  padding: 20px;
}

#create-title {
  background-color: #f9f9f9;
  border-radius: 0 !important;
  height: 100px;
  text-align: center;
  font-size: 48px;
  font-family: 'Open Sans', sans-serif;
  border-color: #007bff;
  border-width: 0 0 0 4px;
}

#create-title:hover {
  border-color: #0056b3;
  border-radius: 0 !important;
  border-width: 0 0 0 4px;
}

#create-title:focus {
  border-color: #0056b3;
  border-radius: 0 !important;
  border-width: 1px 1px 1px 4px;
  box-shadow: none;
}

.publish {
  background-color: #007bff;
  border-color: #007bff;
  box-shadow: none !important;
  font-family: 'Open Sans', sans-serif;
  color: #f9f9f9;
}

.publish:hover {
  background-color: #0056b3;
  border-color: #0056b3;
  box-shadow: none !important;
}

.publish:focus {
  background-color: #0056b3;
  border-color: #0056b3;
  box-shadow: none !important;
}
</style>

