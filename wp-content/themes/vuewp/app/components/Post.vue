<template>
  <div class="ColumnThird">
    <article class="BlogPost">
      <figure class="BlogPost__image" v-if="item.better_featured_image">
        <img :src="item.better_featured_image.source_url" alt="Image">
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
            <span v-for="category in item.post_categories">
              <span>{{ category.name }}</span>
            </span>
          </span>
        </div>
      </footer>
    </article>
  </div>
</template>

<script>

export default {

  props: ['item'],

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
    }
  }

}

</script>

<style lang="stylus">

	.BlogPost
		background: #fff
		margin: 0.2em
		font-family: 'Open Sans', sans-serif, Arial

		&__image
			img
				width: 100%

		&__header
			padding: 1em
			background: #f9f9f9
			transition: all 0.5s ease-in-out
			&:hover
				background: #00aeef
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
