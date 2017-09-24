<template>
  <div class="flex items-center justify-between">
    <transition name="fade">
      <input class="searchbox h-auto mw4 mw5-ns mr2 mr3-ns ba br3 b--black-20" v-if="searchBarVisible" v-model="filter" placeholder="Search...">
    </transition>
    <span @click="showSearchBar" class="f5 primary fa fa-search"></span>
  </div>
</template>

<script>

import { debounce } from 'lodash'

import { mapMutations } from 'vuex'
import * as types from "../store/mutation-types";

export default {

  data() {
    return {
      searchBarVisible: false,
      filter: ''
    }
  },

  watch: {
    filter: function(newFilter) {
      this.updatePosts(newFilter)
    }
  },

  methods: {
    ...mapMutations({
      filterPosts: types.FILTER_POSTS
    }),

    updatePosts: debounce(function() {
      this.filterPosts(this.filter)
    }, 500),

    showSearchBar(e) {
      this.searchBarVisible = !this.searchBarVisible
    }
  }
}

</script>

<style lang="stylus" scoped>

.searchbox
  padding: 0.2rem

  &:focus
    outline: none

.fa.fa-search
  cursor: pointer

</style>
