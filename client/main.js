var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      profileMenu: true,
      postingMenu: false,
      title: '',
      content: '',
      untukContent: []
    },
    computed: {
        
    },
    methods: {
        showProfilePage() {
            this.profileMenu = true
            this.postingMenu = false
        },
        showPostingPage() { 
            this.profileMenu = false
            this.postingMenu = true
        },
        addPostingan(){
            axios({
                method: 'post',
                url: 'http://localhost:3000/wordpress',
                data: {
                  title: this.title,
                  content: this.content
                }
              })
              .then(({data}) => {

              })
              .catch(err => {
                  console.log(err)
              })
            this.untukContent.push({
                title: this.title,
                content: this.content
            })
            this.title = ''
            this.content = ''
        },
        getPostingan(){

        } 
    },
    watch: {
        
    },
    created() {
        axios({
            method: 'get',
            url: 'http://localhost:3000/wordpress'
          })
          .then(({data}) => {
            this.untukContent = data
            console.log(this.untukContent);
            
            // console.log(data[0])
            // console.log(this.untukContent);
            
          })
          .catch(err => {
              console.log(err);
          })
        //   console.log(this.dataContent);
          
    }
  })