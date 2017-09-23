import PostsService from "../../services/PostsService";
import * as types from "../mutation-types";

// initial state
const state = {
  items: [],
  filteredItems: []
};

// getters
const getters = {
  allPosts: state => state.items,
  filteredPosts: state => state.filteredItems
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
    state.filteredItems = posts;
  },

  [types.FILTER_POSTS](state, string) {
    if (string === "") {
      state.filteredItems = state.items;
    }
    const match = state.items.filter(
      item => item.title.rendered.indexOf(string) > -1
    );
    state.filteredItems = match;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
