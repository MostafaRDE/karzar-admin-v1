import Vue from 'vue'

// Import main styles
import './assets/styles/index.scss'

import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#system')
