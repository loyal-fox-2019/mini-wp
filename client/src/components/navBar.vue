<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-primary" id="navBarMiniWP" >
        <a class="navbar-brand" href="#">
            <img src="../../assets/Wordpress_logo_8.png" alt="Wordpress Logo" id="wpLogo"><span class="text-white ml-3">Mini Word Press</span>&nbsp;&nbsp;&nbsp;<span>{{ email }}</span>
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item active">
                </li>
                <li class="nav-item my-1">
                </li>
            </ul>
        </div>
    </nav>  
</template>

<script>
export default {
    props: ['email']
}
</script>

<style scoped>
#navBarMiniWP {
    padding-top: 0;
    padding-bottom: 0;
}
#wpLogo {
    width: 40px;
}

</style>