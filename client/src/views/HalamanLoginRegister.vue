<template>
  <div>
    <!--/start-login-->
    <div class="login-01" v-if="whatToShow === 'login'">
      <div class="two-login hvr-float-shadow">
        <div class="two-login-head">
          <img src="../assets/images/top-lock.png" alt />
          <h1>LOGIN</h1>
        </div>
        <form @submit.prevent="signin">
          <li>
            <input v-model="email" type="text" class="text" placeholder="Email" />
            <a href="#" class="icon2 mail"></a>
          </li>
          <li>
            <input v-model="password" type="password" placeholder="Password" />
            <a href="#" class="icon2 lock2"></a>
          </li>
          <div class="p-container">
            <div class="clear"></div>
          </div>
          <div class="submit two">
            <input type="submit" value="SIGN IN" />
          </div>
          <div class="social-icons">
            <p>Or you can Login with one of the following</p>
            <ul class="soc_icons2">
              <li class="pic">
                <div class="g-signin2" data-onsuccess="onSignIn"></div>
              </li>
              <div class="clear"></div>
            </ul>
          </div>
          <h5>
            Don't have an account ?
            <a @click="whatToShow = 'register'">Sign Up</a>
          </h5>
        </form>
      </div>
    </div>

    <!--/start-register-two-->
    <div class="register" v-if="whatToShow === 'register'">
      <div class="two-login hvr-float-shadow">
        <div class="two-login-head">
          <img src="../assets/images/top-note.png" alt />
          <h2>register</h2>
        </div>
        <form @submit.prevent="signup">
          <li>
            <input v-model="username" type="text" class="text" placeholder="Username" />
            <a href="#" class="icon2 user2"></a>
          </li>
          <li>
            <input v-model="password" type="password" placeholder="Password" />
            <a href="#" class="icon2 lock2"></a>
          </li>
          <li>
            <input v-model="email" type="text" class="text" placeholder="E-mail" />
            <a href="#" class="icon2 mail"></a>
          </li>
          <div class="p-container"></div>
          <div class="submit two">
            <input type="submit" value="SIGN UP" />
          </div>
          <h5>
            Already a member ?
            <a @click="whatToShow = 'login'">Login Here</a>
          </h5>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "HalamanLoginRegister",
  data() {
    return {
      whatToShow: "login",
      email: "",
      password: "",
      username: ""
    };
  },
  methods: {
    signup() {
      axios({
        url: "http://localhost:3000/users/register",
        method: "POST",
        data: {
          email: this.email,
          password: this.password,
          username: this.username
        }
      })
        .then(({ data, token }) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("id", data.user._id);
          localStorage.setItem("username", data.user.username);
          localStorage.setItem("email", data.user.email);
          this.$root.clearLoginRegister;
          this.$emit("checkLogin");
          Swal.fire(
            "Welcome Back",
            "Success Login " + data.user.username,
            "success"
          );
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "message : " + err.message
          });
        });
    },
    signin() {
      axios({
        url: "http://localhost:3000/users/login",
        method: "POST",
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("id", data._id);
          localStorage.setItem("username", data.username);
          localStorage.setItem("email", data.email);
          this.$root.clearLoginRegister;
          this.$emit("checkLogin");
          Swal.fire(
            "Welcome Back",
            "Success Login " + data.username,
            "success"
          );
        })
        .catch(err => {
          if (this.email || this.password === null) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "please fill email/password"
            });
          }
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.message
          });
        });
    },
    googleLogin(googleUser) {
      var profile = googleUser.getBasicProfile();
      const idToken = googleUser.getAuthResponse().id_token;
      axios({
        url: `http://localhost:3000/users/login/google`,
        method: "POST",
        data: { idToken }
      })
        .then(response => {
          localStorage.setItem("token", response.accessToken);
          localStorage.setItem("_id", response.user._id);
          localStorage.setItem("email", response.user.email);
          localStorage.setItem("login", "google");
          this.$emit("checkLogin");
          Swal.fire(
            "Welcome Back",
            "Success Login " + response.user.fullname,
            "success"
          );
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.message
          });
        });
    }
  }
};
</script>

<style scoped>
form {
  padding: 12% 9%;
}
form li {
  border: none;
  list-style: none;
  margin-bottom: 25px;
  width: 100%;
  background: #dfdfdf;
}
input[type="text"],
input[type="password"] {
  width: 60%;
  padding: 0.8em 4em 0.8em 1.7em;
  color: #858282;
  font-size: 17px;
  outline: none;
  background: none;
  font-weight: 500;
  border: none;
}
/*----------*/
.p-container {
  margin-top: 1em;
}
.social-icons p {
  color: #898989;
  font-size: 17px;
  text-align: center;
  padding-top: 20px;
}
ul.soc_icons2 {
  text-align: center;
  padding: 12px 0;
}
ul.soc_icons2 li.pic {
  background: none;
  display: inline-block;
  width: 24%;
  margin: 0;
}
ul.soc_icons2 li.pic i {
  width: 68px;
  height: 68px;
  display: inline-block;
  background: url("../assets/images/icon.png") no-repeat 0px 0px;
  vertical-align: middle;
  -webkit-transition: 0.8s;
  -moz-transition: 0.8s;
  -o-transition: 0.8s;
  transition: 0.8s;
}
ul.soc_icons2 li.pic i:hover {
  border-top-left-radius: 3em;
  -o-border-top-left-radius: 3em;
  -moz-border-top-left-radius: 3em;
  -webkit-border-top-left-radius: 3em;
}
ul.soc_icons2 li.pic a:hover {
  text-decoration: none;
}
ul.soc_icons2 li.pic a i.icon_4 {
  background-position: -106px 4px;
}
ul.soc_icons2 li.pic a i.icon_5 {
  background-position: -204px 4px;
}
ul.soc_icons2 li.pic a i.icon_6 {
  background-position: -302px 4px;
}

.two-login-head {
  background: #087afc;
  padding: 1em 1em;
  text-align: center;
  position: relative;
}
.two-login-head h2 {
  font-size: 2em;
  color: #fff;
  font-weight: 500;
  text-transform: uppercase;
}
.two-login h5,
.two-login h5 a {
  color: #848484;
  font-size: 16px;
}
.two-login h5 a {
  font-weight: 600;
}
.two-login h5 a:hover {
  text-decoration: underline;
}
.two-login {
  width: 28%;
  margin: 5% auto;
  background: #fff;
  text-align: center;
  border-bottom: 3px solid#1c817c;
}
.two-login-head h1 {
  font-size: 2em;
  color: #fff;
  font-weight: 500;
}
form.two {
  padding: 12% 9%;
}
form.two li {
  border: none;
  list-style: none;
  margin-bottom: 25px;
  width: 100%;
  background: #dfdfdf;
}
.register {
  margin-top: 9em;
}
.icon2 {
  height: 45px;
  width: 46px;
  display: block;
  float: left;
  margin: 1px -13px 0px 0px;
}

.user2 {
  background: url(../assets/images/icon2.png) no-repeat 0px -1px #702c91;
}
.lock2 {
  background: url(../assets/images/icon2.png) no-repeat -49px 0px #702c91;
}
.mail {
  background: url(../assets/images/icon2.png) no-repeat -99px 0px #702c91;
}
form.two input[type="text"],
form.two input[type="password"] {
  width: 60%;
  padding: 0.8em 4em 0.8em 1.7em;
  color: #858282;
  font-size: 17px;
  outline: none;
  background: none;
  font-weight: 500;
  border: none;
}
.submit.two {
  border: none;
  padding: 41px 0 20px 0;
}
.submit.two input[type="submit"] {
  font-size: 20px;
  font-weight: 400;
  color: #fff;
  cursor: pointer;
  outline: none;
  padding: 13px 10px;
  width: 100%;
  border: none;
  background: #087afc;
}
.submit.two input[type="submit"]:hover {
  background: #ffc50c;
}
.p-container a {
  color: #087afc;
  font-size: 15px;
}
.p-container a:hover {
  text-decoration: underline;
}
</style>