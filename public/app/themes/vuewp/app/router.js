import Vue				from 			'vue'
import VueRouter		from 			'vue-router'
import VueResource		from			'vue-resource'

import HomeView			from 			'./views/HomeView.vue'
import PostView			from 			'./views/PostView.vue'
import PageView			from			'./views/PageView.vue'

Vue.use(VueRouter)
Vue.use(VueResource)

export default new VueRouter({
	routes: [
		{ name: 'home', path: '/', component: HomeView },
		{ name: 'post', path: '/post/:id', component: PostView },
		{ name: 'page', path: '/page/:id', component: PageView }
	]
})
