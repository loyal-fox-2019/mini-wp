<template>
    <div class="overflow-auto sidebar-sticky" id="sidebar">
        <div class="list-group">
            <div class="action">
                <span>Account</span>
            </div>
            <div id="account-menu">
                <a href="#" class="list-group-item list-group-item-action"><i class="fas fa-user-circle"></i><span>Account</span></a>
                <a href="#" class="list-group-item list-group-item-action"><i class="fas fa-chart-bar"></i><span>Stats</span></a>
                <a href="#" class="list-group-item list-group-item-action"><i class="fas fa-history"></i><span>Activity</span></a>
                <a href="#" class="list-group-item list-group-item-action"><i class="fas fa-money-check"></i><span>Plan</span></a>
            </div>
        </div>
        <div class="list-group">
            <div class="action">
                <span>Manage</span>
            </div>
            <div id="manage-menu">
                <a href="#" class="list-group-item list-group-item-action" @click.prevent="$emit('writePage', true)"><i class="fas fa-file"></i><span id="add-article">Write</span></a>
                <a href="#" class="list-group-item list-group-item-action" id="blog-post" @click.prevent="$emit('blogPost', true)"><i class="fas fa-newspaper"></i><span>Blog Posts</span></a>
                <a href="#" class="list-group-item list-group-item-action"><i class="fas fa-image"></i><span>Media</span></a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Sidebar',
    data() {
        return {
            
        }
    },
    methods: {
        
    },
}
</script>

<style lang="css" scoped>
    #sidebar{
        padding: 0 0 0 2vh;
        width: 100%;
        height: 100%;
    }
    .overflow-auto {   
        max-height: 85.4vh;
        min-height: 85.4vh;
        max-width: 100%;
        min-width: 80%;
    }

    .list-group {
        margin-top: 10px;
        margin-bottom: 10px;
        margin-right: 10px;
    }

    .list-group .action span{
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 10px;
    }

    .list-group h5{
        font-weight: 700;
    }

    .list-group a {
        border: none !important;
    }

    .list-group a span {
        margin-left: 10px;
        font-size: 20px;
        font-weight: 700;
    }

    span .badges {
        float: right;
        position: relative;
        margin-right: 0;
    }

    .nav .nav-item {
        width: 150px;
    }
</style>