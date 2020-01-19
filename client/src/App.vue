<template>
    <div>
        <navbar @showForm="changePage" @logout="isLogin=false" :isLogin="isLogin"></navbar>
        <div v-if="!isLogin" class="flex border h-screen">
            <loginRegister class="mx-auto self-center" @register="isLogin=true"></loginRegister>
        </div>
        <div v-else class="mt-16 flex flex-col md:mt-20 md:flex-row">
            <div v-if="currentPage !== 'detail' && currentPage !== 'form' && currentPage !== 'profile-page'" class="visible w-8/12 self-center sm:visible md:hidden">
                <watchTags :tags="tags" @newArticles="newArticles"></watchTags>  
                <favorite></favorite>
            </div>
            
            <div v-if="currentPage === 'form'" class="w-full md:flex md:flex-col md:w-12/12 md:justify-center">
                <inputForm class="mx-auto" @addArticle="addArticle" @editArticle="newArticleList" :updateData="updateData" :toAdd="toAdd"></inputForm>
            </div>
            
            <div v-if="currentPage === 'content'" class="w-8/12 self-center md:flex flex-col md:w-8/12 mx-12">
                <div class="mt-1 mb-3" v-for="n in articles" :key="n._id">
                    <card @emitDetail="changePage" @addTag="addTag" :articleData="n" class="w-full"></card>
                </div>
            </div>

            <div v-if="currentPage === 'user-favorites'">
                <userFavorites></userFavorites>
            </div>

            <div v-if="currentPage === 'profile-page'" class="w-8/12 mx-auto">
                <profilePage @updateArticle="updateArticle" @logout="logout" @deleteArticle="deleteArticle" :showProfile="showProfile"></profilePage>
            </div>

            <div v-if="currentPage !== 'form' && currentPage !== 'profile-page'" class="hidden md:visible md:flex flex-col md:fixed md:w-3/12 md:right-0 md:mr-12">
                <watchTags :tags="tags"></watchTags>  
                <favorite></favorite>
            </div>

            <div v-if="currentPage === 'detail'" class="bg bg-gray-100 mb-10 md:w-7/12 mt-6 mx-24">
                <detail :articleDetail="articleDetail"></detail>   
            </div>
        </div>
    </div>
</template>

<script>
let baseUrl = 'http://localhost:3000'
import navbar from './components/navbar'
import card from './components/cards'
import inputForm from './components/inputForm'
import watchTags from './components/watchTags'
import favorite from './components/favorites'
import detail from './components/detail'
import loginRegister from './components/loginRegister'
import userFavorites from './components/userFavorites'
import profilePage from './components/profilePage'

export default {
    components: {
        navbar,
        card,
        inputForm,
        watchTags,
        favorite,
        detail,
        loginRegister,
        userFavorites,
        profilePage
    },
    created() {

        if(localStorage.getItem('access_token')) this.isLogin = true
        else this.isLogin = false

        axios({
            method: 'get',
            url: `${baseUrl}/article`
        })
            .then( ({data}) => {
                this.articles = data
            } )
            .catch( err => {
                Swal.fire({
                    type:'error',
                    title:'Failed to fetch articles.',
                    showConfirmButton:false,
                    timer:1500
                })
            })

    },
    data() {
        return {
            message:'Hi',
            currentPage: 'content',
            articleDetail: {},
            updateData: {},
            articles: [],
            tags: [],
            isLogin: false,
            showProfile: false,
            toAdd: false
        }
    },
    methods: {
        changePage(page) {
            if(page.page === 'detail') {
                this.currentPage = page.page
                this.articleDetail.title = page.title
                this.articleDetail.content = page.content
                this.articleDetail.image = page.image
            } else if (page === 'profile-page') {
                this.currentPage = page
                this.showProfile = true
            } else if (page === 'form') {
                this.currentPage = page
                this.toAdd = true
            } else {
                this.currentPage = page
            }
        },
        newArticles(payload) {
            this.articles = payload
        },
        addTag(payload) {
            this.tags.push(payload)
        },
        addArticle(payload) {
            this.articles.push(payload.data)
        },
        updateArticle(payload) {
            this.updateData = payload.data.data
            this.updateData.update = true
            this.currentPage = 'form'
        },
        newArticleList(payload) {
            this.currentPage = 'content'
            for(let i in this.articles) {
                if(this.articles[i]._id === payload._id) {
                    this.articles[i] = payload
                }
            }
        },
        deleteArticle(payload) {
            let res = this.articles.filter( article => {
                return article._id !== payload
            })
            this.articles = res
        },
        logout() {
            localStorage.removeItem('access_token')
            this.isLogin = false
        }
    }
}
</script>

<style>

</style>