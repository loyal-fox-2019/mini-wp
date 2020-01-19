<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#" id="">Mini WordPress</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <span class="navbar-text">
                    Welcome, {{username}}
                    </span>
                </li>
                </ul>
                
                <span class="navbar-text">
                    <a class="nav-link" href="#" id="logout" @click="logoutUser">Logout</a>
                </span>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "Navbar",
        data() {
            return {
                username: this.$cookies.get("username")
            }
        },
        methods: {
            logoutUser() {
                this.$cookies.remove("token");
                this.$cookies.remove("username");
                this.$emit("isLogout");
            }
        }
    }
</script>

<style scoped>
.navbar {
    height: 50px;
}

.nav-link:hover {
    color: black;
}
</style>