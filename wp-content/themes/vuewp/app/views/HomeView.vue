<template>
  <div>
    <div class="background bg-top h1 vh-100-ns"></div>
    <div class="pt5 pt0-ns Container">
      <div class="Row">
        <post v-if="items.length > 0" v-for="item in items" :item="item" v-bind:key="item.id">
        </post>
        <div class="InfoMessage" v-if="items.length < 1 && !isLoading">
          <h3>Seems like this site doesn't have any post yet...</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import PostsService from '../services/PostsService'
import Post from '../components/Post.vue'
import { mapGetters, mapActions } from 'vuex'

export default {

  components: { Post },

  data() {
    return {
      isLoading: true,
      filter: ''
    }
  },

  created() {
    return this.getAllPosts()
      .then(() => {
        this.isLoading = false
      })
  },

  computed: {
    ...mapGetters({
      items: 'allPosts'
    })
  },

  methods: {
    ...mapActions([
      'getAllPosts'
    ])
  }


}

</script>

<style lang="stylus" scoped>

@media only screen and (min-width: 640px)

  .background
    background-image: url(../static/bg.png)

</style>
