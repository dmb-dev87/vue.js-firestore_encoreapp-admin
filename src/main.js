import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import { auth } from './firebase'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'

Vue.config.performance = true

Vue.use(CoreuiVue)

Vue.prototype.$log = console.log.bind(console)

let app
auth.onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      icons,
      render: h => h(App)
    }).$mount('#app')
  }
})
