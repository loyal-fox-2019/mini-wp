// const qAdd = new Quill('#editor-add', {
//   theme: 'snow'
// });

// const qEdit = new Quill('#editor-edit', {
//   theme: 'snow'
// });

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
    newTitle: '',
    newContent: '',
    currImage: null,
    image: ''
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
      this.image = '';
      console.log(this.state);
    },
    changeToAddView: function() {
      this.state = 1;
      this.currPost = {};
      this.image = '';
      console.log(this.state);
    },
    viewOne: function(post) {
      console.log(post)
      this.currPost = {...post};
      this.image = this.currPost.image;
    },
    updateData: function() {
      const { _id, title, content } = this.currPost;
      this.posts.forEach((item) => {
        if (item._id === _id) {
          item.title = title;
        }
      })

      const formData = new FormData()
      formData.append('title', title);
      formData.append('content', content);

      // jika user pengin gambar TIDAK DIUPDATE
      if (!this.currImage && this.image) {
        formData.append('file', this.image);
      } else if (!this.currImage && !this.image) { // jika user pengin gambar DIHAPUS
        formData.append('file', "");
      } else { // user ingin gambar DIUPDATE
        formData.append('file', this.currImage);
      }

      axios.put(`http://localhost:3000/articles/${_id}`,
        formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      .then(function (response) {
        console.log(`SUCCESS UPDATE POST ${_id}`)
        return axios.get('http://localhost:3000/articles');
      })
      .then(result => {
        console.log(result)
        this.posts = result.data;
      })
      .catch(function (error) {
        console.error(error);
      });
    },
    saveData: function() {
      // create form data
      const formData = new FormData()
      formData.append('title', this.newTitle);
      formData.append('content', this.newContent);
      formData.append('file', this.currImage);

      // create the article!
      axios.post(`http://localhost:3000/articles/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(function (response) {
          console.log(response.data)
          return axios.get('http://localhost:3000/articles')
        })
        .then(result => {
          console.log(this.posts)
          this.posts = result.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    deleteData: function(postDelete) {
      const { _id, title } = postDelete;
      this.currPost = {};
      this.posts = this.posts.filter(item => {
        return item._id !== _id;
      })

      axios.delete(`http://localhost:3000/articles/${_id}`)
      .then(function (response) {
        console.log(`SUCCESS DELETE POST ${_id}`);
        return axios.get('http://localhost:3000/articles');
      })
      .then(result => {
        console.log(result)
        this.posts = result.data;
      })
      .catch(function (error) {
        console.error(error);
      });

    },
    onFileChange: function(e) { // buat ambil image
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
    
      this.currImage = files[0];
      this.createImage(files[0]);
    },
    createImage: function(file) { // buat bikin image
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };

      reader.readAsDataURL(file);
    },
    removeImage: function (e) { // buat remove image
      this.image = null;
    }
  },
  created() {
    axios.get('http://localhost:3000/articles')
      .then(result => {
        console.log(result)
        this.posts = result.data;
      })
      .catch(err => console.error(err));
  }, updated() {
  }
})