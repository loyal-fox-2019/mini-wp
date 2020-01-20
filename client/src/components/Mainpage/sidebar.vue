<template>
    <div class="side-bar col-2">
        <div>
            <ul>
                <li class="list-heading">General</li>
                <li>
                    <a href="#" id="view-site" class="sidebar-link" @click="switchTab('allArticles')">
                        <span class="fa fa-desktop"></span> Read articles
                    </a>
                </li>
                <li>
                    <a href="#" id="stats" class="sidebar-link">
                        <span class="far fa-chart-bar"></span> Stats
                    </a>
                </li>
                <li>
                    <a href="#" id="activity" class="sidebar-link">
                        <span class="fa fa-history"></span> Activity
                    </a>
                </li>
                
                <li class="list-heading">Manage</li>
                <li>
                    <a href="#" id="pages" class="sidebar-link" @click="switchTab('newArticle')">
                        <span class="far fa-file-alt"></span> New article
                    </a>
                </li>
                <li>
                    <a href="#" id="blog-posts" class="sidebar-link" @click="switchTab('articleList')">
                        <span class="far fa-newspaper"></span> My articles
                    </a>
                </li>
                <li>
                    <a href="#" id="media" class="sidebar-link">
                        <span class="far fa-image"></span> Media
                    </a>
                </li>
                <li>
                    <a href="#" id="comments" class="sidebar-link">
                        <span class="far fa-comments"></span> Comments
                    </a>
                </li>
                

                <li class="list-heading">Personalise</li>
                <li>
                    <a href="#" id="customise" class="sidebar-link">
                        <span class="fas fa-cogs"></span> Customise
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Sidebar",
        methods: {
            switchTab(el){
                this.$emit("switchTab",el)
            }
        }
    }
</script>

<style scoped>
.side-bar {
    background: rgb(68, 116, 248);
    height: calc(100vh - 50px);
    position: sticky;   
    overflow-y: auto;
}

.side-bar ul li {
    list-style-type: none;
    padding-left: 15px;
    padding-top: 5px;
}

.side-bar ul li.list-heading {
    padding-left: 0px !important;
}

.side-bar ul li a {
    text-decoration: none;
    color: white;
}

.side-bar ul li a:hover {
    color: black;
    transition-duration: 500ms;
}

.side-bar ul li.active a {
    color: rgb(0, 0, 168);
}
</style>