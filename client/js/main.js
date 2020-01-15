; 'use strcit'

new Vue({
    el: '#app',
    data: {
      email: '',
      password: '123',
      article : [],
      BASE_URL: 'http://localhost:3000/miniwp'
    },
    created : function (){
    
      console.log('masuk create')
      axios({
        method : 'get',
        url: 'http://localhost:3000/miniwp/article'
      })
      .then((result) => {
        console.log(typeof result.data)
        console.log(result.data)
        console.log(this.password)
        this.article = result.data
        console.log('masuk result')
      })
      .catch(err => {
        console.log(err)
        console.log('masuk error'+err)
      })
    },
    methods: {
      remove: function(id){
        axios({
          method: 'delete',
          url: `http://localhost:3000/miniwp/article/${id}`
        })
        .then((result) => {
          console.log(result)
        })
        .catch(err => {
          console.log(err)
        })
      }
    }
})