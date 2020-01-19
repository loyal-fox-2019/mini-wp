import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginForm from './views/LoginForm.vue'
import LandingPage from './views/LandingPage.vue'
import RegisterForm from './views/RegisterForm.vue'
import ArticlesContainer from './views/ArticleContainer.vue'
import AddArticleForm from './views/AddArticleForm.vue'
import UserPage from './views/UserPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'landingPage',
    component: LandingPage,
  },
  {
    path: '/login',
    name: 'loginPage',
    component: LoginForm,
  },
  {
    path: '/register',
    name: 'registerPage',
    component: RegisterForm,
  },
  {
    path: '/user',
    name: 'userPage',
    component: UserPage,
    children: [
      {
        path: 'all-articles',
        name: 'allArticles',
        component: ArticlesContainer
      },
      {
        path: 'published-articles',
        name: 'publishedArticles',
        component: ArticlesContainer,
      },
      {
        path: 'draft-articles',
        name: 'draftArticles',
        component: ArticlesContainer,
      },
      {
        path: 'add-article',
        name: 'addArticle',
        component: AddArticleForm
      }
    ]
  }
]

function redirectToAllArticles(next) {
  if (localStorage.getItem('token')) {
    next('/user/all-articles')
  } else next()
}

const router = new VueRouter({
  routes,
})

router.beforeEach((to, from ,next) => {
  switch (to.path) {
    case '/':
      redirectToAllArticles(next)
      break

    case '/login':
      redirectToAllArticles(next)
      break

    case '/register':
      redirectToAllArticles(next)
      break

    default:
      next()
      break
  }
})

export default router
