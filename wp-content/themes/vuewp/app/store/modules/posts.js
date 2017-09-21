import PostsService from "../../services/PostsService";
import * as types from "../mutation-types";

// initial state
const state = {
  items: []
};

// getters
const getters = {
  allPosts: state => state.items
};

// actions
const actions = {
  getAllPosts({ commit }) {
    PostsService.get().then(result => {
      const posts = result.data;
      commit(types.FETCH_POSTS, { posts });
    });
  }
};

// mutations
const mutations = {
  [types.FETCH_POSTS](state, { posts }) {
    state.items = posts;
  },

  [types.FILTER_POSTS](state, { query }) {
    state.items.filter(item => item.title.rendered.indexOf(query) > -1);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
