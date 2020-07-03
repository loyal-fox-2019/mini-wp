<template>
  <div class="container" id="container">
	<div class="form-container sign-up-container">
		<form @submit.prevent="register" action="#">
			<h1>Create Account</h1>
			<input class="rounded-lg" v-model="name" type="text" placeholder="Name" />
			<input class="rounded-lg" v-model="email" type="email" placeholder="Email" />
			<input class="rounded-lg" v-model="password" type="password" placeholder="Password" />
			<button>Register</button>
		</form>
	</div>
	<div class="form-container sign-in-container">
		<form action="#">
			<h1>Sign in</h1>
			<div class="social-container">
				<g-signin-button
					class="cursor-pointer bg-blue-400 hover:bg-blue-600 text-white rounded-lg border font-bold py-2 px-4 rounded ml-4"
					:params="googleSignInParams"
					@success="onSignInSuccess"
					@error="onSignInError">
					Sign in with Google
				</g-signin-button>
				<!-- <a href="#" class="social"><svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/></svg></i></a>
				<a href="#" class="social"><svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z"/></svg></a>
				<a href="#" class="social"><svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.917 16.083c-2.258 0-4.083-1.825-4.083-4.083s1.825-4.083 4.083-4.083c1.103 0 2.024.402 2.735 1.067l-1.107 1.068c-.304-.292-.834-.63-1.628-.63-1.394 0-2.531 1.155-2.531 2.579 0 1.424 1.138 2.579 2.531 2.579 1.616 0 2.224-1.162 2.316-1.762h-2.316v-1.4h3.855c.036.204.064.408.064.677.001 2.332-1.563 3.988-3.919 3.988zm9.917-3.5h-1.75v1.75h-1.167v-1.75h-1.75v-1.166h1.75v-1.75h1.167v1.75h1.75v1.166z"/></svg></a> -->
			</div>
			<span>or use your account</span>
			<input class="rounded-lg" v-model="email" type="email" placeholder="Email" />
			<input class="rounded-lg" v-model="password" type="password" placeholder="Password" />
			<a href="#">Forgot your password?</a>
			<button @click.prevent="signin">Sign In</button>
		</form>
	</div>
	<div class="overlay-container">
		<div class="overlay">
			<div class="overlay-panel overlay-left">
				<h1>Welcome Back!</h1>
				<p>To keep connected with us please sign in with your personal info</p>
				<button @click="toSignIn" class="ghost rounded-lg" id="signIn">Sign In</button>
			</div>
			<div class="overlay-panel overlay-right">
				<h1>Welcome to Mini-WP!</h1>
				<p>Enter your personal details and start journey with us</p>
				<button @click="toRegister" class="ghost rounded-lg" id="signUp">Register</button>
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
  name: "LandingPage",
  data() {
    return {
      email: "",
      password: "",
			name: "",
			googleSignInParams: {
        client_id: '404918784180-jir4pb7om35jpq51bqekldnnoht6v19b.apps.googleusercontent.com'
      }
    }
  },
  methods: {
    signin: function() {
      this.$axios.post('users/signin', {
				email: this.email,
				password: this.password
      })
        .then(({ data }) => {
					localStorage.setItem('access_token', data.access_token)
					localStorage.setItem('name', data.name)
					localStorage.setItem('image', data.image)
					localStorage.setItem('id', data.id)
					this.$emit('checkUser')
          Swal.fire({
            title: 'Success!',
            text: 'Successfully signed in!',
            icon: 'success',
            confirmButtonText: 'Close'
					})
        })
        .catch(err => {
          Swal.fire({
            title: 'Error!',
            text: err,
            icon: 'error',
            confirmButtonText: 'Close'
          })
        })
        .finally(() => {
          this.resetForm()
        })
    },
    register: function() {
      this.$axios.post('users/register', {
				name: this.name,
				email: this.email,
				password: this.password
      })
        .then(({ data }) => {
					localStorage.setItem('access_token', data.access_token)
					localStorage.setItem('name', data.name)
					localStorage.setItem('image', data.image)
					localStorage.setItem('id', data.id)
					this.$emit('checkUser')
          Swal.fire({
            title: 'Success!',
            text: 'Profile successfully created!',
            icon: 'success',
            confirmButtonText: 'Close'
					})
        })
        .catch(({err}) => {
         	Swal.fire({
            title: 'Error!',
            text: err,
            icon: 'error',
            confirmButtonText: 'Close'
          })
        })
        .finally(() => {
          this.resetForm()
        })
    },
    toRegister: function() {
      const container = document.getElementById('container')
			container.classList.add("right-panel-active");
			this.resetForm()
    },
    toSignIn: function() {
      const container = document.getElementById('container')
      container.classList.remove("right-panel-active")
			this.resetForm()
		},
    resetForm: function() {
      this.name = ''
      this.email = ''
      this.password = ''
		},
		onSignInSuccess (googleUser) {
			const id_token = googleUser.getAuthResponse().id_token;
			this.$axios.post('users/googleSignIn', {
				id_token
      })
				.then(({ data }) => {
					localStorage.setItem('access_token', data.access_token)
					localStorage.setItem('name', data.name)
					localStorage.setItem('image', data.image)
					localStorage.setItem('id', data.id)
					this.$emit('checkUser')
          Swal.fire({
            title: 'Success!',
            text: 'Successfully signed in!',
            icon: 'success',
            confirmButtonText: 'Close'
					})
				})
				.catch(function (err) {
					Swal.fire({
            title: 'Error!',
            text: err,
            icon: 'error',
            confirmButtonText: 'Close'
          })
				})
    },
    onSignInError (error) {
      console.log('OH NOES', error)
    }
  }
}
</script>

<style scoped>
  body {
    background: #f6f5f7;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: 'Montserrat', sans-serif;
    height: 100vh;
    margin: -20px 0 50px;
}

h1 {
	font-weight: bold;
	margin: 0;
}

h2 {
	text-align: center;
}

p {
	font-size: 14px;
	font-weight: 100;
	line-height: 20px;
	letter-spacing: 0.5px;
	margin: 20px 0 30px;
}

span {
	font-size: 12px;
}

a {
	color: #333;
	font-size: 14px;
	text-decoration: none;
	margin: 15px 0;
}

button {
	border-radius: 20px;
	border: 1px solid dodgerblue;
	background-color: dodgerblue;
	color: #FFFFFF;
	font-size: 12px;
	font-weight: bold;
	padding: 12px 45px;
	letter-spacing: 1px;
	text-transform: uppercase;
	transition: transform 80ms ease-in;
}

button:active {
	transform: scale(0.95);
}

button:focus {
	outline: none;
}

button.ghost {
	background-color: transparent;
	border-color: #FFFFFF;
}

form {
	background-color: #FFFFFF;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 50px;
	height: 100%;
	text-align: center;
}

input {
	background-color: #eee;
	border: none;
	padding: 12px 15px;
	margin: 8px 0;
	width: 100%;
}

.container {
  margin: 4% auto;
	background-color: #fff;
	border-radius: 15px;
  	box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
			0 10px 10px rgba(0,0,0,0.22);
	position: relative;
	overflow: hidden;
	width: 768px;
	max-width: 100%;
	min-height: 480px;
}

.form-container {
	position: absolute;
	top: 0;
	height: 100%;
	transition: all 0.6s ease-in-out;
}

.sign-in-container {
	left: 0;
	width: 50%;
	z-index: 2;
}

.container.right-panel-active .sign-in-container {
	transform: translateX(100%);
}

.sign-up-container {
	left: 0;
	width: 50%;
	opacity: 0;
	z-index: 1;
}

.container.right-panel-active .sign-up-container {
	transform: translateX(100%);
	opacity: 1;
	z-index: 5;
	animation: show 0.6s;
}

@keyframes show {
	0%, 49.99% {
		opacity: 0;
		z-index: 1;
	}
	
	50%, 100% {
		opacity: 1;
		z-index: 5;
	}
}

.overlay-container {
	position: absolute;
	top: 0;
	left: 50%;
	width: 50%;
	height: 100%;
	overflow: hidden;
	transition: transform 0.6s ease-in-out;
	z-index: 100;
}

.container.right-panel-active .overlay-container{
	transform: translateX(-100%);
}

.overlay {
	background: steelblue;
	background: -webkit-linear-gradient(to right,royalblue, dodgerblue);
	background: linear-gradient(to right, dodgerblue, #3ba1ea);
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 0 0;
	color: #FFFFFF;
	position: relative;
	left: -100%;
	height: 100%;
	width: 200%;
  	transform: translateX(0);
	transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  	transform: translateX(50%);
}

.overlay-panel {
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 40px;
	text-align: center;
	top: 0;
	height: 100%;
	width: 50%;
	transform: translateX(0);
	transition: transform 0.6s ease-in-out;
}

.overlay-left {
	transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
	transform: translateX(0);
}

.overlay-right {
	right: 0;
	transform: translateX(0);
}

.container.right-panel-active .overlay-right {
	transform: translateX(20%);
}

.social-container {
	margin: 20px 0;
}

.social-container a {
	border: 1px solid #DDDDDD;
	border-radius: 50%;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	margin: 0 5px;
	height: 40px;
	width: 40px;
}

footer {
    background-color: #222;
    color: #fff;
    font-size: 14px;
    bottom: 0;
    position: fixed;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 999;
}

footer p {
    margin: 10px 0;
}

footer i {
    color: red;
}

footer a {
    color: #3c97bf;
    text-decoration: none;
}

/* .g-signin-button {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
} */

</style>