import axios from 'axios'
import authObject from '../modules/objects/auth.js'

let instance = axios.create({
    baseURL: 'http://shopcode.ir:9002/api/v1/admin/',
    timeout: 30000,
})

// using Interceptors
instance.interceptors.request.use(config => {
    config.headers.post['Authorization'] = `Bearer ${getCookie(authObject.AUTH_TOKEN)}`
    return config
})

export default instance
