import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/pages/Index';
import Settings from '@/pages/Settings';
import Debug from '@/pages/Debug';

Vue.use(Router);

export default new Router({
  linkActiveClass: '',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    }, {
      path: '/settings',
      name: 'Settings',
      component: Settings,
    }, {
      path: '/debug',
      name: 'Debug',
      component: Debug,
    },
  ],
});
