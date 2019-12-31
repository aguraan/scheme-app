import Vue from 'vue'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import popup from '@/plugins/oAuthPopup'
import router from '@/router'
import store from '@/store'

Vue.use(popup, { esUrl: '/stream' })

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
