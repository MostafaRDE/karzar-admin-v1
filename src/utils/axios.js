import axios from 'axios'
import authObject from '../modules/objects/auth.js'

let instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 30000,
})

// using Interceptors
instance.interceptors.request.use(config => {
    config.headers['Authorization'] = `Bearer ${getCookie(authObject.AUTH_TOKEN)}`
    return config
})

instance.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        window.deleteCooke(authObject.AUTH_TOKEN)
        window.location.replace('/login')
    }
    return error;
});

export default instance
