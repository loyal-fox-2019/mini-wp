<template>
  <div class="loginPage">
    <div class="form-login d-block mx-auto">
      <div class="login-section">
        <h3 class="mb-4" v-if="page === 'Login'">Sign In</h3>
        <h3 class="mb-4" v-if="page === 'Register'">Create New Account</h3>
        <input
          type="text"
          class="input-form d-block mx-auto"
          placeholder="Full Name"
          autocomplete="off"
          v-model="name"
          v-if="page === 'Register'"
          required="true"
        />
        <input
          type="email"
          class="input-form d-block mx-auto"
          placeholder="Email"
          autocomplete="off"
          v-model="email"
        />
        <input
          type="password"
          class="input-form d-block mx-auto"
          placeholder="Password"
          autocomplete="off"
          v-model="password"
        />
        <button class="btn-login" v-if="page === 'Login'" @click="login">SIGN IN</button>
        <button class="btn-login" v-if="page === 'Register'" @click="register">REGISTER</button>
        <p class="text-center">
          <small class="text-muted" v-if="page === 'Login'">
            Don't Have Account ?
            <a href @click.prevent="toPageRegister">Click Here !</a>
          </small>
        </p>
        <p class="text-center" v-if="page === 'Register'">
          <small class="text-muted">
            Already Have an Account ?
            <a href @click.prevent="toPageLogin">Click Here !</a>
          </small>
        </p>
        <p class="divider line one-line" v-if="page === 'Login'">
          <small class="text-muted">Or</small>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  data() {
    return {
      page: "Login",
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    toPageRegister() {
      this.page = "Register";
      (this.name = ""), (this.email = ""), (this.password = "");
    },
    toPageLogin() {
      this.page = "Login";
      (this.name = ""), (this.email = ""), (this.password = "");
    },
    login() {
      axios({
        method: "post",
        url: "http://localhost:3000/users/login",
        data: {
          email: this.email,
          password: this.password
        },
        validateStatus: function(status) {
          return status < 404; // Reject only if the status code is greater than or equal to 500
        }
      })
        .then(login => {
          if (login.status === 400) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: login.data.message
            });
          } else {
            localStorage.setItem("token", login.data);
            this.$emit("login", "login");
          }
        })
        .catch(err => {});
    },
    register() {
      axios({
        method: "post",
        url: "http://localhost:3000/users/register",
        data: {
          name: this.name,
          email: this.email,
          password: this.password
        },
        validateStatus: function(status) {
          return status < 404; // Reject only if the status code is greater than or equal to 500
        }
      })
        .then(register => {
          //   console.log(data);
          if (register.status === 201) {
            Swal.fire({
              icon: "success",
              title: "Successfully Registered"
            });
            localStorage.setItem("token", register.data);
            this.$emit("login", "login");
          } else {
            Swal.fire({
              icon: "error",
              title: "Upps...",
              text: register.data.message
            });
          }
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            text: err
          });
        });
    }
  }
};
</script>

<style scoped>
.loginPage {
  height: calc(100vh - 49px);
  width: 100vw;
  background-color: #5fb883;
  padding-top: 3%;
}
.form-login {
  height: 450px;
  width: 450px;
  padding: 45px;
  background-color: #ffffff;
  box-shadow: 0px 0px 11px 0px #363636;
}
.input-form {
  background-color: #f2f2f2;
  border: none;
  width: 100%;
  padding: 15px;
  margin-bottom: 15px;
  font-size: 1.1em;
  font-weight: 200;
}
.btn-login {
  width: 100%;
  padding: 15px;
  border: none;
  color: #ffffff;
  background-color: #5fb883;
  margin-bottom: 8px;
}
.btn-login:hover {
  background-color: #41a368;
}
.text-center {
  text-align: center;
  margin-bottom: 3px;
}
.text-center small a {
  color: #5fb883;
}
.divider {
  display: flex;
}
.divider::before,
.divider::after {
  content: "";
  flex: 1;
}
.line {
  align-items: center;
  margin: 0.4em -1em;
}
.line::before,
.line::after {
  height: 1px;
  margin: 0 1em;
}
.one-line::before,
.one-line::after {
  background: #757575;
}

@media (max-width: 576px) {
  .loginPage {
    padding-top: 20%;
  }

  .form-login {
    width: 300px;
    height: 300px;
    padding: 15px;
  }
  .login-section h3 {
    font-size: 1.2em;
  }
  .input-form {
    padding: 8px;
    font-size: 0.9em;
  }
  .btn-login {
    padding: 8px;
    font-size: 1em;
  }
}
</style>