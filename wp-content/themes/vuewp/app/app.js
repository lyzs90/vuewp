import Vue from 'vue';
import NProgress from 'nprogress';

import App from './layouts/App.vue';
import router from './router';
import store from './store';

const app = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

Vue.http.interceptors.push((request, next) => {
  NProgress.start();
  next(() => {
    NProgress.done();
  });
});
