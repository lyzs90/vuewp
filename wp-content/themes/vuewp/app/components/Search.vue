<template>
  <div class="flex items-center justify-between">
    <transition name="fade">
      <input class="searchbox h-auto mw4 mw5-ns mr2 mr3-ns ba br3 b--black-20" v-if="searchBarVisible" v-model="filter" placeholder="Search...">
    </transition>
    <span @click="showSearchBar" class="f5 fa fa-search"></span>
  </div>
</template>

<script>

export default {
  data() {
    return {
      searchBarVisible: false,
      filter: ''
    }
  },

  methods: {
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
  color: #4929D4
  cursor: pointer

</style>
