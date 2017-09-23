<template>
  <div class="mw-100 pa1 vh-50-ns" :class="widthNs">
    <article class="br2 shadow-3 h-100-ns BlogPost" :style="{ background: color }">
      <figure class="ma0 BlogPost__image" v-if="item.better_featured_image">
        <img :src="item.better_featured_image.source_url" alt="Image" class="mw5-ns">
      </figure>
      <header class="BlogPost__header">
        <router-link :to="{ name: 'post', params: { id: item.id } }">
          <h2>{{ trimTitle }}</h2>
        </router-link>
      </header>
      <aside class="BlogPost__content">
        <p>{{ trimExcerpt }}</p>
      </aside>
      <footer class="BlogPost__footer">
        <router-link :to="{ name: 'post', params: { id: item.id } }">
          <button class="Btn Btn--primary">Read More</button>
        </router-link>
        <div class="Meta">
          <span>
            28 Oct 2016 &mdash;
            <span v-for="category in item.post_categories" v-bind:key="category.id">
              <span>{{ category.name }}</span>
            </span>
          </span>
        </div>
      </footer>
    </article>
  </div>
</template>

<script>

import { sample, times, findIndex } from 'lodash'
import { mapGetters } from 'vuex'

export default {

  props: ['item'],

  data() {
    return {
      colors: ['#00FBBE', '#F8F8F8', '#E0E0E0', '#DFC360', '#61F8E9', '#252424'],

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
      return sample(this.colors)
    },

    widthNs() {
      const indexInFilteredItems = findIndex(this.filteredItems, { 'id': this.item.id })

      return this.widths[indexInFilteredItems]
    },

    ...mapGetters({
      filteredItems: 'filteredPosts'
    }),
  }

}

</script>

<style lang="stylus" scoped>

.pa1
  padding: 0.15rem

.BlogPost
  font-family: 'Open Sans', sans-serif, Arial

  &__image
    img
      width: 100%

  &__header
    padding: 1em
    transition: all 0.5s ease-in-out
    &:hover
      background: #4929D4
      h2
        color: #fff

  &__content
    padding: 1em

  &__footer
    padding: 1em
    display: flex
    justify-content: space-between
    align-items: center
    .Meta
      color: #ccc
      font-size: 0.8em

</style>
