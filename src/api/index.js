import axios from '../utils/axios.js'

export const itemsPerPage = 10

export async function create(name, whatsapp_number, email, password) {
    const data = {name, whatsapp_number, email, password}
    return axios.post('users?lang=fa', data)
}

export async function login(username, password) {
    const data = {username, password}
    return axios.post('login?lang=fa', data)
}

// <editor-fold desc="Users">

export async function users(filter = null, search = null, page = null, size = itemsPerPage) {
    let url = 'users?lang=fa';
    if (filter)
        url += `&filter=${filter}`;
    if (search && search !== '')
        url += `&search=${search}`;
    if (page)
        url += `&page=${page}&size=${size}`;

    return axios.get(url)
}

export async function createWalletForUser (user_id, amount = 0) {
    const data = {amount}
    return axios.post(`users/${user_id}/create-wallet?lang=fa`, data)
}

export async function updateWalletAmount (wallet_id, amount) {
    const data = {amount}
    return axios.put(`payments/wallets/${wallet_id}?lang=fa`, data)
}

export async function blockUser (user_id) {
    return axios.delete(`users/${user_id}/block`)
}

export async function unblockUser (user_id) {
    return axios.post(`users/${user_id}/unblock`)
}

export async function updatePassword (user_id, password) {
    const data = {password}
    return axios.put(`users/${user_id}/update-password?lang=fa`, data)
}

export async function updateProfile (user_id, name, email, whatsapp_number, image = null) {
    let formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('whatsapp_number', whatsapp_number)
    formData.append('image', image)

    return axios.put(`users/${user_id}?lang=fa`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

// </editor-fold>

// <editor-fold desc="Tournaments">

export async function tournaments(search = null, page = null, size = itemsPerPage) {
    return axios.get('games/pubg/tournaments?lang=af')
}

export async function createTournament(title, description, capacity, startDate, rewardValue, fee, status, youtubeLink, groupCapacity, mapId) {
    let data = {title, description, capacity, startDate, rewardValue, fee, status, youtubeLink, mapId, groupCapacity}

    return axios.post(`games/pubg/tournaments?lang=af`, data)
}

export async function tournament(id) {
    return axios.get(`games/pubg/tournaments/${id}?lang=af`)
}

export async function tournamentPlayers(id) {
    return axios.get(`games/pubg/tournaments/${id}/players?lang=af`)
}

export async function addAuthenticationRoomToGroupPlayers(tournamentId, groupId) {
    return axios.put(`games/pubg/tournaments/${tournamentId}/players/${groupId}/add-room-details`)
}

export async function removeAuthenticationRoomToGroupPlayers(tournamentId, groupId) {
    return axios.put(`games/pubg/tournaments/${tournamentId}/players/${groupId}/remove-room-details`)
}

export async function maps() {
    return axios.get('games/pubg/maps')
}

export async function addMap(name, image = null) {
    console.log(name)
    let formData = new FormData()
    formData.append('name', name)
    formData.append('image', image)

    return axios.post('games/pubg/maps?lang=fa', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

export async function updateMap(map_id, name, image = null) {
    console.log(name)
    let formData = new FormData()
    formData.append('name', name)
    formData.append('image', image)

    return axios.put(`games/pubg/maps/${map_id}?lang=fa`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

// </editor-fold>

// <editor-fold desc="Gateways">

export async function gateways () {
    return axios.get(`gateways`)
}

export async function storeGateway (name, key1, key2, image) {
    let formData = new FormData()
    formData.append('name', name)
    formData.append('key1', key1)
    formData.append('key2', key2)
    formData.append('image', image)

    return axios.post(`gateways`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

export async function updateGateway (id, name, key1, key2, image) {
    let formData = new FormData()
    formData.append('name', name)
    formData.append('key1', key1)
    formData.append('key2', key2)
    formData.append('image', image)

    return axios.put(`gateways/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

// </editor-fold>

// <editor-fold desc="Transactions">

export async function transactions() {
    return axios.get(`payments/transactions`)
}

export async function updateTransactionStatus(id) {
    return axios.get(`payments/transactions/${id}/status`)
}

// </editor-fold>
