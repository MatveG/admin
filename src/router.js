import Vue from 'vue'
import Router from 'vue-router'
import categories from '@/modules/categories/router'
import orders from '@/modules/orders/router'
import products from '@/modules/products/router'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    ...categories,
    ...orders,
    ...products,
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/tables',
      name: 'tables',
      component: () => import('./views/Tables.vue')
    },
    {
      path: '/forms',
      name: 'forms',
      component: () => import('./views/Forms.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/client/new',
      name: 'client.new',
      component: () => import('./views/ClientForm.vue')
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/login/recovery',
      name: 'login-recovery',
      component: () => import('./views/Recovery.vue')
    }

    // {
    //   path: '/page',
    //   component: () => import('./views/Wrapper.vue'),
    //   children: [
    //     {
    //       path: '/login-recovery',
    //       name: 'login-recovery',
    //       component: () => import('./views/Recovery.vue')
    //     },
    //     {
    //       path: '/error-in-card',
    //       name: 'error-in-card',
    //       component: () => import('./views/Error.vue')
    //     },
    //     {
    //       path: '/error-simple',
    //       name: 'error-simple',
    //       component: () => import('./views/Error.vue'),
    //       props: { isInCard: false }
    //     },
    //     {
    //       path: '/lock-screen',
    //       name: 'lock-screen',
    //       component: () => import('./views/LockScreen.vue')
    //     }
    //   ]
    // }
  ],
  scrollBehavior: (to, from, savedPosition) => savedPosition || { x: 0, y: 0 }
})
