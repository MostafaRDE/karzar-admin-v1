import ROLES from './Roles.js'

export default [
    { title: 'پیشخوان', icon: 'home4', route: { name: 'dashboard' }, roles: [ROLES.SUPER_ADMIN, ROLES.EXECUTOR] },
    { title: 'کاربران', icon: 'users4', route: { name: 'usersList' }, roles: [ROLES.SUPER_ADMIN] },
    { title: 'تورنومنت ها', icon: 'medal-star', route: { name: 'tournamentsList' }, roles: [ROLES.SUPER_ADMIN, ROLES.EXECUTOR] },
    { title: 'کاراکتر ها', icon: 'users2', route: { name: 'charactersList' }, roles: [ROLES.SUPER_ADMIN] },
    { title: 'درگاه ها', icon: 'wallet', route: { name: 'gatewaysList' } },
    { title: 'گزارشات مالی ورود', icon: 'calculator2', route: { name: 'depositTransactionsList' }, roles: [ROLES.SUPER_ADMIN] },
    { title: 'گزارشات مالی خروج', icon: 'calculator2', route: { name: 'withdrawTransactionsList' }, roles: [ROLES.SUPER_ADMIN] },
    { title: 'مجری ها', icon: 'user-tie', route: { name: 'adminsList' }, roles: [ROLES.SUPER_ADMIN] },
    { title: 'سود ها', icon: 'stats-growth2', route: { name: 'profits' } },
    { title: 'گزارشات', icon: 'stack-empty', route: { name: 'reportsList' } },
    { title: 'اطلاعات وب سایت', icon: 'certificate', route: { name: 'siteInfo' } },
    { title: 'آموزش ها', icon: 'book', route: { name: 'tutorialsList' }, roles: [ROLES.SUPER_ADMIN, ROLES.EXECUTOR] },
]
