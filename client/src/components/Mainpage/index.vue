<template>
    <div>
        <Navbar @isLogout="logoutUser"></Navbar>
        <div class="row mainbody">
            <Sidebar @switchTab="switchTab"></Sidebar>
            <Content :tabToShow="newTab" @switchTab="switchTab"></Content>
        </div>
    </div>
</template>

<script>
    import Navbar from "./navbar"
    import Sidebar from "./sidebar"
    import Content from "./content"
    export default {
        name: "Mainpage",
        data() {
            return {
                newTab: ""
            }
        },
        methods: {
            logoutUser() {
                this.$emit("isLogout");
            },
            switchTab(el) {
                console.log("parent received:",el)
                this.newTab = el;
            }
        },
        components: {
            Navbar,
            Sidebar,
            Content
        }
    }
</script>

<style scoped>
.mainbody {
    width: 100%;
    display: flex;
    align-items: stretch; 
}
</style>