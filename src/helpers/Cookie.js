window.deleteCooke = function (key) {
    if (key !== null || key !== '') {
        document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:01 GMT`
    }
}
window.hasCookie = function (key) {
    return document.cookie.split(';').find(cookie => cookie.split('=')[0] === key) !== undefined
}
window.getCookie = function (key) {
    if (this.hasCookie(key)) {
        return document.cookie.split(';').find(cookie => cookie.split('=')[0] === key).split('=')[1]
    }
    return null
}
window.setCookie = function (key, value, expires = null, path = null) {
    if (key !== null || key !== '') {
        if (expires !== null) {
            value += `; expires=${expires}`
        }
        if (path !== null) {
            value += `; path=${path}`
        }

        document.cookie = `${key}=${value}`
    }
}
