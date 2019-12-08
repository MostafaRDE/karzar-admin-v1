import objectsAuth from '../modules/objects/auth'

export function beforeEachCreator() {
    return function beforeEach(to, from, next) {
        let userAuth = window.hasCookie('AUTH_TOKEN')

        // Check data of "meta"-key of routes
        // If "auth"-key in "meta"-key equals "true"
        if (to.matched.some(record => record.meta.auth === true)) {
            // Then if "user_auth" equals false
            if (!userAuth)
            // Redirect to login route
                return next({name: 'login'});
        }
        // Else if "auth"-key in "meta"-key equals "false"
        else if (to.matched.some(record => record.meta.auth === false)) {
            // Then if "user_auth" equals true
            if (userAuth)
            // Redirect trade console route
                return next({name: 'dashboard'});
        }

        return next();
    }
}
