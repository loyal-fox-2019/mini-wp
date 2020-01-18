; 'use strcit'

new Vue({
    el: '#app',
    data: {
      email: '',
      password: '',
      login: false,
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
      },
      checkLogin: function(){
        // if(this.email === 'takin@gmail.com' && this.password === 'asd123'){
        //   this.login = true
        // }
        axious({
          method: 'post',
          url: `http://localhost:3000/miniwp/member/signin`,
          data: {
            email: this.email,
            password: this.password
          }
        })
        .then((result) => {
          localStorage.setItem('token', result.data.token)
          this.login = true
        })
        .catch(err => {
          console.log(err.message)
        })
      }
    }
})