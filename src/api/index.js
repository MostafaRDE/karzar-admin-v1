import axios from '../utils/axios.js'

export async function create(national_number, id_number, name, family, father_name, mobile, phone, email, date_of_birth) {
    const data = {national_number, id_number, name, family, father_name, mobile, phone, email, date_of_birth}

    return axios.post('add?lang=fa', data)
}

export async function login(username, password) {
    const data = {username, password}

    return axios.post('login?lang=fa', data)
}
