import Vue from 'vue'
import './plugins/vuetify'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'chart.js'
import 'hchs-vue-charts'
// import Chartkick from 'chartkick'
// // import VueChartkick from 'vue-chartkick'
import VueApexCharts from 'vue-apexcharts'

// Vue.use(window.VueCharts)
//  Vue.use(VueChartkick, { Chartkick })
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
