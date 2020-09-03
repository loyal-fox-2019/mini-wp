<template>
  <div class="d-flex flex-column align-items-center">
    <div class="d-flex border mt-3 image border">
      <img :src="article.featured_image" alt="">
    </div>
    <div class="d-flex flex-column w-100 pl-4 pr-4">
      <div class="d-flex flex-row mt-2">
      <h1 class="title">{{article.title}}</h1>
      <div v-if="article.author._id == this.user">
        <b-button-group>
          <b-dropdown right text="Menu" size="sm" class="ml-3">
            <b-dropdown-item @click.prevent="edit(article)"><i class="fas fa-edit mr-3"></i>Edit</b-dropdown-item>
            <b-dropdown-item @click.prevent="destroy(article)"><i class="fas fa-trash mr-3"></i>Delete</b-dropdown-item>
          </b-dropdown>
        </b-button-group>
      </div>
    </div>
      <div v-if="(article.tags.length > 1)">
        <label v-for="(tag, index) in article.tags" :key="index">
          <button type="button" class="btn btn-sm btn-danger disabled ml-2" data-toggle="button" aria-pressed="false">
           {{tag}}
          </button></label>
      </div>
      <label class="font-italic"><i class="fas fa-feather-alt mr-2 ml-3"></i> {{ article.author.username }} </label>
      <label class="font-italic"><i class="fas fa-clock mr-2 ml-3"></i> {{ dateFormat(article.createdAt) }} </label>
    </div>
    <div class="mt-3 w-75 content d-flex align-items-center justify-content-center">
      <p v-html="article.content"> </p>
    </div>
  </div>
</template>

<script>
import axios from '../server'
import moment from 'moment'
import swal from 'sweetalert2' 

export default {
  props: ['article'],
  data () {
    return {
      user: ''
    }
  },
  methods: {
    dateFormat(val) {
      return moment(val).format("MMM Do YYYY")
    },
    edit(val) {
      this.$emit('editArticle', val)
    },
    destroy (val) {
      swal.fire({
        title: "Are you sure to Delete this Article?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Deleted!"
      }).then(result => {
        if (result.value) {
          axios({
            method: "DELETE",
            url: `articles/${val._id}`,
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(({data}) => {
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
      });
    },
    userId() {
      axios({
        url: 'users/cek',
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        this.user = data
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
    this.userId()
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');

.image {
  overflow: hidden;
  height: 300px;
}

img {
  object-fit: cover;
  width: 100%;
}


.title {
  color: #007bff;
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 4.5rem
}

label {
  font-size: 0.9rem
}

p {
  line-height: 1.9;
}

</style>