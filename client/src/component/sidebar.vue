<template>
        <div class="col-md-2 d-none d-md-block bg-light mr-sm-2 sidebar">
            <nav>
                <div class="sidebar-sticky">      
                    <ul class="nav flex-column">
                        <li class="nav-item"><a class="nav-link" href="#" v-on:click="changePage('createArticle')"><i class="fas fa-clipboard-list"></i> Create Article</a></li>
                        <li class="nav-item"><a class="nav-link" href="#" v-on:click="changePage('listArticle')"><i class="fas fa-clipboard-list"></i> List Article</a></li>
                    </ul>
                    <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">properties</h6>
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                <i class="fab fa-intercom"></i>
                                Customize
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>   
</template>

<script>
export default {
    methods: {
        changePage(e){
            this.$emit('changePage', e)
        }
    }
}
</script>
