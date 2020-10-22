import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import { auth } from './firebase'
import * as VueGoogleMaps from "vue-google-maps"

Vue.config.performance = true

Vue.use(CoreuiVue)

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyD9l94Dus9T1VCSfHzdAlovQuW6FaV7OV0",
    libraries: "places"
  },
  installComponents: false
})

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
