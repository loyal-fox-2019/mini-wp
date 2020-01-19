<template>
    <div class="jumbotron jumbotron-fluid d-flex justify-content-center login m-0">
        <div class="card col-6 col-lg-4 bg-dark text-white p-5">
            <div class="card-body p-5">
                <h3 class="text-center">Login</h3>
                <form>
                    <div class="form-group">
                        <input class="form-control bg-transparent text-white border-top-0 border-left-0 border-right-0" type="email" placeholder="Email" required v-model="email">
                    </div>
                    <div class="form-group">
                        <input class="form-control bg-transparent text-white border-top-0 border-left-0 border-right-0" type="password" placeholder="Password" required v-model="password">
                    </div>
                    <div class="form-group text-center">
                        <button class="btn btn-success" @click="login">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Login",
    data: function() {
        return {
            email: null,
            password: null
        }
    },
    methods: {
        login() {
            axios({
                method: "post",
                url: "http://localhost:3000/login",
                data: {
                    email: this.email,
                    password: this.password
                }
            })
            .then(({data}) => {
                console.log(data);
                localStorage.setItem("token", data.token);
                this.$emit("loggedIn", true);
                this.$router.push("/");
            }).catch((err) => {
                console.error(err);
            });
        }
    }
}
</script>

<style scoped>
    .login {
        background-color: black;
        background-image: url("../assets/image/mushroom.jpg");
        background-size: cover;
        background-position: center;
        min-height: 100vh;
    }
    .login-img-card {
        background-image: url("https://via.placeholder.com/720x720");
        background-size: cover;
        background-position: center;
    }
</style>