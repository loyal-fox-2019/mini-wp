<template>
  <div class="p-2 m-2 d-flex justify-content-center">
    <div class="custom-form">
      <b-form class="py-2 px-5">
        <div class="text-center">
          <h1 class="text-light">Register For Free</h1>
          <h1 class="text-light">Forever</h1>
        </div>
        <b-form-group
          id="input-group-1"
          label="Username:"
          label-for="input-1"
          class="text-light"
        >
          <b-form-input
            id="input-1"
            type="text"
            required
            placeholder="Enter username"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
          class="text-light"
        >
          <b-form-input
            id="input-1"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Password:" label-for="input-2" class="text-light">
          <b-form-input
            id="input-2"
            type="password"
            placeholder="Password"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" squared class="custom-color">Register</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login-form',
}
</script>

<style scoped>
.custom-color {
  background-color: #6e8f8a !important;
  border: #6e8f8a !important;
  border-color: #6e8f8a !important;
}

.custom-color:hover {
  background-color: #a2b8b4 !important;
  border: #a2b8b4 !important;
  border-color: #a2b8b4 !important;
}

.custom-form {
  background-color: rgb(0, 0, 0, 0.1) !important;
  width: 40%;
  height: 50%;
}
</style>
