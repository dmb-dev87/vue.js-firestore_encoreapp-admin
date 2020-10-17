import Vue from 'vue'
import Router from 'vue-router'
import { auth } from '../firebase'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

const Chrisvenue = () => import('@/views/chrisvenues/Chrisvenue')
const Details = () => import('@/views/chrisvenues/Details')
const CategoryList = () => import('@/views/categories/CategoryList')
const SliderList = () => import('@/views/sliders/SliderList')
const Settings = () => import('@/views/settings/Settings')

// Users
const Users = () => import('@/views/users/Users')
const User = () => import('@/views/users/User')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')
const ResetPassword = () => import('@/views/pages/ResetPassword')

Vue.use(Router)

const router = new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

router.beforeEach((to, from, next) => {  
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }
})

function configRoutes () {
  return [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/resetpassword',
      name: 'ResetPassword',
      component: ResetPassword
    },
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: TheContainer,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'details',
          name: 'Details',
          component: Details
        },
        {
          path: '/detail/:id',
          name: 'Detail',
          component: Details
        },
        {
          path: 'settings',
          name: 'Settings',
          component: Settings
        },
        {
          path: 'chrisvenue',
          name: 'Chrisvenues',
          component: Chrisvenue
        },
        {
          path: 'categories',
          name: 'Categories',
          component: CategoryList
        },
        {
          path: 'sliders',
          name: 'Sliders',
          component: SliderList
        },
        {
          path: 'users',
          meta: {
            label: 'Users'
          },
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: 'Users',
              component: Users
            },
            {
              path: ':id',
              meta: {
                label: 'User Edit'
              },
              name: 'User',
              component: User
            }
          ]
        },
      ]
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
      ]
    }
  ]
}



export default router
