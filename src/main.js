import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
//Vue.prototype.$api_url = 'http://store.arnaldo.rf.gd/api/'
//the url above cannot use cors due to hosting limitation
Vue.prototype.$api_url = 'http://shayna-backend.belajarkoding.com/api/'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')