import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

// vue filters
Vue.filter('toHumanDate', (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
})

/* global variables */
// axios setting
window.axios = Axios
axios.defaults.baseURL = 'https://api.themoviedb.org/3'
axios.defaults.headers.common['Accept'] = 'application/json'

// APi setting
window.basePath = 'https://image.tmdb.org/t/p'
window.apiKey = 'f5df3521e2ca8e7dd670e3a85776ccff'
window.v4Auth = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNWRmMzUyMWUyY2E4ZTdkZDY3MGUzYTg1Nzc2Y2NmZiIsInN1YiI6IjVmNWIwMDZlNjNkOTM3MDAzNmIwZTFhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pmz9oMXOcApZNSvbF-JwBfQ0eFHVo9N-b4Yv6A1xC5E'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
