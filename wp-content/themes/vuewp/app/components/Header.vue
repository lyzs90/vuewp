<template>
  <div class="flex flex-column">
    <header class="w-100 pa3 bg-white-90 fixed">
      <div class="indent center mw-85 flex justify-between items-center">
        <!-- Title -->
        <h2>
          <router-link to="/" class="primary">
            {{ infoData.name }}
          </router-link>
        </h2>

        <!-- Search & Nav -->
        <div class="flex justify-end">
          <search class="mr3"></search>
          <ul class="list">
            <li>
              <a @click="toggleNavigation">
                <span class="primary fa fa-bars" v-if="!mobileNavigation"></span>
                <span class="primary fa fa-close" v-if="mobileNavigation"></span>
              </a>
            </li>
          </ul>
        </div>

      </div>
    </header>

    <!-- Mobile Nav Wrap -->
    <transition name="fade">
      <div class="mt4 w-100 w-30-ns self-end-ns fixed db bg-primary ease-all" v-if="mobileNavigation">
        <div class="indent center mw-85">

          <ul class="list pa2">
            <li v-for="page in items" v-bind:key="page.id" class="pa2">
              <router-link :to="{ name: 'page', params: { id: page.id } }" @click.native="toggleNavigation" class="white ttu">
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

import PagesService from '../services/PagesService'
import GlobalService from '../services/GlobalService'
import Search from './Search.vue'

export default {

  components: { Search },

  data() {
    return {
      items: [],
      infoData: [],
      mobileNavigation: false
    }
  },

  created() {
    this.fetchItems()
    this.fetchInfoData()
  },

  methods: {
    fetchItems() {
      return PagesService.get()
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
      this.mobileNavigation = !this.mobileNavigation
    }
  }

}

</script>

<style lang="stylus" scoped>

.mt4
  margin-top: 3.75rem

.ease-all
  transition: all 0.5s ease-in-out

.fa
  cursor: pointer

</style>
