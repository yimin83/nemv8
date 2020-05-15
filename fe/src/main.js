import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import moment from 'moment'
import VueMomentJS from 'vue-momentjs'
import VScrollLock from 'v-scroll-lock'
// import Chartkick from 'chartkick'
// // import VueChartkick from 'vue-chartkick'
import VueApexCharts from 'vue-apexcharts'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import SvgFiller from 'vue-svg-filler'

library.add(fas)
library.add(far)
library.add(fab)

// Vue.use(window.VueCharts)
//  Vue.use(VueChartkick, { Chartkick })
Vue.use(VueApexCharts)
Vue.use(VueMomentJS, moment)
Vue.use(VScrollLock)
Vue.component('apexchart', VueApexCharts)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('svg-filler', SvgFiller)

// console.log("############ process.env.NODE_ENV : " + process.env.NODE_ENV)
Vue.prototype.$apiRootPath = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/api/' : '/api/'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

// console.log(process.env.NODE_ENV)
