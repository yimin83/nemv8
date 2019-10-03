import Vue from 'vue'
import './plugins/vuetify'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import moment from 'moment'
import VueMomentJS from 'vue-momentjs'
import VScrollLock from 'v-scroll-lock'
// import Chartkick from 'chartkick'
// // import VueChartkick from 'vue-chartkick'
import VueApexCharts from 'vue-apexcharts'

// Vue.use(window.VueCharts)
//  Vue.use(VueChartkick, { Chartkick })
Vue.use(VueApexCharts)
Vue.use(VueMomentJS, moment)
Vue.use(VScrollLock)
Vue.component('apexchart', VueApexCharts)
console.log("############ process.env.NODE_ENV : " + process.env.NODE_ENV)
Vue.prototype.$apiRootPath = process.env.NODE_ENV !== 'production' ? 'http://localhost/api/' : '/api/'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

console.log(process.env.NODE_ENV)
