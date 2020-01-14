<template>
  <div class="nav-wrapper">
    <div class="nav-logo">
      <img src="/assets/images/logo.png" alt="" class="mr-2">
      <span class="nav-header">MIDIUM</span>
    </div>
    <b-navbar>
      <b-navbar-nav>
        <b-nav-item href="#">Home</b-nav-item>

        <!-- Navbar dropdowns -->
        <b-nav-item-dropdown text="Post" right>
          <b-dropdown-item href="#">Create New</b-dropdown-item>
          <b-dropdown-item href="#">Published</b-dropdown-item>
          <b-dropdown-item href="#">Draft</b-dropdown-item>
          <b-dropdown-item href="#">Trash</b-dropdown-item>
        </b-nav-item-dropdown>
        
        <b-nav-item-dropdown text="User" right>
          <b-dropdown-item href="#">Account</b-dropdown-item>
          <b-dropdown-item href="#">Log Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
    <div class="nav-profile">
      Somebody
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .nav-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 64px;
    width: 100%;
    border-bottom: 2px solid rgb(172, 172, 172);
    box-shadow: 0 24px 10px -20px rgba(0, 0, 0, 0.2)
  }
  .nav-logo {
    display: flex;
    align-items: center;
    height: 32px;
    cursor: pointer;
  }
  .nav-logo:hover>.nav-header {
    /* color: crimson; */
    animation: 2s disco infinite;
  }
  .nav-logo img {
    width: 32px;
  }
  .nav-header {
    font-family: 'Fugaz One', cursive; 
  }
  .nav-menu {
    display: flex;
    align-content: center;
    height: 48px;
  }

  @keyframes disco {
    0%, 100% {
      color: #ff43f6;
    }
    50% {
      color: #a462ca;
    }
  }
</style>