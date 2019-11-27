import Vue from 'vue'
import VueRouter from 'vue-router'
import getPaths from "./paths.js"
import {beforeEachCreator} from "./middleware.js"

Vue.use(VueRouter)

const routes = getPaths

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    linkActiveClass: "active",
    linkExactActiveClass: "exact-active",
    routes
})

/* ======================================== *
 * Middleware:
 *     - Authentication
 *                                          */
router.beforeEach(beforeEachCreator());

export default router
