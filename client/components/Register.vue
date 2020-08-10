<template>
  <div class="text-center">
    <form class="form-register" v-on:click.prevent>
      <img
        class="mb-4"
        src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
        alt=""
        width="72"
        height="72"
      />
      <h1 class="h3 mb-3 font-weight-normal">Please register</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input
        type="email"
        id="inputEmailRegister"
        class="form-control"
        placeholder="Email address"
        v-model="user.email"
        required
        autofocus
      />
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        id="inputPasswordarRegister"
        class="form-control"
        placeholder="Password"
        v-model="user.password"
        required
      />
      <div>
        Already join?
        <b-link v-on:click="$emit('goToLogInPage')">login here!</b-link>
      </div>
      <br />
      <!-- <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" /> Remember me
        </label>
      </div> -->
      <button
        v-on:click="$emit('userRegister', user)"
        class="btn btn-lg btn-primary btn-block"
        type="submit"
      >
        Register
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      user: {
        email: null,
        password: null
      }
    };
  }
};
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-register {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-register .checkbox {
  font-weight: 400;
}
.form-register .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-register .form-control:focus {
  z-index: 2;
}
.form-register input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-register input[type='password'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
