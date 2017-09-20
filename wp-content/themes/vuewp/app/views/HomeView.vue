<template>
  <div class="flex flex-column">
    <span class="f1 ma7 center self-center fa fa-play-circle-o"></span>
    <div class="pa3 mb3 Jumbotron">
      <div class="Container">
        <div class="flex flex-row items-center justify-between">
          <span @click="showSearchBar" class="f4 pa2 w-10 w-5-ns fa fa-search"></span>
          <transition name="fade">
            <input class="h2 pa1 ba br3 w-80 w-90-ns" v-if="searchBarVisible" v-model="filter" placeholder="Search...">
          </transition>
        </div>
      </div>
    </div>
    <div class="Container">

      <div class="Row">

        <post v-if="items.length > 0" v-for="item in filteredItems" :item="item" v-bind:key="item.id">
        </post>

        <div class="InfoMessage" v-if="items.length < 1">
          <h3>Seems like this site doesn't have any post yet...</h3>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

import PostsService from '../services/PostsService'
import Post from '../components/Post.vue'

export default {

  components: { Post },

  data() {
    return {
      items: [],
      searchBarVisible: false,
      filter: ''
    }
  },

  created() {
    this.fetchItems()
  },

  computed: {
    filteredItems() {
      return this.items.filter(item => {
        return item.title.rendered.indexOf(this.filter) > -1
      })
    }
  },

  methods: {
    fetchItems() {
      return PostsService.get()
        .then(result => {
          this.items = result.data
        })
    },
    showSearchBar(e) {
      this.searchBarVisible = !this.searchBarVisible
    }
  }


}

</script>

<style lang="stylus" scoped>

.ma7
  margin: 12rem

.fa.fa-play-circle-o
  cursor: pointer

.Jumbotron
  background: #fff
  input
    border-color: #ddd

.fa.fa-search
  color: #4929D4
  cursor: pointer

</style>
