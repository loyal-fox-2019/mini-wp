<template>
    <div class="divIdentifier">
        <h3 class="elementIdentifier">component navbar</h3>

        <nav class="navbar navbar-expand-lg navbar-light bg-light javNavbar">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                <a class="navbar-brand" href="#" @click.prevent="$emit('backToHome', 'contentPage')">mini WP</a>
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li class="nav-item active">
                        <a class="nav-link" href="#" @click.prevent="$emit('myArticles', loggedInUserDetail._id)">my articles<span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" @click.prevent="changePage($emit('createArticle'))">+New</a>
                    </li>
                </ul>
                <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
                <!-- <div style="margin-left:8px">
                    <button class="btn btn-secondary" >Log Out</button>
                </div> -->
            </div>

            <!-- start of 'user dropdown' -->
                <div style="margin-left:8px">
                    <ul class="navbar-nav mr-auto" style="margin-right:10%">
                    <li class="nav-item dropdown">
                        <div class="btn-group">
                            <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {{ loggedInUserDetail.username }}
                            </button>
                            <div class="dropdown-menu dropdown-menu-right">
                                <button class="dropdown-item" type="button" @click.prevent="$emit('userProfile')">edit Profile</button>
                                <div class="dropdown-divider"></div>
                                <button class="dropdown-item" type="button" @click.prevent="logOut">Log Out</button>
                            </div>
                        </div>
                    </li>
                    </ul>
                </div>
                <!-- end of 'user dropdown' -->




        </nav>

    </div>


</template>




<script>
import Swal from 'sweetalert2'

export default {
    name: 'navBar',
    props:[
        'loggedInUserDetail'
    ],
    methods:{
        logOut(){
            Swal.fire({
                title: 'Confirmation Needed',
                text: 'You\'re about to be logged out',
                showCancelButton: true,
                confirmButtonText: 'confirm'
            })
            .then(result=>{
                if(result.value)
                  {
                      localStorage.clear()
                      this.$emit('logOut', false)
                  }
            })
            
        }
    }



}
</script>





<style scoped>
.javNavbar{
    position: static;
    /* position: sticky; */
    /* position: absolute; */
    /* position: fixed; */
    top: 0;

}


</style>