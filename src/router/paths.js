import Roles from '../utils/objects/Roles'

export default [

    // <editor-fold desc="Authentication">
    {
        path: '/login',
        name: 'login',
        meta: {auth: false},
        component: () => import('../views/Authentication/Login.vue'),
    },
    // </editor-fold>

    // <editor-fold desc="Dashboard Routes">
    {
        path: '/',
        component: () => import('../views/Root.vue'),
        meta: { auth: true},
        children: [
            {path: '', name: 'dashboard', component: () => import('../views/Root/Dashboard.vue')},
            {
                path: 'profile',
                meta: {
                    roles: [Roles.SUPER_ADMIN, Roles.EXECUTOR],
                },
                component: () => import ('../views/Root/Profile.vue'),
                children: [
                    {path: 'change-password', name: 'profileChangePassword', component: () => import('../views/Root/Profile/ChangePassword.vue')},
                ]
            },
            {
                path: 'users',
                meta: {
                    roles: [Roles.SUPER_ADMIN, Roles.EXECUTOR],
                },
                component: () => import ('../views/Root/Users.vue'),
                children: [
                    {path: '', name: 'usersList', component: () => import('../views/Root/Users/List.vue')},
                    {path: 'create', name: 'userCreate', component: () => import('../views/Root/Users/Create.vue')},
                ]
            },
            {
                path: 'tournaments',
                meta: {
                    roles: [Roles.SUPER_ADMIN, Roles.EXECUTOR],
                },
                component: () => import ('../views/Root/Tournaments.vue'),
                children: [
                    {path: '', name: 'tournamentsList', component: () => import('../views/Root/Tournaments/List.vue')},
                    {path: 'create', name: 'tournamentCreate', component: () => import('../views/Root/Tournaments/Create.vue')},
                ]
            },
            {
                path: 'tournaments/maps',
                meta: {
                    roles: [Roles.SUPER_ADMIN, Roles.EXECUTOR],
                },
                component: () => import ('../views/Root/Maps.vue'),
                children: [
                    {path: '', name: 'mapsList', component: () => import('../views/Root/Tournaments/Maps/List.vue')},
                ]
            },
            {
                path: 'gateways/',
                meta: {
                    roles: [Roles.SUPER_ADMIN],
                },
                component: () => import ('../views/Root/Gateways.vue'),
                children: [
                    { path: 'deposit', name: 'depositGatewaysList', component: () => import('../views/Root/Gateways/Deposit/List.vue') },
                    { path: 'withdraw', name: 'withdrawGatewaysList', component: () => import('../views/Root/Gateways/Withdraw/List.vue') },
                ]
            },
            {
                path: 'transactions',
                meta: {
                    roles: [Roles.SUPER_ADMIN],
                },
                component: () => import ('../views/Root/Transactions.vue'),
                children: [
                    {path: 'deposit', name: 'depositTransactionsList', component: () => import('../views/Root/Transactions/Deposit/List.vue')},
                    {path: 'withdraw', name: 'withdrawTransactionsList', component: () => import('../views/Root/Transactions/Withdraw/List.vue')},
                ]
            },
            {
                path: 'admins',
                meta: {
                    roles: [Roles.SUPER_ADMIN],
                },
                component: () => import ('../views/Root/Admins.vue'),
                children: [
                    {path: '', name: 'adminsList', component: () => import('../views/Root/Admins/List.vue')},
                ]
            },
            {
                path: 'tutorials',
                meta: {
                    roles: [Roles.SUPER_ADMIN],
                },
                component: () => import ('../views/Root/Tutorials.vue'),
                children: [
                    {path: '', name: 'tutorialsList', component: () => import('../views/Root/Tutorials/List.vue')},
                ]
            },
        ]
    },
    // </editor-fold>
]
