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

                <rs-table v-if="!loading">
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
                        <th>پایان یافته</th>
                        <th>تیم برنده</th>
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
                                <rs-switchery class="d-inline-block" activeColor="#e91e63" disableColor="#64BD63"
                                              v-model="tournament.finished_at !== null"
                                              @click.native="tournamentFinishedToggle(index)"/>
                                <rs-loading v-if="tournament.loading_finished" class="d-inline-block" icon="spinner4"/>
                            </td>
                            <td>
                                <div class="d-flex align-items-center">
                                    <rs-drop-down :source="tournament.groups"
                                                  v-model="tournament.winning_group"
                                                  @change.native="updateGroup(tournament.id, index)"/>
                                    <rs-loading v-if="tournament.updatingWinningGroup" icon="spinner4" class="ml-2"/>
                                </div>
                            </td>
                            <td>
                                <rs-badge-icon class="cursor-pointer mr-2"
                                               bg="teal-600"
                                               icon="users2"
                                               rounded
                                               @click.native="showPlayersModal(tournament.id, index)"/>
                                <rs-badge-icon class="cursor-pointer mr-2"
                                               bg="teal-600"
                                               icon="pencil6"
                                               rounded
                                               @click.native="showTournamentModal(tournament.id, index)"/>
                            </td>
                        </tr>
                    </template>
                </rs-table>

                <rs-loading v-if="loading" icon="spinner4"/>

                <div class="card-body">
                    <rs-pagination :count="totalPages" v-model="currentPage" @change="updateListByPagination"/>
                </div>
            </div>

            {{ /* Start change wallet amount */ }}
            <rs-form :submit="updateTournamentPlayers" @errors="setFormErrors">
                <rs-modal :dialogStyle="{minWidth: '600px'}"
                          title="بازیکنان تورنومنت"
                          v-model="modals.players.visibility">

                    <rs-table>
                        <template slot="head">
                            <th>ردیف</th>
                            <th>نام کاراکتر</th>
                            <th>تاریخ عضویت</th>
                            <th>گروه</th>
                            <th>تعداد کشته</th>
                            <th>کلید احراز</th>
                        </template>

                        <template slot="body">
                            <tr v-for="(player, index) of modals.players.players">
                                <td class="font-weight-normal">{{ index + 1 }}</td>
                                <td class="font-weight-normal">{{ player.character_name }}</td>
                                <td class="font-weight-normal">{{ player.created_at | moment('jYYYY/jMM/jDD HH:mm:ss') }}</td>
                                <td class="font-weight-normal">{{ player.group_number }}</td>
                                <td>
                                    <rs-input class="mb-0" type="number" placeholder="تعداد کشته" v-model="player.killed_number"/>
                                </td>
                                <td>
                                    <div class="d-flex align-items-center">
                                        <input type="checkbox" v-model="player.is_authentication_room_get"
                                               @click="toggleAuthenticationRoom(index)"/>
                                        <rs-loading v-if="player.loading" icon="spinner4" class="ml-2"/>
                                    </div>
                                </td>
                            </tr>
                        </template>
                    </rs-table>

                    <template slot="footer">
                        <rs-button type="button" color="link" @click.native="modals.players.visibility = false">بستن
                        </rs-button>
                        <rs-button type="submit" bg="primary" :loading="modals.players.saving">ویرایش</rs-button>
                    </template>

                </rs-modal>
            </rs-form>
            {{ /* End change wallet amount */ }}

            {{ /* Start edit tournament */ }}
            <rs-form :submit="updateTournament" @errors="setFormErrors">
                <rs-modal :dialogStyle="{minWidth: '600px'}"
                          title="ویرایش تورنومنت"
                          v-model="modals.tournament.visibility">

                    <div class="row">
                        <div class="col-sm-12">
                            <rs-drop-down :source="statuses"
                                          v-model="modals.tournament.fields.status"/>
                        </div>

                        {{ /* Start titles */ }}
                        <div class="col-sm-12 mt-3">
                            <rs-input placeholder="عنوان (en)"
                                      v-model="modals.tournament.fields.title.en"/>
                        </div>
                        <div class="col-sm-12">
                            <rs-input placeholder="عنوان (af)"
                                      v-model="modals.tournament.fields.title.af"/>
                        </div>
                        {{ /* End titles */ }}

                        {{ /* Start descriptions */ }}
                        <div class="col-sm-12">
                            <rs-input textarea placeholder="توضیحات (en)"
                                      v-model="modals.tournament.fields.description.en"/>
                        </div>
                        <div class="col-sm-12">
                            <rs-input textarea placeholder="توضیحات (af)"
                                      v-model="modals.tournament.fields.description.af"/>
                        </div>
                        {{ /* End descriptions */ }}

                        <div class="col-sm-6">
                            <rs-input type="number"
                                      placeholder="ظرفیت هر گروه"
                                      min="1"
                                      name="groupCapacity"
                                      :error="getInputError('groupCapacity')"
                                      :rule="modals.tournament.fields.groupCapacity"
                                      v-model="modals.tournament.fields.groupCapacity"/>
                        </div>

                        <div class="col-sm-6">
                            <rs-input type="number"
                                      placeholder="ظرفیت کل"
                                      min="10"
                                      name="capacity"
                                      :error="getInputError('capacity')"
                                      :rule="modals.tournament.fields.capacity"
                                      v-model="modals.tournament.fields.capacity"/>
                        </div>

                        <div class="col-sm-6">
                            <rs-input type="number"
                                      placeholder="فی ورود"
                                      name="fee"
                                      :error="getInputError('fee')"
                                      :rule="modals.tournament.fields.fee"
                                      v-model="modals.tournament.fields.fee"/>
                        </div>

                        <div class="col-sm-6">
                            <rs-input placeholder="جایزه"
                                      name="fee"
                                      :error="getInputError('rewardValue')"
                                      :rule="modals.tournament.fields.rewardValue"
                                      v-model="modals.tournament.fields.rewardValue"/>
                        </div>

                        <div class="col-sm-6">
                            <rs-input placeholder="لینک یوتیوب"
                                      name="youtubeLink"
                                      :error="getInputError('youtubeLink')"
                                      :rule="modals.tournament.fields.youtubeLink"
                                      v-model="modals.tournament.fields.youtubeLink"/>
                        </div>

                        <div class="col-sm-6">
                            <date-picker format="YYYY-MM-DD"
                                         display-format="jYYYY/jMM/jDD"
                                         name="startDate"
                                         :error="getInputError('startDate')"
                                         :rule="modals.tournament.fields.startDate"
                                         v-model="modals.tournament.fields.startDate"/>
                        </div>

                        <div class="col-sm-12">
                            <rs-drop-down :source="maps"
                                          name="mapId"
                                          :error="getInputError('mapId')"
                                          :rule="modals.tournament.fields.mapId"
                                          v-model="modals.tournament.fields.mapId"/>
                        </div>

                        <div class="col-sm-6">
                            <rs-input placeholder="نام کاربری"
                                      v-model="modals.tournament.fields.username"/>
                        </div>

                        <div class="col-sm-6">
                            <rs-input placeholder="گذرواژه"
                                      v-model="modals.tournament.fields.password"/>
                        </div>
                    </div>

                    <template slot="footer">
                        <rs-button type="button" color="link" @click.native="modals.tournament.visibility = false">بستن
                        </rs-button>
                        <rs-button type="submit" bg="primary" :loading="modals.tournament.loading">ویرایش</rs-button>
                    </template>

                </rs-modal>
            </rs-form>
            {{ /* End edit tournament */ }}
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
        tournamentSetWinningTeam, maps, tournamentUpdate, finishTournament, updateTournamentPlayers,
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

                formErrors: {},

                maps: [],
                statuses: [
                    { key: 0, value: 'در انتظار' },
                    { key: 3, value: 'منتشر شده' },
                    { key: 4, value: 'معلق شده' },
                ],

                modals: {
                    players: {
                        loading: false,
                        saving: false,
                        visibility: false,
                        index: 0,
                        tournamentId: 0,
                        players: [],
                    },
                    tournament: {
                        loading: false,
                        visibility: false,
                        index: 0,
                        tournamentId: 0,

                        fields: {
                            title: {
                                af: '',
                                en: '',
                            },
                            description: {
                                af: '',
                                en: '',
                            },
                            capacity: 0,
                            startDate: '',
                            rewardValue: '',
                            fee: 0,
                            status: 0,
                            youtubeLink: '',
                            mapId: 0,
                            groupCapacity: 0,
                            username: 0,
                            password: 0,

                            rules: {
                                capacity: 'required',
                                startDate: 'required',
                                rewardValue: 'required|string',
                                fee: 'required',
                                status: 'required',
                                youtubeLink: '',
                                mapId: 'required',
                                groupCapacity: 'required',
                            }
                        }
                    },
                }
            }
        },

        methods: {
            getTournaments () {
                this.loading = true

                tournaments(this.search, this.currentPage).then(response => {
                    let totalPages = response.data.total / this.itemsPerPage
                    this.totalPages = (totalPages % 1 !== 0) ? Math.floor(totalPages) + 1 : totalPages;
                    console.log(0)
                    for (let i = 0; i < response.data.result.length; i++) {
                        let tempGroups = response.data.result[i].groups || '';
                        response.data.result[i]['groups'] = tempGroups.split(',').map((group, index) => ({
                            key: index + 1,
                            value: group,
                        }))
                        console.log(1)
                        response.data.result[i]['groups'].unshift({
                            key: 0,
                            value: 'مشخص نشده'
                        })
                        console.log(2)
                        response.data.result[i]['winning_group'] = response.data.result[i]['winning_group'] || 0
                        response.data.result[i]['updatingWinningGroup'] = false
                        console.log(3)
                    }
                    this.tournaments = response.data.result
                }).catch(error => {
                    console.log(error)
                    this.$toast.error({
                        title: 'خطا',
                        message: 'خطا در دریافت توزنومنت ها',
                    })
                }).finally(() => {
                    this.loading = false
                })
            },

            updateGroup (tournamentId, index) {
                console.log(tournamentId, index)
                this.tournaments[index].updatingWinningGroup = true

                tournamentSetWinningTeam(tournamentId, this.tournaments[index].winning_group)
                    .then(response => {
                        this.$toast.success({
                            title: 'تیم برنده',
                            message: 'تیم برنده با موفقیت بروزرسانی شد',
                        })
                        this.getTournaments()
                    })
                    .catch(error => {
                        this.$toast.error({
                            title: 'خطا',
                            message: 'خطا در بروزرسانی تیم برنده',
                        })
                    })
                    .finally(() => {
                        this.tournaments[index].updatingWinningGroup = false
                    })
            },

            tournamentFinishedToggle (index) {
                this.tournaments[index].loading_finished = true
                if (this.tournaments[index].finished_at === null) {
                    finishTournament(this.tournaments[index].id)
                        .then(response => {
                            this.tournaments[index].finished_at = moment().format()
                            this.$toast.success({
                                title: 'وضعیت پایان',
                                message: 'تورنومنت با موفقیت پایان یافت',
                            })
                        })
                        .catch(error => {
                            this.$toast.error({
                                title: 'وضعیت پایان',
                                message: 'پایان دادن به تورنومنت با شکست مواجه شد',
                            })
                        })
                        .finally(() => {
                            this.tournaments[index].loading_finished = false
                        })
                }
            },

            updateListByPagination () {
                this.getUsers()
            },

            // Get errors from "rs-form"-component and set in "formErrors"-data-variable
            setFormErrors (errors) {
                this.formErrors = errors
            },

            // Customizing error-message for show in view (below inputs)
            getInputError (key) {
                return (this.formErrors.hasOwnProperty(key)) ? this.formErrors[key][0] : ''
            },

            // <editor-fold desc="Tournament">

            showTournamentModal (tournamentId, index) {
                this.modals.tournament.visibility = true
                this.modals.tournament.index = index
                this.modals.tournament.tournamentId = tournamentId

                this.modals.tournament.fields.title.af = this.tournaments[index].title.af
                this.modals.tournament.fields.title.en = this.tournaments[index].title.en
                this.modals.tournament.fields.description.af = this.tournaments[index].description.af
                this.modals.tournament.fields.description.en = this.tournaments[index].description.en
                this.modals.tournament.fields.capacity = this.tournaments[index].capacity
                this.modals.tournament.fields.startDate = this.tournaments[index].start_date
                this.modals.tournament.fields.rewardValue = this.tournaments[index].reward_value
                this.modals.tournament.fields.fee = this.tournaments[index].fee
                this.modals.tournament.fields.status = this.tournaments[index].status
                this.modals.tournament.fields.youtubeLink = this.tournaments[index].youtube_link
                this.modals.tournament.fields.mapId = this.tournaments[index].map_id
                this.modals.tournament.fields.groupCapacity = this.tournaments[index].group_capacity
                this.modals.tournament.fields.username = this.tournaments[index].username
                this.modals.tournament.fields.password = this.tournaments[index].password
            },

            updateTournament () {
                this.modals.tournament.loading = true

                tournamentUpdate(
                    this.modals.tournament.tournamentId,
                    this.modals.tournament.fields.title,
                    this.modals.tournament.fields.description,
                    this.modals.tournament.fields.capacity,
                    this.modals.tournament.fields.startDate,
                    this.modals.tournament.fields.rewardValue,
                    this.modals.tournament.fields.fee,
                    this.modals.tournament.fields.status,
                    this.modals.tournament.fields.youtubeLink,
                    this.modals.tournament.fields.mapId,
                    this.modals.tournament.fields.groupCapacity,
                    this.modals.tournament.fields.username,
                    this.modals.tournament.fields.password
                ).then(response => {
                    this.$toast.success({
                        title: 'ویرایش تورنومنت',
                        message: 'بروزرسانی با موفقیت انجام شد',
                    })

                    this.modals.tournament.visibility = false
                    this.getTournaments()
                }).catch(error => {
                    this.$toast.error({
                        title: 'ویرایش تورنومنت',
                        message: 'بروزرسانی با شکست مواجه شد',
                    })
                }).finally(() => {
                    this.modals.tournament.loading = false
                })
            },

            // </editor-fold>

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

            toggleAuthenticationRoom (index) {
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
            },

            updateTournamentPlayers() {
                if (!this.modals.players.saving) {
                    this.modals.players.saving = true
                    let data = this.modals.players.players.map(({player_id, killed_number}) => ({id: player_id, killed_number}))
                    updateTournamentPlayers(this.modals.players.tournamentId, data)
                        .then(res => {
                            this.$toast.success({
                                title: 'بروزرسانی لیست بازیکنان تورنومنت',
                                message: 'با موفقیت انجام شد',
                            })
                        })
                        .catch(err => {
                            this.$toast.error({
                                title: 'بروزرسانی لیست بازیکنان تورنومنت',
                                message: err.response.data.msg,
                            })
                        })
                        .finally(() => {
                            this.modals.players.saving = false
                        })
                }
            }

            // </editor-fold>
        },

        mounted () {
            this.getTournaments()
            maps()
                .then(response => {
                    this.maps = response.data.result.map(map => ({
                        key: map.id,
                        value: map.name.en
                    }))
                })
                .catch(error => {

                })
        }
    }
</script>
