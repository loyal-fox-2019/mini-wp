<template>
  <div
    class="flex flex-column h-screen"
    style="background: url('https://picsum.photos/2080/1040?random=2')"
  >
    <div class="bg-blue-400 rounded-b-full">
      <nav>
        <h2 class="text-4xl text-center font-bold py-1">Mini WP</h2>
      </nav>
    </div>
    <h2
      class="w-full max-w-xs text-center mt-64 mx-auto text-4xl font-bold bg-white p-3 rounded-t-lg"
    >LOGIN</h2>
    <div class="w-full max-w-xs mx-auto">
      <form class="bg-white px-8 pt-6 pb-8 mb-4 rounded-b-lg">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Email</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="email"
            placeholder="Email"
            v-model="loginData.email"
            required
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
          <input
            class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            v-model="loginData.password"
            required
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            @click.prevent="login"
          >Sign In</button>
          <p>or</p>
          <b-button v-b-modal.modal-center>Register Here</b-button>

          <!-- Register Modal -->
          <b-modal
            id="modal-center"
            no-close-on-backdrop
            no-close-on-esc
            centered
            title="Register Account"
            @ok="checkRegister"
          >
            <form class="bg-white px-8 pt-6 pb-8 mb-4 rounded-b-lg">
              <div class="row">
                <div class="col-sm-6 flex-col">
                  <label>First Name :</label>
                  <b-form-input
                    v-model="registrationData.firstName"
                    :type="'email'"
                    placeholder="First Name"
                    required
                  ></b-form-input>
                </div>
                <div class="col-sm-6 flex-col">
                  <label>Last Name (optional) :</label>
                  <b-form-input
                    v-model="registrationData.lastName"
                    :type="'email'"
                    placeholder="Last Name"
                  ></b-form-input>
                </div>
              </div>

              <label class="mt-3" for>Email :</label>
              <b-form-input
                v-model="registrationData.email"
                :type="'text'"
                placeholder="Email"
                required
              ></b-form-input>

              <label class="mt-3" for>Password :</label>
              <b-form-input
                v-model="registrationData.password"
                :type="'password'"
                placeholder="Password"
                required
              ></b-form-input>

              <label class="mt-3" for>Confirm Password :</label>
              <b-form-input
                v-model="registrationData.confirmPassword"
                :type="'password'"
                placeholder="Confirm Password"
                required
              ></b-form-input>
            </form>
          </b-modal>
        </div>
        <div class="flex flex-col">
          <h2 class="text-center my-3">Continue with google</h2>
          <g-signin-button
            :params="googleSignInParams"
            @success="onSignInSuccess"
            @error="onSignInError"
          >Sign in with Google</g-signin-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Frontpage",
  data() {
    return {
      registrationData: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        errors: []
      },
      loginData: {
        email: "",
        password: "",
        errors: []
      },
      googleSignInParams: {
        client_id:
          "548107510061-bpel15dmio491blo65srccf8os76unmh.apps.googleusercontent.com"
      }
    };
  },
  methods: {
    checkRegister() {
      let isError = false;
      if (
        this.registrationData.password != this.registrationData.confirmPassword
      ) {
        this.registrationData.errors.push("Password not match");
        isError = true;
      }

      if (this.registrationData.password.length < 6) {
        isError = true;
        this.registrationData.errors.push("Password min. 6 characters");
      }

      if (isError) {
        this.toast(this.registrationData.errors);
      } else {
        this.register();
      }
    },
    toast(errors) {
      errors.forEach(error => {
        this.$bvToast.toast(`${error}`, {
          title: "Error",
          static: true,
          noAutoHide: true,
          toaster: "b-toaster-top-center",
          appendToast: true,
          variant: "danger",
          solid: true
        });
      });
    },
    register() {
      const userData = {
        fullname:
          this.registrationData.firstName +
          " " +
          this.registrationData.lastName,
        email: this.registrationData.email,
        password: this.registrationData.password
      };

      axios
        .post("http://localhost:3000/users/register", userData)
        .then(function({ data }) {
          console.log(data);
          localStorage.setItem("token", data.acc_token);
          this.$emit("loggedIn", true);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    login() {
      const loginData = {
        email: this.loginData.email,
        password: this.loginData.password
      };
      axios
        .post("http://localhost:3000/users/login", loginData)
        .then(({ data }) => {
          console.log(data);
          localStorage.setItem("token", data.acc_token);
          this.$emit("loggedIn", true);
        })
        .catch(error => {
          this.loginData.errors.push("Invalid email or password");
          this.toast(this.loginData.errors);
        });
    },
    onSignInSuccess(googleUser) {
      const id_token = googleUser.getAuthResponse().id_token;
      const token = {
        idToken: id_token
      };
      console.log(id_token);
      axios
        .post("http://localhost:3000/users/g_sign_in", token)
        .then(({ data }) => {
          console.log(data);
          localStorage.setItem("token", data.acc_token);
          this.$emit("loggedIn", true);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    onSignInError(error) {
      // `error` contains any error occurred.
      console.log("OH NOES", error);
    },
    onSignIn(googleUser) {}
  }
};
</script>

<style>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style>