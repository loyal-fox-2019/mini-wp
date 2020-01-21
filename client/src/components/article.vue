<template>
  <div class="container-fluid">
      <div class="row">
          <div class="col-lg-12 p-5">
              <h2>Show Article</h2>
              <input type="search" placeholder="Search Article" aria-label="Search" class="form-control mr-sm-2">
              <div class="row mt-4">
                  <div class="col-lg-3" v-for="(article, i) in articles" v-bind:key="i">
                      <div class="card" style="height: 100%">
                          <div class="card-body">
                                <img class="card-img-top" v-bind:src="article.file" alt="Card image cap" width="100" height="200">
                                <div class="card-content">
                                    <h5 class="card-title">{{article.title}}</h5>
                                    <p class="card-text">{{article.content}}</p>
                                    <p class="card-date">{{article.created_at}}</p>
                                    <div class="button_card_container d-flex justify-content-between">
                                        <button class="btn btn-danger" v-on:click.prevent="getDeleteId(article._id)"><i class="fas fa-trash mr-2"></i>Delete</button>
                                        <button class="btn btn-info" v-on:click.prevent="getUpdateId(article._id)"><i class="fas fa-edit"></i>Update</button>
                                    </div> 
                                </div>   
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'article',
    props: ['articles'],
    created() {
        
    },
    data: function() {
        return {
            
        }
    },
    methods: {
        getUpdateId: function(id) {
            this.$emit('toEditPage', id);
        },
        getDeleteId: function(id) {
            this.$emit('deleteArticle', id);
        }
    }
}
</script>

<style scoped>
.card-body {
    padding: 0;
}

.card-content {
    padding: 20px;
}
</style>