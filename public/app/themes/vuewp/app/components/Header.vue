<template>
	<div>
		<header class="Header">
			<div class="Container is--flex-navigation">
				<h2>
					<router-link to="/">
						Site Title
					</router-link>
				</h2>
				<nav class="Navigation">
					<ul>
						<li v-for="page in items">
							<router-link :to="{ name: 'page', params: { id: page.id } }">
								{{ page.title.rendered }}
							</router-link>
						</li>
					</ul>
					<ul class="MobileNavigation">
						<li>
							<a @click="toggleNavigation">
								<span class="fa fa-bars" v-if="!mobileNavigation"></span>
								<span class="fa fa-close" v-if="mobileNavigation"></span>
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</header>
		<div class="MobileNavigationWrap" v-if="mobileNavigation">
			<div class="Container">
				<ul>
					<li v-for="page in items">
						<router-link :to="{ name: 'page', params: { id: page.id } }">
							{{ page.title.rendered }}
						</router-link>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>

	import PagesService			from 			'../services/PagesService' 

	export default {

		data() {
			return {
				items: [],
				mobileNavigation: false
			}
		},

		created() {
			this.fetchItems()
		},

		methods: {
			fetchItems() {
				return PagesService.get()
					.then(result => {
						this.items = result.data
					})
			},
			toggleNavigation() {
				this.mobileNavigation = !this.mobileNavigation
			}
		}

	}

</script>

<style lang="stylus">
	.Header	
		background: #00aeef
		width: 100vw
		padding: 1em
		a 
			color: #fff

	.is--flex-navigation 
		display: flex 
		justify-content: space-between
	
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
					font-weight: 300
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
			background: #00aeef
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