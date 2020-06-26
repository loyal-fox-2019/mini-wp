<template>
    <nav class="navbar navbar-expand-md navbar-light bg-light">
        <a class="navbar-brand" href="#">Mini WordPress</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navContent" aria-controls="navContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item active" v-if="isLogin">
                    <a class="nav-link" href="#/Articles">Articles <span class="sr-only">(current)</span></a>
                </li>
            </ul>
            <!-- Jika sudah login -->
            <ul class="navbar-nav ml-auto" v-if="isLogin">
                <li class="nav-item">
                    <a class="nav-link" href="#">Logout <span class="sr-only">(current)</span></a>
                </li>
            </ul>
            <ul class="navbar-nav ml-auto" v-else>
                <li class="nav-item">
                    <a class="nav-link" href="#/login">Login <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#/register">Register <span class="sr-only">(current)</span></a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: "Navbar",
    created: function() {
        
    },
    data: function() {
        return {
        }
    },
    methods: {
    },
    props: ["isLogin"]
}
</script>