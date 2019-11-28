import objectsAuth from '../modules/objects/auth.js'

window.userAuth = function () {
    return window.hasCookie(objectsAuth.AUTH_TOKEN)
}

window.userData = function () {
    return parseJwt(window.getCookie(objectsAuth.AUTH_TOKEN))
}
