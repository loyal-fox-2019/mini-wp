<template>
  <nav class="col-md-2 d-none d-md-block bg-light sidebar" id="mySites">
                    <div class="sidebar-sticky custom-sidebar">
                        <ul class="nav flex-column custom-main-sidebar custom-sidebar-items" v-if="sideStat=='articles'">
                            <li class="nav-item">
                                <div class="row custom-nav-row">
                                    <div class="col-sm" @click="subMenuButton('myArticles')">
                                        <p class="custom-nav-li" href="#">
                                            <i class="fas fa-scroll"></i> My Articles
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <ul class="nav flex-column custom-main-sidebar custom-sidebar-items" v-if="sideStat=='reader'">
                            <li class="nav-item">
                                <div class="row custom-nav-row">
                                    <div class="col-sm" @click="subMenuButton('discoverArticles')">
                                        <p class="custom-nav-li" href="#">
                                            <i class="fas fa-globe-asia"></i> Discover
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li class="nav-item">
                                <div class="row custom-nav-row">
                                    <div class="col-sm" @click="subMenuButton('findTags')">
                                        <p class="custom-nav-li" href="#">
                                            <i class="fas fa-tags"></i> Search Tags
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li class="nav-item">
                                <div class="row custom-nav-row">
                                    <div class="col-sm" @click="subMenuButton('findAuthors')">
                                        <p class="custom-nav-li" href="#">
                                            <i class="fas fa-feather-alt"></i> Search Authors
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
</template>

<script>
import Axios from 'axios'
export default {
    name: 'SideBar',
    data(){
        return {
            subMenu : ''
        }
    },
    props: ['sideStat'],
    methods: {
        subMenuButton(subName){
            this.subMenu = subName
            let content = this.subMenu
            let target
            if(content!='myArticles'){
                target = ''
            }else{
                target = 'myArticles/'
            }
            Axios({
                method: 'get',
                url: 'http://35.247.164.26:3000/articles/'+target,
                headers:{
                    token: localStorage.getItem('token')
                }
            })
            .then(({ data })=>{
                data.forEach(element => {
                    if(element.status==true){
                        element.status = 'Public'
                    }else if(element.status==false){
                        element.status = 'Private'
                    }
                });
                this.$emit('subMenuToggle', {sub:content, articleDatas:data})
            })
            .catch(err=>{
                Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to retrieve data'
          })
            })
            
        }
    }
}
</script>

<style>
        #mySites {
            padding: 0;
        }

        .custom-sidebar {
            background-color: #4d648d;
            overflow-y: scroll;
            overflow-x: hidden;
            padding: 10px 20px;
            height: 90vh;
        }
        .custom-main-sidebar {
            margin-top: 1rem;
            border-top: #C7F2FF solid 2px;
            margin-bottom: 1rem
        }

        .custom-sidebar-items {
            font-size: 1.3rem;
        }

        .custom-nav-li {
            padding: 0;
            color: #C7F2FF;
            margin-bottom: 0.5rem;
            margin-top: 0.5rem;
        }

        .custom-nav-label {
            color: #283655;
            margin-bottom: 5px;
            margin-top: 5px;
        }

        .custom-nav-row {
            height: 54px;
            cursor: pointer;
        }

        .custom-nav-row:hover {
            background-color: #032470;
        }

        .custom-nav-li:hover {
            background-color: #032470;
        }

        .side-add-button {
            margin-top: 50px;
            font-size: 30px;
        }
</style>