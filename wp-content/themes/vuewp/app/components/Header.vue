<template>
  <div class="flex flex-column">
    <header class="w-100 pa3 z-999 fixed ease-all" :class="{ 'bg-primary': navigation, 'bg-white-90': !navigation }">
      <div class="indent center mw-85 flex justify-between items-center">
        <!-- Title -->
        <h2>
          <router-link to="/" :class="{ 'white-90': navigation, primary: !navigation }">
            {{ infoData.name }}
          </router-link>
        </h2>

        <!-- Search & Nav -->
        <div class="flex justify-end">
          <search class="mr3" v-if="!navigation"></search>
          <ul class="list">
            <li>
              <a @click="toggleNavigation">
                <span class="primary fa fa-bars" v-if="!navigation"></span>
                <span class="white-90 fa fa-close" v-if="navigation"></span>
              </a>
            </li>
          </ul>
        </div>

      </div>
    </header>

    <!-- Mobile Nav Wrap -->
    <transition name="fade">
      <div class="mt4 w-100 z-999 vh-100 self-end-ns fixed db bg-primary ease-all" v-if="navigation">
        <div class="indent center mw-85">

          <ul class="list pa2 tc">
            <li v-for="page in orderedPages" v-bind:key="page.slug" class="pa2 f3 f1-ns">
              <router-link :to="{ name: 'page', params: { slug: page.slug } }" @click.native="toggleNavigation" class="white ttu">
                {{ page.title.rendered }}
              </router-link>
            </li>
          </ul>

        </div>
      </div>
    </transition>

  </div>
</template>

<script>

import { orderBy } from 'lodash'

import PageService from '../services/PageService'
import GlobalService from '../services/GlobalService'
import Search from './Search.vue'

export default {

  components: { Search },

  data() {
    return {
      items: [],
      infoData: [],
      navigation: false
    }
  },

  created() {
    this.fetchItems()
    this.fetchInfoData()
  },

  computed: {
    orderedPages() {
      return orderBy(this.items, 'slug')
    }
  },

  methods: {
    fetchItems() {
      return PageService.getAll()
        .then(result => {
          this.items = result.data
        })
    },
    fetchInfoData() {
      return GlobalService.get()
        .then(result => {
          this.infoData = result.data
        })
    },
    toggleNavigation() {
      this.navigation = !this.navigation
    }
  }

}

</script>

<style lang="stylus" scoped>

.mt4
  margin-top: 4.8rem

.ease-all
  transition: all 0.5s ease-in-out

.fa
  cursor: pointer

</style>
