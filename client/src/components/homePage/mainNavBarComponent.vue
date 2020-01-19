<template>
    <div id="mainNavBar" class="ui inverted segment">
        <div class="ui inverted main menu">
            <sui-menu-item name="username">
                <i class="user icon"></i>
                {{ name }}
            </sui-menu-item>
            <sui-menu-item position="right" active link id="signOut" @click="signOut">
                <i class="lock icon"></i>
                Sign Out
            </sui-menu-item>
        </div>
    </div>
</template>

<script>
    export default {
        name: "mainNavbar",
        props: {
            name: String
        },
        methods: {
            signOut: function () {
                this.$gAuth.signOut()
                    .then(() => {
                        // things to do when sign-out succeeds
                        localStorage.clear();
                        location.reload();
                        this.$toast.success({
                            title: 'Success Sign Out',
                            message: 'successfully sign Out, hope 2 c u again :)'
                        });
                    })
                    .catch(error => {
                        // things to do when sign-out fails
                        console.log(error);
                        this.$toast.error({
                            title: 'Error Sign Out',
                            message: error
                        });
                    });
            }
        }
    }
</script>

<style scoped>
    .ui {
        background-color: #3498db !important;
    }

    #signOut {
        float: right;
    }
</style>