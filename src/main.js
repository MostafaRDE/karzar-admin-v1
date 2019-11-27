import Vue from 'vue'

// Import main styles
import './assets/styles/index.scss'

import './helpers'

import './components'

import App from './App.vue'
import router from './router'
import store from './store'

// Import custom components
import './layouts'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#system')
