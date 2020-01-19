<template>
  <div class="center">
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="First Name:"
        label-for="input-2"
        v-if="form.register == true"
      >
        <b-form-input
          id="input-2"
          v-model="form.firstName"
          required
          placeholder="Enter your first name"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-3"
        label="Last Name:"
        label-for="input-3"
        v-if="form.register == true"
      >
        <b-form-input id="input-3" v-model="form.lastName" placeholder="Enter your last name"></b-form-input>
      </b-form-group>
      <label for="text-password">Password</label>
      <b-input
        v-model="form.password"
        class="mb-2"
        type="password"
        id="text-password"
        aria-describedby="password-help-block"
        placeholder="Enter password"
      ></b-input>
      <div class="row justify-content-center">
        <b-button type="submit" variant="primary" v-if="form.register == true">Sign Up</b-button>
        <b-button type="submit" variant="primary" v-if="form.register == false">Sign In</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </div>
      <div class="row justify-content-end mt-3">
        <div class="col-6">
          <!-- <div class="g-signin2"></div> -->
          <div id="my-signin2"></div>
          <!-- <gsignin></gsignin> -->
          <!-- <g-signin-button :params="param"></g-signin-button> -->
          <a href="#" v-on:click="signOut();">Sign out</a>
        </div>
        <div class="col-6">
          <p
            class="already"
            v-on:click="changeAttempt"
            v-if="form.register"
          >Already have an account? Click me</p>
          <p
            class="already"
            v-on:click="changeAttempt"
            v-if="form.register == false"
          >Back to register</p>
        </div>
      </div>
    </b-form>
  </div>
</template>

<script>
import gsignin from "./gSignButton";
import axios from "axios";
export default {
  name: "UserPage",
  components: {
    gsignin
  },
  data() {
    return {
      form: {
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        register: true,
        param: {
          client_id:
            "885358018440-gprtot1dl0975m0ertfs9q5g8ghgpe93.apps.googleusercontent.com"
        }
      },
      show: true,
      baseUrl: "http://localhost:3000"
    };
  },
  methods: {
    signOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function() {
        console.log("User signed out.");
      });
    },
    onSuccess(googleUser) {
      let url = this.baseUrl;
      console.log("hai");
      console.log("Logged in as: " + googleUser.getBasicProfile().getName());
      let firstName = googleUser.getBasicProfile().getName();
      const id_token = googleUser.getAuthResponse().id_token;
      axios({
        method: "POST",
        url: `${url}/google`,
        data: {
          idtoken: id_token,
          firstName
        }
      }).then(user => {
        localStorage.setItem("token", user.data.token);
        localStorage.setItem("idUser", user.data.user._id);
        this.$emit("login", "login");
      });
    },
    onFailure(error) {
      console.log(error);
    },
    renderButton() {
      gapi.signin2.render("my-signin2", {
        scope: "profile email",
        width: 200,
        height: 50,
        longtitle: false,
        theme: "dark",
        onsuccess: this.onSuccess,
        onfailure: this.onFailure
      });
    },
    changeAttempt() {
      if (this.form.register == true) {
        this.form.register = false;
      } else {
        this.form.register = true;
      }
    },

    onSubmit(evt) {
      evt.preventDefault();
      let base = this.baseUrl;
      let firstName = this.form.firstName;
      let lastName = this.form.lastName;
      let password = this.form.password;
      let email = this.form.email;
      //   alert(JSON.stringify(this.form));
      if (this.form.register == true) {
        axios({
          method: "POST",
          url: `${base}/register`,
          data: {
            firstName,
            lastName,
            password,
            email
          }
        })
          .then(userTerdaftar => {
            localStorage.setItem("token", userTerdaftar.data.token);
            localStorage.setItem(
              "idUser",
              userTerdaftar.data.userTerdaftar._id
            );
            this.$emit("login", "login");
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        axios({
          method: "POST",
          url: `${base}/login`,
          data: {
            email,
            password
          }
        })
          .then(userLogged => {
            localStorage.setItem("token", userLogged.data.token);
            localStorage.setItem("idUser", userLogged.data.userFound._id);
            this.$emit("login", "login");
          })
          .catch(err => {
            console.log(err, "ini errnya");
          });
      }
    },
    onReset(evt) {
      evt.preventDefault();
      this.form.email = "";
      this.form.firstName = "";
      this.form.lastName = "";
      this.form.password = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  },
  mounted() {
    this.renderButton();
  }
};
</script>


<style scoped>
.center {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  padding: 20px;
  border: 3px solid lightgray;
  border-radius: 10px;
}

.already {
  color: blue;
  text-align: end;
}

.already:hover {
  cursor: pointer;
}
</style>