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
                    {path: ':id/show', name: 'userShow', component: () => import('../views/Root/Users/Show.vue')},
                    {path: ':id/edit', name: 'userEdit', component: () => import('../views/Root/Users/Edit.vue')},
                    {path: ':id/fill-identities', name: 'userFillIdentities', component: () => import('../views/Root/Users/FillIdentities.vue')},
                ]
            }
        ]
    },
    // </editor-fold>
]
