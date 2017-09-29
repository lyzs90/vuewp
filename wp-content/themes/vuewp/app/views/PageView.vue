<template>
  <div>
    <!-- 404 -->
    <div class="Jumbotron" v-if="error">
      <div class="pt5 indent center mw-85">
        <div class="Row items-center">
          <h3>Page not found...</h3>
        </div>
      </div>
    </div>
    <!-- Main -->
    <div class="pt5 indent center mw-85" v-if="item.content">
      <div class="Row">
        <div class="ColumnSeventy">
          <article class="PageSingle">
            <figure class="BlogPostSingle__images" v-if="item.better_featured_image">
              <img :src="item.better_featured_image.source_url">
            </figure>
            <header class="BlogPostSingle__header">
              <h1>{{ item.title.rendered }}</h1>
            </header>
            <aside class="BlogPostSingle__content">
              <div v-html="item.content.rendered"></div>
            </aside>
          </article>
        </div>
        <div class="ColumnQuarter">
          <aside class="SidebarItem">
            <header class="SidebarItem__header">
              <h3>Latest Posts</h3>
            </header>
            <ul>
              <li v-for="post in limitedPosts" v-bind:key="post.slug">
                <router-link :to="{ name: 'post', params: { id: post.slug } }">
                  {{ post.title.rendered }}
                </router-link>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import PageService from '../services/PageService'
import PostService from '../services/PostService'

export default {

  data() {
    return {
      item: [],
      posts: [],
      error: false
    }
  },

  created() {
    this.fetchItem()
    this.fetchPosts()
  },

  computed: {
    limitedPosts() {
      return this.posts.splice(0, 5)
    }
  },

  watch: {
    '$route': 'fetchItem'
  },

  methods: {
    fetchItem() {
      return PageService.get(this.$route.params.slug)
        .then(result => {
          this.item = result.data[0]
        })
        .catch(err => {
          this.error = true
        })
    },
    fetchPosts() {
      return PostService.getAll()
        .then(result => {
          this.posts = result.data
        })
    }
  }

}
</script>

<style lang="stylus" scoped>

/**
 * 404
 */
.Jumbotron
  padding: 1em 0
  margin-bottom: 1.5em
  background: #fff
  border-bottom: 1px solid #ccc

h3
  padding: 1em 0
  margin: 0 auto

/**
 * Main
 */
.fade-enter-active
  transition: opacity 0.5s

.fade-leave-active
  @extend .fade-enter-active

.fade-enter
  opacity: 0

.fade-leave
  @extend .fade-enter

@media only screen and (max-width: 640px)
  .PageSingle
    margin: 1em 0

</style>
