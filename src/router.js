import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from './pages/Layout.vue'
import Overview from './pages/Overview.vue'
import PageNotFound from './pages/PageNotFound.vue'
import Employee from './pages/Employee.vue'
import Login from './pages/Login.vue'
import store from './store'

Vue.use(VueRouter)

const router =  new VueRouter({
    mode:'history',
    routes:[
        {
            //Route not avalaible 

            path: '*',
            component: PageNotFound
        },
        {
            path: '/',
            component: Layout,
            redirect: '/overview',
            meta: { 
                requiresAuth: true
            },
            children: [
                // overview

                {
                    path: '/overview',
                    name: 'overview',
                    component: Overview,

                },
                {
                    path: '/employee',
                    name: 'employee',
                    component: Employee,

                },
            ]
        },
        {
            // login route
            path: '/login',
            component: Login
        },
    ]
})

//Check if user isLoggedIn already
router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
       
        if (store.getters.isLoggedIn) {
            // console.log(" overview route" )
            next()
            return
        }    
        next('/login')
    } else {
      next() 
    }
  })

export default router