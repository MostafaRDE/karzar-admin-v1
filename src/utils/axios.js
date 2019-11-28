import axios from 'axios'

let instance = axios.create({
    baseURL: 'http://127.0.0.1:8080/api/v1/admin/',
    timeout: 30000,
})

// using Interceptors
instance.interceptors.request.use(config => {
    config.headers.post['Authorization'] = 'AUTH_TOKEN'
    return config
})

export default instance
