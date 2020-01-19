<template>
  <div class="container-fluid">
    <div class="row 2 mt-3">
      <div class="col-3 card pt-3" style="width: 18rem;">
        <img
          class="card-img-top"
          src="https://www.remove.bg/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg"
          alt="Card image cap"
        />
        <div class="card-body">
          <h5 class="card-title">Name</h5>
          <p
            class="card-text"
          >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut fugit voluptates laborum magnam quas, unde non deleniti repellat consectetur enim sed reiciendis ipsam molestiae, perferendis soluta qui, sint explicabo atque!</p>
          <ul class="list-group list-group-flush text-center">
            <li class="list-group-item">email@mail.com</li>
            <li class="list-group-item">FirstName</li>
            <li class="list-group-item">Last Name</li>
          </ul>
          
          <!-- <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a> -->
        </div>
      </div>
      <div class="col">
        <Usercard v-for="(article, key) in articles" :key="key" :article="article"></Usercard>
      </div>
    </div>
  </div>
</template>

<script>
import Usercard from "../components/UserCard";
export default {
  name: "ProfilePage",
  props: ['articles'],
  components: {
    Usercard
  },
  data(){
    return {

    }
  },
  methods: {
    
  },
}
</script>

<style>
</style>