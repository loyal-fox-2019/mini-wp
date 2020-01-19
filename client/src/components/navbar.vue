<template>
  <nav class="mb-1 navbar navbar-expand-lg navbar-dark blue lighten-1">
    <a class="navbar-brand fab fa-wordpress-simple" href="#">My Site</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent-555"
      aria-controls="navbarSupportedContent-555"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent-555">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link fab fa-readme" href="#">Reader</a>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto nav-flex-icons">
        <li class="nav-item">
          <button
            type="button"
            class="btn btn-light far fa-edit"
            data-toggle="modal"
            @click="addArticle"
            style="width:auto; height:30px;"
          >Write</button>
        </li>
        <li class="nav-item avatar">
          <a
            class="nav-link dropdown-toggle p-0"
            d="navbarDropdownMenuLink-55"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <img
              src="https://mdbootstrap.com/img/Photos/Avatars/avatar-5.jpg"
              class="rounded-circle z-depth-0"
              alt="avatar image"
              height="35"
            />
            <div
              class="dropdown-menu dropdown-menu-lg-right dropdown-secondary"
              aria-labelledby="navbarDropdownMenuLink-55"
            >
              <a class="dropdown-item" @click="logout" href="#">Logout</a>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navbar",
  methods: {
    logout() {
      localStorage.clear();
      this.$root.articles = [];
      this.$emit("checkLogin");
    },
    addArticle() {
      this.$emit("submitArticle");
    }
  }
};
</script>

<style scoped>
.btn {
  margin: 3px;
  margin-right: 20px;
}
</style>