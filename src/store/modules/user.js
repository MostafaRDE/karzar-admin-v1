export default {
    namespaced: true,

    state: {
        name: 'مصطفی',
        surname: 'رستم دخت عفتی',
        role: 'SUPER_ADMIN',
        userImage: require('@/assets/global_assets/images/image.png'),
    },

    getters: {
        fullName(state) {
            return `${state.name} ${state.surname}`
        },
        roleLabel(state) {
            switch (state.role) {
                case 'SUPER_ADMIN':
                    return 'مدیر کل'

                case 'ADMIN':
                    return 'مدیر'

                default:
                    return 'مشخص نشده'
            }
        }
    }
}
