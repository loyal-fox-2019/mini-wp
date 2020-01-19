<template>
  <div>
      <nav id="header" class="fixed w-full bg-black top-0 text-white">

        <div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
                
            <div class="pl-4 flex items-center">
                <a class="toggleColour text-white no-underline hover:no-underline font-bold text-lg lg:text-3xl" @click.prevent="$emit('showForm','content')"  href="#"> 
                    <!--Icon from: http://www.potlabicons.com/ -->
                    MINI WORDPRESS
                </a>
            </div>

            <div class="block sm:hidden pr-4">
                <button id="nav-toggle" class="flex items-center p-1 text-orange-800 hover:text-gray-900">
                    <svg class="fill-current text-white h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Menu</title><path d="M16.4 9H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1zm0 4H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1zM3.6 7h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1z"/></svg>
                </button>
            </div>

            <div v-if="login" class="w-full flex-grow sm:flex sm:items-center sm:w-auto hidden sm:block mt-2 sm:mt-0 bg-white sm:bg-transparent text-black p-4 sm:p-0 z-20" id="nav-content">
                <ul class="list-reset sm:flex justify-end flex-1 items-center">
                    <li class="mr-3">
                        <a class="inline-block py-2 px-4 text-white font-bold no-underline hover: cursor-pointer" @click.prevent="$emit('showForm','form')">Add Article</a>
                    </li>
                    <li class="mr-3">
                        <a class="inline-block py-2 px-4 text-white font-bold no-underline hover: cursor-pointer" @click.prevent="$emit('showForm','user-favorites')">Your Favorites</a>
                    </li>
                    <li class="mr-3">
                        <a class="inline-block text-white font-bold no-underline hover:text-gray-600 hover:text-underline py-2 px-4" href="#" @click.prevent="$emit('showForm','profile-page')">Profile</a>
                    </li>
                </ul>
                <!-- <button id="navAction" class="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-lg mt-4 lg:mt-0 p-2 shadow opacity-75">Action</button> -->
            </div>
    	</div>
	
	    <hr class="border-b border-gray-100 opacity-25 my-0 py-0" />
    </nav>

  </div>
</template>

<script>
export default {
    props: ['isLogin'],
    created(){
        if(localStorage.getItem('access_token')) this.login = true
        else this.login = false
    },
    data() {
        return {
            login:false
        }
    },
    watch: {
        isLogin(n,o){
            this.login = n
        }
    }
}
</script>

<style>

</style>