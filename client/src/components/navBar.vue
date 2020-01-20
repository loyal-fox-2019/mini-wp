<template>
  <nav class="navbar navbar-expand-md navbar-fixed-top main-nav web-nav" id="cust-Navbar">
            <div class="left-nav navbar-brand" id="first-left-nav" v-if="logStat">
                <a class="navbar-brand cust-color" href='#' @click="siteBar" ><img id="web-logo" src="https://storage.googleapis.com/hacktiv8-miniwp-storage/Mini-WP%20Logo.png"
                        alt="Logo Here"> My
                    Sites</a>
            </div>
            <div class="left-nav" id="readerLink" v-if="logStat">
                <a class="nav-link cust-color" id="reader-link" href="#" @click="readerBar"><i class="far fa-newspaper"></i> Reader</a>
            </div>
            <ul class="nav navbar-nav mx-auto cust-color">
                <li v-if="logStat">Blog - Center</li>
                <li v-else><img id="web-logo" src="https://storage.googleapis.com/hacktiv8-miniwp-storage/Mini-WP%20Logo.png"
                        alt="Logo Here"></li>
            </ul>
            <ul class="nav navbar-nav" v-if="logStat">
                <li class="nav-item right-nav">
                    <button type="button" class="write" v-on:click="writeToggle" id="write-button"><i class="far fa-edit"></i>
                        write</button>
                </li>
                <li class="nav-item right-nav">
                    <b-nav-item-dropdown right>
                <template v-slot:button-content>
                    <a class="cust-color" href="#" id="userLogo"><i class="fas fa-user-circle nav-fas"></i></a>
                </template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item href="#" @click='userLogOut'>Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
                    
                </li>
                
            </ul>
        </nav>
</template>

<script>
export default {
    name: 'NavBar',
    props:['logStat'],
    data(){
        return {
            menu : 'articles',
            navSub : 'addArticle'
        }
    },
    methods:{
        siteBar(){
            this.menu = 'articles'
            let bar = this.menu
            // console.log(bar)
            this.$emit('sideBarToggle', bar)
        },
        readerBar(){
            this.menu = 'reader'
            let bar = this.menu
            // console.log(bar)
            this.$emit('sideBarToggle', bar)
        },
        writeToggle(){
            // console.log(this.navSub)
            this.$emit('subMenuToggle', this.navSub)
        },
        userLogOut(){
            localStorage.clear()
            this.$emit('loggedOut', true)
        }
    }
}
</script>

<style scoped>
        #web-logo {
            height: 6vh;
        }

        .cust-color {
            color: #d0e1f9
        }

        .web-nav {
            font-size: 1rem;
            padding: 0;
        }

        .write {
            background-color: #b1c0d4;
            padding: 5px 15px;
            border-radius: 8px;
            border: none;
            color: #283655
        }

        .write:hover {
            background-color: #1e1f26;
            color: #b1c0d4
        }

        #userLogo:hover {
            background-color: #1e1f26;
            color: #b1c0d4
        }

        .nav-fas {
            font-size: 2rem;
        }

        .right-nav {
            margin: auto 10px;
        }

        #reader-link {
            line-height: 2.2;
        }

        .left-nav:hover {
            background-color: #1e1f26;
        }

        #cust-Navbar {
            background-color: #283655;
            height: 7vh;
        }
        #first-left-nav {
            height: 100%;
        }
        #readerLink {
            font-size: 1rem;
        }
</style>