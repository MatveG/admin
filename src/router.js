import Vue from 'vue';
import Router from 'vue-router';
import category from '@/modules/category/router';
import document from '@/modules/document/router';
import order from '@/modules/order/router';
import product from '@/modules/product/router';
import setting from '@/modules/setting/router';
import user from '@/modules/user/router';

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    ...category,
    ...document,
    ...order,
    ...product,
    ...setting,
    ...user,
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Dashboard.vue')
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
  ],
  scrollBehavior: (to, from, savedPosition) => savedPosition || { x: 0, y: 0 }
});
