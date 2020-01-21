<template>
    <div class="col-3 sticky-top" id="colMenu">
        <span class="h3">Menu Navigation</span>
        <ul class="nav flex-column font-weight-bold">
            <li class="nav-item">
                <a class="nav-link" href="" @click.prevent="toPage('main')">Main</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="" @click.prevent="toPage('article')">Articles</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="" @click.prevent="toPage('about')">About</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="" @click.prevent="signOut">Sign Out</a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    methods: {
        signOut() {
            localStorage.removeItem('token');
            this.$emit('signOut');
            // location.reload();
        },
        toPage(page) {
            this.$emit('listPage', page);
        }
    }
}
</script>

<style scoped>
#colMenu {
    min-height: 740px;
}

</style>