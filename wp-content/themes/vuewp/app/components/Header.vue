<template>
  <div>
    <header class="w-100 pa3 bg-white-90 fixed">
      <div class="Container flex justify-between">
        <!-- Title -->
        <h2>
          <router-link to="/" class="primary">
            {{ infoData.name }}
          </router-link>
        </h2>

        <!-- Search & Nav -->
        <div class="flex justify-end">
          <search class="mr3"></search>
          <nav class="Navigation">
            <ul>
              <li v-for="page in items" v-bind:key="page.id">
                <router-link :to="{ name: 'page', params: { id: page.id } }" class="primary">
                  {{ page.title.rendered }}
                </router-link>
              </li>
            </ul>
            <ul class="MobileNavigation">
              <li>
                <a @click="toggleNavigation">
                  <span class="primary fa fa-bars" v-if="!mobileNavigation"></span>
                  <span class="primary fa fa-close" v-if="mobileNavigation"></span>
                </a>
              </li>
            </ul>
          </nav>
        </div>

      </div>
    </header>

    <!-- Mobile Nav Wrap -->
    <transition name="fade">
      <div class="MobileNavigationWrap" v-if="mobileNavigation">
        <div class="Container">

          <ul>
            <li v-for="page in items" v-bind:key="page.id">
              <router-link :to="{ name: 'page', params: { id: page.id } }">
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

$primary = #4929D4

.primary
  color: $primary

.Navigation
  ul
    margin: 0
    padding: 0
    list-style: none
    display: flex
    justify-content: center
    align-items: center
    li
      padding: 0.3em
      a
        padding: 0 0.5em
        text-transform: uppercase
        font-weight: 600
  .MobileNavigation
    display: none

.MobileNavigationWrap
  display: none


@media (max-width: 640px)
  .Navigation
    ul
      display: none

    .MobileNavigation
      display: flex

  .MobileNavigationWrap
    display: block
    background: $primary
    border-top: 1px solid #eee
    transition: all 0.5s ease-in-out
    ul
      list-style: none
      padding: 0.5em 0
      li
        padding: 0.5em 0
        a
          color: #fff
          text-transform: uppercase

</style>
