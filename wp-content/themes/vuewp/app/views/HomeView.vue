<template>
  <div>
    <div class="bg-top h1 vh-95-ns" :style="{ 'background-image': 'url(' + backgroundImage + ')' }"></div>
    <div class="pt5 pt0-ns Container">
      <div class="Row">
        <post v-if="items.length > 0" v-for="item in filteredItems" :item="item" v-bind:key="item.id">
        </post>
        <div class="InfoMessage" v-if="items.length < 1 && !isLoading">
          <h3>Seems like this site doesn't have any post yet...</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import MediaService from '../services/MediaService'
import PostsService from '../services/PostsService'
import Post from '../components/Post.vue'
import { mapGetters, mapActions } from 'vuex'

export default {

  components: { Post },

  data() {
    return {
      isLoading: true,
      backgroundImage: ''
    }
  },

  created() {
    return Promise.all([
      this.getAllPosts(),
      MediaService.get('bg')
    ])
      .then(([noop, image]) => {
        this.backgroundImage = image.data[0].source_url
        this.isLoading = false
      })
  },

  computed: {
    ...mapGetters({
      items: 'allPosts',
      filteredItems: 'filteredPosts'
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
  .vh-95-ns
    height: 95vh

</style>
