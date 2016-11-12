import Vue				from 			'vue'

export default {
	get(id) {
		return Vue.http.get(`/wp-json/wp/v2/pages/${id}`)
	}
}