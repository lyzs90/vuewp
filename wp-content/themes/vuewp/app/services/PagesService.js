import Vue from "vue";

export default {
  get() {
    return Vue.http.get("/wp-json/wp/v2/pages");
  }
};
