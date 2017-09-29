<template>
  <div class="mw-100 pa3 pa1-ns vh-50-ns" :class="widthNs">
    <router-link :to="{ name: 'post', params: { slug: item.slug } }" class="flex flex-column justify-between-ns cover 0-90 br2 h-100-ns grow" :style="{ 'background-color': color, 'background-image': 'url(' + backgroundImage + ')' }">
      <header class="flex-grow-2 flex items-center pa3 self-center-ns">
        <h2 class="white tc pa1">{{ trimTitle }}</h2>
      </header>
      <footer class="pa2 self-start-ns">
        <div class="white-60 f7 fw5">
          <span>
            28 Oct 2016 &mdash;
            <span v-for="category in item.post_categories" v-bind:key="category.id">
              <span>{{ category.name }}</span>
            </span>
          </span>
        </div>
      </footer>
    </router-link>
  </div>
</template>

<script>

import { findIndex } from 'lodash'
import { mapGetters } from 'vuex'

import { mapStyles } from '../services/UtilsService'

export default {

  props: ['item'],

  data() {
    return {
      colors: ['#00FBBE', '#E0E0E0', '#DFC360', '#61F8E9', '#252424'],

      widths: ['w-third-ns', 'w-two-thirds-ns', 'w-100-ns', 'w-two-thirds-ns', 'w-third-ns', 'w-100-ns']
    }
  },

  computed: {
    trimTitle() {
      if (this.item.title.rendered.length < 34) {
        return this.item.title.rendered
      } else {
        return this.item.title.rendered.substring(0, 35) + '...'
      }
    },

    trimExcerpt() {
      return this.item.excerpt.rendered.substring(3, 110) + '...'
    },

    color() {
      const colorsArray = mapStyles(this.filteredItems)(this.colors)
      const indexInFilteredItems = findIndex(this.filteredItems, { 'id': this.item.id })

      return colorsArray[indexInFilteredItems]
    },

    widthNs() {
      const widthsArray = mapStyles(this.filteredItems)(this.widths)
      const indexInFilteredItems = findIndex(this.filteredItems, { 'id': this.item.id })

      return widthsArray[indexInFilteredItems]
    },

    backgroundImage() {
      if (this.item.better_featured_image) {
        return this.item.better_featured_image.source_url
      }

      return ''
    },

    ...mapGetters({
      filteredItems: 'filteredPosts'
    }),
  }

}

</script>

<style lang="stylus" scoped>

.flex-grow-2
  flex-grow: 2

@media all and (min-width: 600px)

  .pa1-ns
    padding: 0.15rem

</style>
