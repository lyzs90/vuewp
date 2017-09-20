<template>
  <div>
    <div class="Jumbotron">
      <div class="Container">
        <div class="Row is--center-vertical">
          <div class="ColumnHalf">
            <h3>
              <span class="fa fa-search"></span> Looking for something...</h3>
          </div>
          <div class="ColumnHalf">
            <input v-model="filter" placeholder="Search...">
          </div>
        </div>
      </div>
    </div>
    <div class="Container">
      <div class="Row">
        <div class="ColumnFull">
          <h2>Latest Posts</h2>
        </div>
      </div>

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
      filter: ''
    }
  },

  created() {
    this.fecthItems()
  },

  computed: {
    filteredItems() {
      return this.items.filter(item => {
        return item.title.rendered.indexOf(this.filter) > -1
      })
    }
  },

  methods: {
    fecthItems() {
      return PostsService.get()
        .then(result => {
          this.items = result.data
        })
    }
  }


}

</script>

<style lang="stylus" scoped>

.Jumbotron
  padding: 1em 0
  margin-bottom: 1.5em
  background: #fff
  border-bottom: 1px solid #ccc
  input
    width: 100%
    padding: 1em
    height: 4em
    border: 1px solid #ddd
    border-radius: 5px

@media only screen and (max-width: 640px)

  .Jumbotron
    input
      margin-top: 1em

</style>
