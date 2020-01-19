import Home from '../pages/home/Index'
import Dashboard from '../pages/dashboard/Index.vue'
import Post from '../pages/post/Index.vue'

const routes = [    
    { path: '/', name: 'Home', component: Home, meta: {
        isLoggedin: false
    }},
    { path: '/dashboard', name: 'dashboard', component: Dashboard,  meta: {
        isLoggedin: true
    }},
    { 
        path: '/posts', 
        name: 'posts', 
        component: Post,  
        meta: { 
            isLoggedin: true 
        },
        children: [
            {
                path: ':method',
                name: 'add-post',
                component: Post,
                meta: { 
                    isLoggedin: true 
                }
            }
        ]
    },
]

export default routes