import Vue from 'vue';

export default {
  get(id) {
    return Vue.http.get(`${WP_HOME}/wp-json/wp/v2/posts/${id}`);
  },
};
