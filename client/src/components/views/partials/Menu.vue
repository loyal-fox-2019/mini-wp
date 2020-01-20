<template>
  <!-- Menu -->
  <nav
    class="col-sm-2 lg:h-screen xl:h-screen md:overflow-auto lg:overflow-auto xl:overflow-auto sticky top-0 py-4 border-r-2"
  >
    <ul class="nav flex-column text-base font-weight-bold">
      <li class="nav-item hover:bg-gray-500">
        <a class="nav-link" href="#" @click="$emit('toDashboard')">
          <i class="fas fa-desktop mr-1"></i>
          Dashboard
        </a>
      </li>
      <li class="nav-item hover:bg-gray-500">
        <a class="nav-link" href="#" @click="$emit('toMyArticles')">
          <i class="far fa-newspaper mr-1"></i>
          My Articles
        </a>
      </li>
    </ul>
  </nav>
  <!-- End of Menu -->
</template>

<script>
export default {
  Name: "Menu"
};
</script>

<style>
</style>