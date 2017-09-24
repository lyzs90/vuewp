<template>
  <div>
    <div class="flex flex-column justify-center bg-top mt5-ns h1 h-75-ns indent center mw-85 br3" :style="{ 'background-image': 'url(' + backgroundImage + ')' }">
       <span class="primary f1 ma7 center self-center fa fa-play-circle-o"></span>
    </div>
    <div class="pt5 indent center mw-85">
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

.fa.fa-play-circle-o
  cursor: pointer
  text-shadow: 3px 3px 16px #D3D3D3

  &:hover
    opacity: 0.7
    transition: all 0.5 ease-in-out

@media only screen and (min-width: 640px)
  .vh-95-ns
    height: 95vh

</style>
