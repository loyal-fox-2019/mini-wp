<template>
  <div>
    <!--  -->
    <div class="form">
      <ul class="tab-group">
        <li :class="upButton">
          <a @click.prevent="changeForm('register', 'up')">Sign Up</a>
        </li>
        <li :class="inButton">
          <a @click.prevent="changeForm('login', 'in')">Log In</a>
        </li>
      </ul>

      <div class="tab-content">
        <div id="signup" v-if="formNow === 'register'">
          <h1>Sign Up for Free</h1>

          <form method="post" @submit.prevent="registerUser">
            <div class="top-row">
              <div class="field-wrap">
                <input
                  type="text"
                  autocomplete="off"
                  v-model="firstName"
                  placeholder="First Name*"
                  required
                />
              </div>

              <div class="field-wrap">
                <input type="text" autocomplete="off" v-model="lastName" placeholder="Last Name*" />
              </div>
            </div>

            <div class="field-wrap">
              <input type="email" autocomplete="off" v-model="email" placeholder="Email*" required />
            </div>

            <div class="field-wrap">
              <input
                type="password"
                autocomplete="off"
                v-model="password"
                placeholder="Password*"
                required
              />
            </div>

            <button type="submit" class="button button-block">Sign up</button>
          </form>
        </div>

        <div id="login" v-if="formNow === 'login'">
          <h1>Welcome Back!</h1>

          <form @submit.prevent="loginUser" method="post">
            <div class="field-wrap">
              <input type="email" autocomplete="off" v-model="email" placeholder="Email*" required />
            </div>

            <div class="field-wrap">
              <input
                type="password"
                autocomplete="off"
                v-model="password"
                placeholder="Password*"
                required
              />
            </div>

            <button type="submit" class="button button-block">Log In</button>
          </form>
        </div>
      </div>
      <!-- tab-content -->
    </div>
    <!-- /form -->
    <!--  -->
  </div>
</template>
  <!-- login register page -->
<script>
export default {
  name: "LoginRegister",
  data() {
    return {
      formNow: "login",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      inButton: "tab active",
      upButton: "tab"
    };
  },
  methods: {
    changeForm(which, whatActive) {
      this.formNow = which;
      if (whatActive == "in") {
        this.inButton = "tab active";
        this.upButton = "tab";
      } else if (whatActive == "up") {
        this.inButton = "tab";
        this.upButton = "tab active";
      }
    },
    registerUser() {
      let dataUser = {
        name: this.firstName + " " + this.lastName,
        email: this.email,
        password: this.password
      };
      this.axios
        .post("/users/register", dataUser)
        .then(({ data }) => {
          console.log(data);
          localStorage.setItem("token", data.token);
          this.$root.nowLogin = true;
        })
        .catch(({ response }) => {
          this.$swal.fire(response.data.message);
          console.log(response);
        });
    },
    loginUser() {
      let dataUser = {
        email: this.email,
        password: this.password
      };
      this.axios
        .post("/users/login", dataUser)
        .then(({ data }) => {
          console.log(data);
          this.$root.nowLogin = true;
          localStorage.setItem("token", data.token);
          this.$router.push({ path: "/home" })
        })
        .catch(({ response }) => {
          this.$swal.fire(response.data.message);
          console.log(response);
        });
    }
  },
  compute: {},
  beforeCreate() {
    if (localStorage.getItem("token")) this.$router.replace({ path: "/home" });
  }
};
</script>

<style scoped>
*,
*:before,
*:after {
  box-sizing: border-box;
}

html {
  overflow-y: scroll;
}

body {
  background: #c1bdba;
  font-family: "Titillium Web", sans-serif;
}

a {
  text-decoration: none;
  color: #1ab188;
  transition: 0.5s ease;
}
a:hover {
  color: #179b77;
}

.form {
  background: rgba(19, 35, 47, 0.9);
  padding: 40px;
  max-width: 600px;
  margin: 40px auto;
  border-radius: 4px;
  box-shadow: 0 4px 10px 4px rgba(19, 35, 47, 0.3);
}

.tab-group {
  list-style: none;
  padding: 0;
  margin: 0 0 40px 0;
}
.tab-group:after {
  content: "";
  display: table;
  clear: both;
}
.tab-group li a {
  display: block;
  text-decoration: none;
  padding: 15px;
  background: rgba(160, 179, 176, 0.25);
  color: #a0b3b0;
  font-size: 20px;
  float: left;
  width: 50%;
  text-align: center;
  cursor: pointer;
  transition: 0.5s ease;
}
.tab-group li a:hover {
  background: #179b77;
  color: #ffffff;
}
.tab-group .active a {
  background: #1ab188;
  color: #ffffff;
}

h1 {
  text-align: center;
  color: #ffffff;
  font-weight: 300;
  margin: 0 0 40px;
}

label {
  position: absolute;
  -webkit-transform: translateY(6px);
  transform: translateY(6px);
  left: 13px;
  color: rgba(255, 255, 255, 0.5);
  transition: all 0.25s ease;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  pointer-events: none;
  font-size: 22px;
}
label .req {
  margin: 2px;
  color: #1ab188;
}

label.active {
  -webkit-transform: translateY(50px);
  transform: translateY(50px);
  left: 2px;
  font-size: 14px;
}
label.active .req {
  opacity: 0;
}

label.highlight {
  color: #ffffff;
}

input,
textarea {
  font-size: 22px;
  display: block;
  width: 100%;
  height: 100%;
  padding: 5px 10px;
  background: none;
  background-image: none;
  border: 1px solid #a0b3b0;
  color: #ffffff;
  border-radius: 0;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}
input:focus,
textarea:focus {
  outline: 0;
  border-color: #1ab188;
}

textarea {
  border: 2px solid #a0b3b0;
  resize: vertical;
}

.field-wrap {
  position: relative;
  margin-bottom: 40px;
}

.top-row:after {
  content: "";
  display: table;
  clear: both;
}
.top-row > div {
  float: left;
  width: 48%;
  margin-right: 4%;
}
.top-row > div:last-child {
  margin: 0;
}

.button {
  border: 0;
  outline: none;
  border-radius: 0;
  padding: 15px 0;
  font-size: 2rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background: #1ab188;
  color: #ffffff;
  transition: all 0.5s ease;
  -webkit-appearance: none;
}
.button:hover,
.button:focus {
  background: #179b77;
}

.button-block {
  display: block;
  width: 100%;
}

.forgot {
  margin-top: -20px;
  text-align: right;
}
</style>