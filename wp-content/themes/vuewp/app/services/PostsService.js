import Vue from 'vue';

export default {
  get() {
    return Vue.http.get(`${WP_HOME}/wp-json/wp/v2/posts`);
  },
};
