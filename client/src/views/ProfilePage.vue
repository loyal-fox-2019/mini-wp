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
          <h5 class="card-title">{{ firstName }}</h5>
          <p class="card-text">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut fugit
            voluptates laborum magnam quas, unde non deleniti repellat
            consectetur enim sed reiciendis ipsam molestiae, perferendis soluta
            qui, sint explicabo atque!
          </p>
          <ul class="list-group list-group-flush text-center">
            <li class="list-group-item">{{ email }}</li>
            <li class="list-group-item">{{ firstName }}</li>
            <li class="list-group-item">{{ lastName }}</li>
          </ul>

          <!-- <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a> -->
        </div>
      </div>
      <div class="col">
        <Usercard
          v-for="(article, key) in articles"
          :key="key"
          :article="article"
        ></Usercard>
      </div>
    </div>
  </div>
</template>

<script>
import Usercard from '../components/UserCard'
export default {
  name: 'ProfilePage',
  props: ['articles'],
  components: {
    Usercard
  },
  data() {
    return {
      email: '',
      firstName: '',
      lastName: '',
      phone: ''
    }
  },
  methods: {},
  created() {
    axios({
      method: 'get',
      url: 'http://localhost:3000/findOneUser',
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .then(({ data }) => {
        ;(this.email = data.email),
          (this.firstName = data.firstName),
          (this.lastName = data.lastName),
          (this.phone = dat.phone)
        console.log('data hasbeen created ', data)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style></style>
