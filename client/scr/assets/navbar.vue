<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#">Mini-WP</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#" @click.prevent="write">Write</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search" v-model="search" @keyup="find"></b-form-input>
        </b-nav-form>
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
                <b-icon icon="person-fill"></b-icon> Account
          </template>
          <b-dropdown-item href="#"><b-icon icon="person"></b-icon> Profile</b-dropdown-item>
          <b-dropdown-item href="#" @click="logout"><b-icon icon="power"></b-icon> Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
export default {
    data(){
        return {
            search: '',
        }
    },
    methods:{
        find: function(){
            this.$emit('find', this.search)
        },
        write: function(){
            this.$emit('write')
        },
        logout: function(){
          this.$emit('logout')
        }
    }

}
</script>

<style>

</style>