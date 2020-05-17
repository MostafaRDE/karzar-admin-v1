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

export async function finishTournament (id) {
    return axios.put(`games/pubg/tournaments/${id}/end?lang=fa`)
}

export async function tournamentUpdate(id, title, description, capacity, startDate, rewardValue, fee, status, youtubeLink, mapId, groupCapacity, username, password) {
    let data = {title, description, capacity, startDate, rewardValue, fee, status, youtubeLink, mapId, groupCapacity, username, password}

    return axios.put(`games/pubg/tournaments/${id}?lang=af`, data)
}

export async function tournamentSetWinningTeam(id, group_number) {
    let data = {group_number}
    return axios.put(`games/pubg/tournaments/${id}/set-winner-team?lang=af`, data)
}

export async function tournamentPlayers(id) {
    return axios.get(`games/pubg/tournaments/${id}/players?lang=af`)
}

export async function updateTournamentPlayers(id, data) {
    return axios.put(`games/pubg/tournaments/${id}/players?lang=af`, data)
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
    let formData = new FormData()
    formData.append('name', name)
    formData.append('image', image)

    return axios.put(`games/pubg/maps/${map_id}?lang=fa`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

// </editor-fold>

// <editor-fold desc="Gateways">

/**
 * @param type => 0: Deposit , 1: Withdraw
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function gateways (type) {
    return axios.get(`gateways?&type=${type}`)
}

/**
 * @param name
 * @param key1
 * @param key2
 * @param image
 * @param type => 0: Deposit , 1: Withdraw
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function storeGateway (name, key1, key2, image, type) {
    let formData = new FormData()
    formData.append('name', name)
    formData.append('key1', key1)
    formData.append('key2', key2)
    formData.append('image', image)
    formData.append('type', type)

    return axios.post(`gateways`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

/**
 * @param id
 * @param name
 * @param key1
 * @param key2
 * @param image
 * @param type => 0: Deposit , 1: Withdraw
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function updateGateway (id, name, key1, key2, image, type) {
    let formData = new FormData()
    formData.append('name', name)
    formData.append('key1', key1)
    formData.append('key2', key2)
    formData.append('image', image)
    formData.append('type', type)

    return axios.put(`gateways/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

// </editor-fold>

// <editor-fold desc="Tickets">

export async function tickets (page = null, itemsPerPage = itemsPerPage, status, category, ticket_id, mobile) {
    let query = `lang=fa`
    if (page)
        query += `&page=${page}&size=${itemsPerPage}`
    if (status)
        query += `&status=${status}`
    if (category)
        query += `&category=${category}`
    if (ticket_id)
        query += `&ticket_id=${ticket_id}`
    if (mobile)
        query += `&mobile=${mobile}`

    return axios.get(`ticket?${query}`)
}

export async function ticketMessages (ticket_id, page = null, itemsPerPage = itemsPerPage) {
    let query = `lang=fa`
    if (page)
        query += `&page=${page}&size=${itemsPerPage}`

    return axios.get(`ticket/message/${ticket_id}/a?${query}`)
}

export async function ticketUpdateFileMessage (ticket_id, file) {
    let query = `lang=fa`
    let formData = new FormData()
    formData.append('ticket_id', ticket_id)
    formData.append('file', file)

    return axios.post(`ticket/message/file/a?${query}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

export async function ticketUpdateTextMessage (ticket_id, message) {
    let query = `lang=fa`
    let data = {ticket_id, message}

    return axios.post(`ticket/message/text/a?${query}`, data)
}

export async function ticketChangeStatus (ticket_id, status) {
    let query = `lang=fa`,
        data = {ticket_id, status}
    return axios.put(`ticket/status?${query}`, data)
}

export async function ticketCategories () {
    let query = `lang=fa`

    return axios.get(`ticket/category?${query}`)
}

export async function ticketAddCategory (name, parent = null, des = '') {
    let query = `lang=fa`,
        data = {name, parent, des}

    return axios.post(`ticket/category?${query}`, data)
}

export async function ticketUpdateCategory (category_id = null, name, status = true, des = '') {
    let query = `lang=fa`,
        data = {name, status, category_id, des}

    return axios.put(`ticket/category?${query}`, data)
}

export async function ticketDeleteCategory (category_id) {
    let query = `lang=fa`

    return axios.delete(`ticket/category/${category_id}?${query}`)
}

// </editor-fold>

// <editor-fold desc="Transactions">

/**
 * @param type => INPUT | OUTPUT
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function transactions(type) {
    return axios.get(`payments/transactions?type=${type}`)
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

export async function storeTutorial (title, text, youtube_link, image) {
    let formData = new FormData()
    formData.append('title', title)
    formData.append('text', text)
    formData.append('youtube_link', youtube_link)
    formData.append('image', image)

    return axios.post('tutorials?lang=fa', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

export async function updateTutorial (id, title, text, youtube_link, image) {
    let formData = new FormData()
    formData.append('title', title)
    formData.append('text', text)
    formData.append('youtube_link', youtube_link)
    formData.append('image', image)

    return axios.put(`tutorials/${id}?lang=fa`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

export async function deleteTutorial (id) {
    return axios.delete(`tutorials/${id}?lang=fa`)
}

// </editor-fold>
