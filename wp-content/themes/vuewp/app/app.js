import Vue from 'vue';
import NProgress from 'nprogress';

import App from './layouts/App.vue';
import router from './router';
import store from './store';

const app = new Vue({
  router,
  store,
  render: h => h(App),
})
  // set hydrating to true to enable client-side handover of prerendered templates
  .$mount('#app', true);

Vue.http.interceptors.push((request, next) => {
  NProgress.start();
  next(() => {
    NProgress.done();
  });
});
