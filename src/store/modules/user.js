export default {
    namespaced: true,

    state: {
        id: 0,
        name: 'نام',
        role: 'SUPER_ADMIN',
        userImage: require('@/assets/global_assets/images/image.png'),
        username: '',
        email: '',
        permissions: [],
        tokenCreatedAt: 0,
        tokenExpiredAt: 0,
    },

    getters: {
        fullName(state) {
            return `${state.name}`
        },
        roleLabel(state) {
            switch (state.role) {
                case 'SUPER_ADMIN':
                case 'SUPPER_ADMIN':
                    return 'مدیر کل'

                case 'ADMIN':
                    return 'مدیر'

                default:
                    return 'مشخص نشده'
            }
        }
    },

    mutations: {
        updateUserData(state, payload) {
            state.id = payload.id;
            state.name = payload.name;
            state.role = payload.role;
            state.username = payload.username;
            state.email = payload.email;
            state.permissions = payload.permissions;
            state.tokenCreatedAt = payload.iat;
            state.tokenExpiredAt = payload.exp;
        }
    }
}
