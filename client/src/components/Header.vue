<template>
    <div>
       <div class="header">
            <nav class="navbar navbar-expand-lg">
                <div class="container-fluid">
                    <div class="navbar-nav">
                        <a class="navbar-brand active" id="logo" href="#"><i class="fab fa-wordpress-simple"></i> Personary</a>
                    </div>
                    <div class="justify-content-end" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                            <button class="nav-item nav-link btn" @click.prevent="$emit('logout', true)">Logout</button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header',
    
}
</script>

<style lang="css" scoped>
    .navbar{
        padding: 0;
        margin: 0;
        background: #fdcb6e !important;
    }
    .navbar a{
        color: black !important;
        font-weight: 700;
        font-size: 24px;
    }
    .navbar-nav button{
        border: 2px solid #fdcb6e !important;
        background: #000;
        color: #fdcb6e;
        padding: 10px 20px 10px 20px !important;
        width: 100%;
    }
    .navbar-nav button:hover{
        border: 2px solid black !important;
        background: transparent;
        color: black;
        padding: 10px 20px 10px 20px;
        width: 100%;
    }

</style>