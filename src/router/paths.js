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
        meta: {auth: true},
        children: [
            {path: '', name: 'dashboard', component: () => import('../views/Root/Dashboard.vue')},
            {
                path: 'users',
                component: () => import ('../views/Root/Users.vue'),
                children: [
                    {path: '', name: 'usersList', component: () => import('../views/Root/Users/List.vue')},
                    {path: 'create', name: 'userCreate', component: () => import('../views/Root/Users/Create.vue')},
                ]
            },
            {
                path: 'tournaments',
                component: () => import ('../views/Root/Tournaments.vue'),
                children: [
                    {path: '', name: 'tournamentsList', component: () => import('../views/Root/Tournaments/List.vue')},
                    {path: 'create', name: 'tournamentCreate', component: () => import('../views/Root/Tournaments/Create.vue')},
                ]
            },
        ]
    },
    // </editor-fold>
]
