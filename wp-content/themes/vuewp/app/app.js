import Vue from "vue";
import App from "./layouts/App.vue";
import router from "./router";
import store from "./store";

import NProgress from "nprogress";

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

Vue.http.interceptors.push((request, next) => {
  NProgress.start();
  next(() => {
    NProgress.done();
  });
});
