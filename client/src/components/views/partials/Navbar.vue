<template>
  <!-- Navbar -->
  <header class="sticky">
    <nav class="bg-blue-700 flex justify-between py-2">
      <div class="ml-2 flex align-items-center">
        <h2 class="text-2xl font-bold text-white">
          <i class="fab fa-wordpress-simple mr-3"></i>
          Mini WP
        </h2>
      </div>
      <div class="mr-2 flex">
        <div class="col">
          <button
            class="btn btn-light font-weight-bold w-full flex align-items-center"
            @click="toCreateArticle"
          >
            <i class="fas fa-pen mr-2"></i>
            Write
          </button>
        </div>
        <div class="col">
          <button
            class="btn btn-danger font-weight-bold w-full"
            @click="logout"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    toCreateArticle() {
      this.$emit("toCreateArticle");
    },
    // logout
    logout() {
      localStorage.removeItem("token");
      const auth2 = gapi.auth2.getAuthInstance();
      this.$emit("loggedIn", false);
      auth2.signOut().then(function() {
        console.log("User signed out.");
        auth2.disconnect();
      });
    }
  }
};
</script>

<style></style>
