import Vue from 'vue';

export default {
  get(slug) {
    return Vue.http.get(`${WP_HOME}/wp-json/wp/v2/posts?slug=${slug}`);
  },

  getAll() {
    return Vue.http.get(`${WP_HOME}/wp-json/wp/v2/posts`);
  },
};
