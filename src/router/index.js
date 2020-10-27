import Vue from 'vue'
import Router from 'vue-router'
import { auth } from '../firebase'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

//Venue list
const Business = () => import('@/views/business/Business')
const ConfirmPage = () => import('@/views/business/ConfirmPage')

const Chrisvenue = () => import('@/views/chrisvenues/Chrisvenue')
const ChrisvenueDetails = () => import('@/views/chrisvenues/Details')

// Categories
const CategoryList = () => import('@/views/categories/CategoryList')
const CategoryDetail = () => import('@/views/categories/CategoryDetail')

// Sliders
const SliderList = () => import('@/views/sliders/SliderList')
const SliderDetail = () => import('@/views/sliders/SliderDetail')

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
            path: 'business',
            name: 'Business',
            component: Business
        },
        {
            path: 'confirm',
            component: {
              render(c) {
                return c('router-view')
              }
            },
            children: [
                {
                  path: ':contact_name',
                  name: 'Confirm',
                  component: ConfirmPage
                }
            ]
        },
        {
          path: 'details',
          name: 'Details',
          component: ChrisvenueDetails
        },
        {
          path: 'chrisvenues',
          meta: {
            label: 'Venues'
          },
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: 'Venues List',
              component: Chrisvenue
            },
            {
              path: ':id',
              meta: {
                label: 'Venue Edit'
              },
              name: 'ChrisvenueDetail',
              component: ChrisvenueDetails
            },
            {
              path: '/chrisvenue/add',
              meta: {
                label: 'Venue Add'
              },
              name: 'ChrisvenueAdd',
              component: ChrisvenueDetails
            }
          ]
        },
        {
          path: 'categories',
          meta: {
            label: 'Categories'
          },
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: 'Categories',
              component: CategoryList
            },
            {
              path: ':id',
              meta: {
                label: 'Category Edit'
              },
              name: 'CategoryDetail',
              component: CategoryDetail
            },
            {
              path: '/category/add',
              meta: {
                label: 'Add'
              },
              name: 'CategoryAdd',
              component: CategoryDetail
            }
          ]
        },
        {
          path: 'sliders',
          meta: {
            label: 'Sliders'
          },
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: 'Sliders',
              component: SliderList
            },
            {
              path: ':id',
              meta: {
                label: 'Slider Edit'
              },
              name: 'SliderDetail',
              component: SliderDetail
            },
            {
              path: '/slider/add',
              meta: {
                label: 'Add'
              },
              name: 'SliderAdd',
              component: SliderDetail
            }
          ]
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
            },
            {
              path: '/user/add',
              meta: {
                label: 'User Add'
              },
              name: 'UserAdd',
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
