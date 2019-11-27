export default [

    // <editor-fold desc="Authentication">
    {
        path: '/login',
        name: 'login',
        meta: {auth: false},
        component: () => import('../views/Authentication/Login.vue'),
    },
    {
        path: '/g2f',
        name: 'googleTwoFactor',
        meta: {auth: false},
        component: () => import('../views/Authentication/GoogleTwoFactor.vue'),
    },
    {
        path: '/reset-password',
        name: 'resetPassword',
        meta: {auth: false},
        component: () => import('../views/Authentication/ResetPassword.vue'),
    },
    // </editor-fold>

    // <editor-fold desc="Dashboard Routes">
    {
        path: '/',
        component: () => import('../views/Home.vue'),
        meta: {auth: true},
        children: [
            {path: '', name: 'home', component: () => import('../views/Root/Home.vue')},
        ]
    },
    // </editor-fold>
]
