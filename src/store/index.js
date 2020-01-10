import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)

let store = new Vuex.Store({

    state: {
        breadcrumb: [],
    },

    mutations: {
        updateBreadcrumb: (state, breadcrumb) => state.breadcrumb = breadcrumb
    },

    actions: {},

    modules
})

export default store;
