import axios from '../utils/axios.js'

export async function login(username, password) {
    const data = {username, password}

    return axios.post('login?lang=fa', data)
}
