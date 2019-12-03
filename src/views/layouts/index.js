import Vue from 'vue'

Vue.component('main-breadcrumb', () => import('./MainBreadcrumb.vue'));
Vue.component('main-footer', () => import('./MainFooter.vue'));
Vue.component('main-header', () => import('./MainHeader.vue'));
Vue.component('main-navbar', () => import('./MainNavbar.vue'));
Vue.component('main-sidebar', () => import('./MainSidebar.vue'));

import '../Root/layouts'
