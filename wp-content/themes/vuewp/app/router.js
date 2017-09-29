import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import HomeView from './views/HomeView.vue';
import PostView from './views/PostView.vue';
import PageView from './views/PageView.vue';
import NotFoundView from './views/NotFoundView.vue';

Vue.use(VueRouter);
Vue.use(VueResource);

export default new VueRouter({
  mode: 'history',
  routes: [
    { name: 'home', path: '/', component: HomeView },
    { name: 'post', path: '/post/:slug', component: PostView },
    { name: 'page', path: '/page/:slug', component: PageView },
    { path: '*', component: NotFoundView },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});
