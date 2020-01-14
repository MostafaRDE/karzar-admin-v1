import axios from '../utils/axios.js'

export const itemsPerPage = 10

export async function create(name, whatsapp_number, email, password) {
    const data = {name, whatsapp_number, email, password}
    return axios.post('users?lang=fa', data)
}

export async function login(username, password, g_code) {
    const data = {username, password, g_code}
    return axios.post('login?lang=fa', data)
}

export async function profileChangePassword (current_password, new_password) {
    let data = {current_password, new_password}
    return axios.put('profile/change-password?lang=fa', data)
}

// <editor-fold desc="Admins">

export async function permissions () {
    return axios.get('permissions')
}

export async function admins () {
    return axios.get('admins')
}

export async function storeAdmin (name, email, username, password, role) {
    const data = {name, email, username, password, role}
    return axios.post('admins', data)
}

export async function updateAdmin (id, name, email, username, role) {
    const data = {name, email, username, role}
    return axios.put(`admins/${id}`, data)
}

export async function updateAdmin2fa (id) {
    return axios.put(`admins/${id}/2fa`)
}

export async function updateAdminPassword (id, password) {
    const data = {password}
    return axios.put(`admins/${id}/password`, data)
}

export async function updateAdminPermissions (id, permissions = []) {
    const data = {permissions}
    return axios.put(`admins/${id}/permissions?lang=fa`, data)
}

export async function blockAdmin (id) {
    return axios.delete(`admins/${id}/block`)
}

export async function unblockAdmin (id) {
    return axios.put(`admins/${id}/unblock`)
}

// </editor-fold>

// <editor-fold desc="Users">

export async function users (filter = null, search = null, page = null, size = itemsPerPage) {
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

export async function tournamentUpdate(id, title, description, capacity, startDate, rewardValue, fee, status, youtubeLink, mapId, groupCapacity, username, password) {
    let data = {title, description, capacity, startDate, rewardValue, fee, status, youtubeLink, mapId, groupCapacity, username, password}
    console.log(data)
    return axios.put(`games/pubg/tournaments/${id}?lang=af`, data)
}

export async function tournamentSetWinningTeam(id, group_number) {
    let data = {group_number}
    return axios.put(`games/pubg/tournaments/${id}/set-winner-team?lang=af`, data)
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

export async function updateTransactionAmount (id, amount) {
    let data = {amount};
    return axios.put(`payments/transactions/${id}/amount`, data)
}

export async function updateTransactionStatus(id, status, status_description) {
    let data = {status, status_description};

    return axios.put(`payments/transactions/${id}/status`, data)
}

// </editor-fold>

// <editor-fold desc="Tutorials">

export async function tutorials () {
    return axios.get('tutorials?lang=fa')
}

// </editor-fold>
