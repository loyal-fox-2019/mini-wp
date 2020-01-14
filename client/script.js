const quillAdd = new Quill('#editor-add', {
  theme: 'snow'
});

const quillEdit = new Quill('#editor-edit', {
  theme: 'snow'
});

const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    posts: [],
    state: 0, // (0 -- view all, 1 -- add mode, 2 -- edit mode)
    keyword: ''
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
    }
  },
  created() {
    axios.get('http://localhost:3000/articles')
      .then(result => {
        console.log(result)
        this.posts = result.data;
      })
      .catch(err => console.error(err));
  }
})