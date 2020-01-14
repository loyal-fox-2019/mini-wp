const qAdd = new Quill('#editor-add', {
  theme: 'snow'
});

const qEdit = new Quill('#editor-edit', {
  theme: 'snow'
});

const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    posts: [],
    state: 0, // (0 -- view all, 1 -- add mode, 2 -- edit mode)
    keyword: '',
    quillAdd: null,
    quillEdit: null,
    currPost: {},
    newTitle: ''
  },
  computed: {
    displayPosts() {
      console.log(this.keyword)
      if (this.keyword.length > 0) {
        const regex = new RegExp(this.keyword, 'i');
        const temp = this.posts.filter((item) => {
          return regex.test(item.title);
        })

        return temp;
      }

      return this.posts;
    }
  },
  methods: {
    changeToViewAll: function() {
      this.state = 0;
      console.log(this.state);
    },
    changeToAddView: function() {
      this.state = 1;
      console.log(this.state);
    },
    viewOne: function(post) {
      console.log(post)
      this.currPost = {...post};
      this.quillEdit.setText('niceeee\n')
    },
    updateData: function() {
      const { _id, title } = this.currPost;
      this.posts.forEach((item) => {
        if (item._id === _id) {
          item.title = title;
        }
      })

      if (findPost) {
        axios.put(`http://localhost:3000/articles/${_id}`, { title })
        .then(function (response) {
          console.log(`SUCCESS UPDATE POST ${_id}`)
        })
        .catch(function (error) {
          console.error(error);
        });
      }
    },
    saveData: function() {
      axios.post(`http://localhost:3000/articles/`, {
        title: this.newTitle,
        content: ''
      })
        .then(function (response) {
          console.log(response.data)
          return axios.get('http://localhost:3000/articles')
        })
        .then(result => {
          console.log(result)
          this.posts = result.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    deleteData: function(postDelete) {
      const { _id, title } = postDelete;
      this.posts = this.posts.filter(item => {
        return item._id !== _id;
      })

      axios.delete(`http://localhost:3000/articles/${_id}`)
      .then(function (response) {
        console.log(`SUCCESS DELETE POST ${_id}`)
      })
      .catch(function (error) {
        console.error(error);
      });

      // console.log(this.posts.length);
    }
  },
  created() {
    axios.get('http://localhost:3000/articles')
      .then(result => {
        console.log(result)
        this.posts = result.data;
        this.quillEdit = qEdit;
        this.quillAdd = qAdd;
      })
      .catch(err => console.error(err));
  }, updated() {
  }
})