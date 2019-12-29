<template>
    <div>
        <!-- Basic card -->
        <div class="card">
            <div class="card-body">
                <div>
                    <rs-input placeholder="جستجو براساس جایزه، فی و لینک یوتیوب" v-model="search"
                              @input="getTournaments"/>
                    <div class="d-flex">
                        <rs-button class="mr-3" color="light" icon="medal-star"
                                   @click.native="$router.push({name: 'tournamentCreate'})">
                            ایجاد تورنومنت
                        </rs-button>
                        <rs-button class="mr-3" color="light" icon="map5"
                                   @click.native="$router.push({name: 'mapsList'})">
                            نقشه ها
                        </rs-button>
                    </div>
                </div>
            </div>
        </div>
        <div>

        </div>
        <div>
            <div class="card">
                <div class="card-header header-elements-inline">
                    <h5 class="card-title">تورنومنت ها</h5>
                </div>

                <rs-table>
                    <template slot="head">
                        <th>ردیف</th>
                        <th>عنوان</th>
                        <th>تاریخ شروع</th>
                        <th>ظرفیت کل</th>
                        <th>اندازه هر گروه</th>
                        <th>نقشه</th>
                        <th>فی</th>
                        <th>جایزه</th>
                        <th>لینک یوتیوب</th>
                        <th></th>
                    </template>

                    <template slot="body">
                        <tr v-for="(tournament, index) of tournaments">
                            <td>{{ index + 1 }}</td>
                            <td class="select-text">{{ tournament.title.af }}</td>
                            <td class="select-text" style="direction: ltr">
                                <rs-badge pill color="primary" class="font-size-sm">{{ tournament.start_date |
                                    moment('jYYYY/jMM/jDD HH:mm:ss') }}
                                </rs-badge>
                            </td>
                            <td class="select-text">{{ tournament.capacity }} نفر</td>
                            <td class="select-text">{{ tournament.group_capacity }} نفر</td>
                            <td class="select-text">
                                <rs-badge pill color="primary" class="font-size-sm">{{ tournament.map.name.en }}
                                </rs-badge>
                            </td>
                            <td class="select-text">{{ tournament.fee }}$</td>
                            <td class="select-text">{{ tournament.reward_value }}</td>
                            <td :class="{'select-text': tournament.youtube_link}">
                                <a :href="tournament.youtube_link || 'javascript:void(0)'"
                                   :target="tournament.youtube_link ? '_blank' : ''">{{ tournament.youtube_link ||
                                    'ندارد' }}</a>
                            </td>
                            <td>
                                <rs-badge-icon class="cursor-pointer mr-2"
                                               bg="teal-600"
                                               icon="users2"
                                               rounded
                                               @click.native="showPlayersModal(tournament.id, index)"/>
                            </td>
                        </tr>
                    </template>
                </rs-table>

                <div class="card-body">
                    <rs-pagination :count="totalPages" v-model="currentPage" @change="updateListByPagination"/>
                </div>
            </div>

            {{ /* Start change wallet amount */ }}
            <rs-modal :dialogStyle="{minWidth: '600px'}"
                      title="بازیکنان تورنومنت"
                      v-model="modals.players.visibility">

                <rs-table>
                    <template slot="head">
                        <th>ردیف</th>
                        <th>نام کاراکتر</th>
                        <th>تاریخ عضویت</th>
                        <th>گروه</th>
                        <th>کلید احراز</th>
                    </template>

                    <template slot="body">
                        <tr v-for="(player, index) of modals.players.players">
                            <td>{{ index + 1 }}</td>
                            <td>{{ player.character_name }}</td>
                            <td>{{ player.created_at | moment('jYYYY/jMM/jDD HH:mm:ss') }}</td>
                            <td>{{ player.group_number }}</td>
                            <td class="d-flex align-items-center">
                                <input type="checkbox" v-model="player.is_authentication_room_get" @click="toggleAuthenticationRoom(index)"/>
                                <rs-loading v-if="player.loading" icon="spinner4" class="ml-2"/>
                            </td>
                        </tr>
                    </template>
                </rs-table>

                <template slot="footer">
                    <rs-button type="button" color="link" @click.native="modals.players.visibility = false">بستن
                    </rs-button>
                    <rs-button type="submit" bg="primary" :loading="modals.players.loading">ویرایش</rs-button>
                </template>

            </rs-modal>
            {{ /* End change wallet amount */ }}
        </div>
    </div>
</template>

<script>
    import {
        itemsPerPage,
        tournaments,
        tournamentPlayers,
        addAuthenticationRoomToGroupPlayers,
        removeAuthenticationRoomToGroupPlayers,
    } from '../../../api'

    const moment = require('moment')

    export default {
        name: 'List',

        metaInfo: {
            title: 'تورنومنت ها'
        },

        breadcrumb: () => ([
            { label: 'پیشخوان', to: '/', icon: 'home4' },
            { label: 'تورنومنت ها', to: '/tournaments', icon: 'medal-star' },
        ]),

        data () {
            return {
                change: false,
                currentPage: 1,
                itemsPerPage,
                loading: false,

                tournaments: [],
                totalPages: 0,
                search: '',

                modals: {
                    players: {
                        loading: false,
                        visibility: false,
                        index: 0,
                        tournamentId: 0,
                        players: [],
                    },
                }
            }
        },

        methods: {
            getTournaments () {
                this.loading = true

                tournaments(this.search, this.currentPage).then(response => {
                    let totalPages = response.data.total / this.itemsPerPage
                    this.totalPages = (totalPages % 1 !== 0) ? Math.floor(totalPages) + 1 : totalPages
                    this.tournaments = response.data.result
                }).catch(error => {
                    this.$toast.error({
                        title: 'خطا',
                        message: 'خطا در دریافت توزنومنت ها',
                    })
                }).finally(() => {
                    this.loading = false
                })
            },

            updateListByPagination () {
                this.getUsers()
            },

            // <editor-fold desc="Update amount wallet">

            showPlayersModal (tournamentId, index) {
                this.modals.players.visibility = true
                this.modals.players.index = index
                this.modals.players.tournamentId = tournamentId
                this.getPlayers(tournamentId)
            },

            getPlayers (tournamentId) {
                this.modals.players.loading = true

                tournamentPlayers(tournamentId)
                    .then(response => {
                        this.modals.players.players = response.data.result.map(player => {
                            player.loading = false
                            return player
                        })
                    })
                    .catch(error => {
                        this.$toast.error({
                            title: 'خطا',
                            message: 'خطا در دریافت بازیکنان',
                        })
                    })
                    .finally(() => {
                        this.modals.players.loading = false
                    })
            },

            toggleAuthenticationRoom(index) {
                this.modals.players.players[index].loading = true

                if (!this.modals.players.players[index].is_authentication_room_get) {
                    addAuthenticationRoomToGroupPlayers(this.modals.players.players[index].tournament_id, this.modals.players.players[index].player_id).then(response => {
                        this.modals.players.players[index].is_authentication_room_get = true
                    }).catch(error => {
                        this.$toast.error({
                            title: 'خطا',
                            message: 'خطا در فعال سازی احراز روم',
                        })
                    }).finally(() => {
                        this.modals.players.players[index].loading = false
                    })
                } else {
                    removeAuthenticationRoomToGroupPlayers(this.modals.players.players[index].tournament_id, this.modals.players.players[index].player_id).then(response => {
                        this.modals.players.players[index].is_authentication_room_get = false
                    }).catch(error => {
                        this.$toast.error({
                            title: 'خطا',
                            message: 'خطا در غیر فعال سازی احراز روم',
                        })
                    }).finally(() => {
                        this.modals.players.players[index].loading = false
                    })
                }
            }

            // </editor-fold>
        },

        mounted () {
            this.getTournaments()
        }
    }
</script>
