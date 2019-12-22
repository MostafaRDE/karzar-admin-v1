<template>
    <div>
        <!-- Basic card -->
        <div class="card">
            <div class="card-body">
                <div>
                    <rs-input placeholder="جستجو براساس عنوان، جایزه، فی، نام نقشه و لینک یوتیوب"/>
                    <div class="d-flex">
                        <rs-button class="mr-3" color="light" icon="medal-star" @click.native="$router.push({name: 'userCreate'})">
                            ایجاد تورنومنت
                        </rs-button>
                        <rs-button class="mr-3" color="light" icon="googleplus5" @click.native="$router.push({name: 'userCreate'})">
                            رزرو اتاق
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
                            <td class="select-text">{{ tournament.title }}</td>
                            <td class="select-text" style="direction: ltr">
                                <rs-badge pill color="primary" class="font-size-sm">{{ tournament.start_date | moment("jYYYY/jMM/jDD H:m:s") }}</rs-badge>
                            </td>
                            <td class="select-text">{{ tournament.capacity }} نفر</td>
                            <td class="select-text">{{ tournament.group_capacity }} نفر</td>
                            <td class="select-text">
                                <rs-badge pill color="primary" class="font-size-sm">{{ tournament.map.name }}</rs-badge>
                            </td>
                            <td class="select-text">{{ tournament.fee }}$</td>
                            <td class="select-text">{{ tournament.reward_value }}</td>
                            <td class="select-text">
                                <a :href="tournament.youtube_link" target="_blank">{{ tournament.youtube_link }}</a>
                            </td>
                            <td>
                                <rs-badge-icon class="cursor-pointer mr-2"
                                               color="primary"
                                               icon="pencil6"
                                               rounded
                                               @click.native="showEditProfileModal(index)"/>
                                <rs-badge-icon class="cursor-pointer mr-2"
                                               bg="teal-600"
                                               icon="users2"
                                               rounded
                                               @click.native="showChangeAmountWalletModal(tournament.id, index)"/>
                                <rs-badge-icon class="cursor-pointer mr-2"
                                               color="danger"
                                               icon="trash"
                                               rounded
                                               @click.native="showChangePasswordModal(index)"/>
                            </td>
                        </tr>
                    </template>
                </rs-table>

                <div class="card-body">
                    <rs-pagination :count="20" v-model="currentPage"/>
                </div>
            </div>

            {{ /* Start change wallet amount */ }}
            <rs-form :submit="updateWalletAmount"
                     @errors="setFormErrorsWallet($event)">
                <rs-modal :dialogStyle="{minWidth: '400px'}"
                          title="موجودی کیف پول"
                          v-model="modals.wallet.visibility">

                    <rs-input placeholder="موجودیا"
                              class="mb-0"
                              maxlength="24"
                              name="amount"
                              :rules="modals.wallet.fields.rules.amount"
                              :error="getInputErrorWallet('amount')"
                              v-model="modals.wallet.fields.amount"/>

                    <template slot="footer">
                        <rs-button type="button" color="link" @click.native="modals.wallet.visibility = false">بستن
                        </rs-button>
                        <rs-button type="submit" bg="primary" :loading="modals.wallet.loading">ویرایش</rs-button>
                    </template>

                </rs-modal>

            </rs-form>
            {{ /* End change wallet amount */ }}

            {{ /* Start update profile */ }}
            <rs-form :submit="updateProfile"
                     @errors="setFormErrorsEditProfile($event)">

                <rs-modal :dialogStyle="{minWidth: '600px'}"
                          title="ویرایش پروفایل"
                          v-model="modals.edit.visibility">

                    <div class="d-flex">
                        <div class="flex-grow-1">
                            <label>عکس پروفایل</label>
                            <rs-input type="file"
                                      placeholder="عکس پروفایل"
                                      name="imageProfile"
                                      :error="getInputErrorWallet('imageProfile')"
                                      @change.native="changeProfileImage"/>
                        </div>
                        <div class="ml-2" style="width: 70px">
                            <img ref="profileImage"
                                 :src="modals.edit.profileImageURL || modals.edit.profileDefaultImage"
                                 alt="" class="w-100"/>
                        </div>
                    </div>

                    <rs-input placeholder="نام"
                              name="name"
                              :rules="modals.edit.fields.rules.name"
                              :error="getInputEditProfile('name')"
                              v-model="modals.edit.fields.name"/>

                    <rs-input type="email"
                              placeholder="ایمیل"
                              name="email"
                              :rules="modals.edit.fields.rules.email"
                              :error="getInputEditProfile('email')"
                              v-model="modals.edit.fields.email"/>

                    <rs-input type="tel"
                              placeholder="شماره واتس اپ"
                              name="whatsappNumber"
                              :rules="modals.edit.fields.rules.whatsappNumber"
                              :error="getInputEditProfile('whatsappNumber')"
                              v-model="modals.edit.fields.whatsappNumber"/>

                    <template slot="footer">
                        <rs-button type="button" color="link" @click.native="modals.edit.visibility = false">بستن
                        </rs-button>
                        <rs-button type="submit" bg="primary" :loading="modals.edit.loading">ویرایش</rs-button>
                    </template>

                </rs-modal>

            </rs-form>
            {{ /* Edit update profile */ }}

            {{ /* Start change password */ }}
            <rs-form :submit="updatePassword"
                     @errors="setFormErrorsChangePassword($event)">
                <rs-modal :dialogStyle="{minWidth: '400px'}"
                          title="تغییر گذرواژه"
                          v-model="modals.password.visibility">

                    <rs-input type="password"
                              placeholder="گذرواژه"
                              name="password"
                              :rules="modals.password.fields.rules.password"
                              :error="getInputErrorPassword('password')"
                              v-model="modals.password.fields.password"/>

                    <rs-input type="password"
                              placeholder="تکرار گذرواژه"
                              class="mb-0"
                              name="retype-password"
                              :rules="modals.password.fields.rules.retypePassword"
                              :error="getInputErrorPassword('retype-password')"
                              v-model="modals.password.fields.retypePassword"/>

                    <template slot="footer">
                        <rs-button type="button" color="link" @click.native="modals.password.visibility = false">بستن
                        </rs-button>
                        <rs-button type="submit" bg="primary" :loading="modals.password.loading">ویرایش</rs-button>
                    </template>

                </rs-modal>

            </rs-form>
            {{ /* End change password */ }}
        </div>
    </div>
</template>

<script>
    import {
        tournaments
    } from '../../../api'

    const moment = require('moment')

    export default {
        name: 'List',

        metaInfo: {
            title: 'تورنومنت ها'
        },

        breadcrumb: () => ([
            { label: 'پیشخوان', to: '/', icon: 'home4' },
            { label: 'تورنومنت ها', to: '/', icon: 'medal-star' },
        ]),

        data() {
            return {
                change: false,
                currentPage: 1,

                tournaments: [],
                usersTotal: 0,

                modals: {
                    wallet: {
                        loading: false,
                        visibility: false,
                        index: 0,
                        walletId: 0,
                        formErrors: {},

                        fields: {
                            amount: 0,

                            rules: {
                                amount: 'required|min:0',
                            }
                        }
                    },
                    edit: {
                        loading: false,
                        visibility: false,
                        index: 0,
                        formErrors: {},
                        profileImageURL: null,
                        profileDefaultImage: require('./../../../../public/images/samples/circle-profile.svg'),

                        fields: {
                            name: '',
                            email: '',
                            whatsappNumber: '',
                            image: null,

                            rules: {
                                name: 'required|string|min:2',
                                email: 'required|email',
                                whatsappNumber: 'required|string:digits',
                            }
                        }
                    },
                    password: {
                        loading: false,
                        visibility: false,
                        index: 0,
                        formErrors: {},

                        fields: {
                            password: '',
                            retypePassword: '',

                            rules: {
                                password: 'required|password|min:6',
                                retypePassword: 'required|confirm_password',
                            }
                        }
                    }
                }
            }
        },

        methods: {
            getUsers() {

                tournaments().then(response => {
                    this.tournaments = response.data.result
                    console.log(this.tournaments[0].start_date , moment(this.tournaments[0].start_date).format( "jYYYY"))
                }).catch(error => {
                    this.$toast.error({
                        title: '',
                        message: '',
                    })
                }).finally(() => {

                })
            },

            // <editor-fold desc="Update amount wallet">

            showChangeAmountWalletModal (walletId, index) {
                this.modals.wallet.visibility = true
                this.modals.wallet.index = index
                this.modals.wallet.walletId = walletId
                this.modals.wallet.fields.amount = `${this.users[index].amount || 0}`
            },

            // Get errors from "rs-form"-component and set in "formErrors"-data-variable
            setFormErrorsWallet (errors) {
                this.modals.wallet.formErrors = errors
            },

            // Customizing error-message for show in view (below inputs)
            getInputErrorWallet (key) {
                return (this.modals.wallet.formErrors.hasOwnProperty(key)) ? this.modals.wallet.formErrors[key][0] : ''
            },

            updateWalletAmount () {
                if (this.modals.wallet.walletId === null) {
                    this.modals.wallet.loading = true

                    createWalletForUser(this.users[this.modals.wallet.index].id, this.modals.wallet.fields.amount).then(response => {
                        this.users[this.modals.wallet.index].amount = this.modals.wallet.fields.amount
                        this.$toast.success({
                            title: 'کیف پول',
                            message: 'بروزرسانی با موفقیت انجام شد',
                        })
                        this.modals.wallet.visibility = false
                    }).catch(error => {
                        this.$toast.error({
                            title: 'کیف پول',
                            message: error.response.data.msg,
                        })
                    }).finally(() => {
                        this.modals.wallet.loading = false
                    })
                } else {
                    this.modals.wallet.loading = true

                    updateWalletAmount(this.modals.wallet.walletId, this.modals.wallet.fields.amount).then(response => {
                        this.users[this.modals.wallet.index].amount = this.modals.wallet.fields.amount
                        this.$toast.success({
                            title: 'کیف پول',
                            message: 'بروزرسانی با موفقیت انجام شد',
                        })
                        this.modals.wallet.visibility = false
                    }).catch(error => {
                        this.$toast.error({
                            title: 'کیف پول',
                            message: error.response.data.msg,
                        })
                    }).finally(() => {
                        this.modals.wallet.loading = false
                    })
                }
            },

            // </editor-fold>

            // <editor-fold desc="Update profile">

            showEditProfileModal (index) {
                this.modals.edit.formErrors = {}
                this.modals.edit.visibility = true
                this.modals.edit.index = index
                this.modals.edit.fields.image = null
                this.modals.edit.profileImageURL = null

                this.modals.edit.fields.name = this.users[index].name
                this.modals.edit.fields.email = this.users[index].email
                this.modals.edit.fields.whatsappNumber = this.users[index].whatsapp_number
                if (this.users[index].profile_image !== null)
                    this.modals.edit.profileImageURL = `http://localhost:8080/api/v1/uploads?id=${this.users[index].profile_image.id}`
            },

            changeProfileImage(e) {
                this.modals.edit.fields.image = e.target.files[0]
                this.modals.edit.profileImageURL = URL.createObjectURL(e.target.files[0])
            },

            // Get errors from "rs-form"-component and set in "formErrors"-data-variable
            setFormErrorsEditProfile (errors) {
                this.modals.edit.formErrors = errors
            },

            // Customizing error-message for show in view (below inputs)
            getInputEditProfile (key) {
                return (this.modals.edit.formErrors.hasOwnProperty(key)) ? this.modals.edit.formErrors[key][0] : ''
            },

            updateProfile () {
                this.modals.edit.loading = true
                this.modals.edit.formErrors = {}

                updateProfile(this.users[this.modals.password.index].id, this.modals.edit.fields.name, this.modals.edit.fields.email, this.modals.edit.fields.whatsappNumber, this.modals.edit.fields.image).then(response => {
                    this.modals.edit.fields.name = ''
                    this.modals.edit.fields.email = ''
                    this.modals.edit.fields.whatsappNumber = ''
                    this.modals.edit.fields.image = null
                    this.modals.edit.profileImageURL = null
                    this.$toast.success({
                        title: 'ویرایش پروفایل',
                        message: 'بروزرسانی با موفقیت انجام شد',
                    })
                    this.modals.edit.visibility = false
                }).catch(error => {
                    this.$toast.error({
                        title: 'ویرایش پروفایل',
                        message: error.response.data.msg,
                    })
                }).finally(() => {
                    this.modals.edit.loading = false
                })
            },

            // </editor-fold>

            // <editor-fold desc="Update password">

            showChangePasswordModal (index) {
                this.modals.password.formErrors = {}
                this.modals.password.visibility = true
                this.modals.password.index = index
                this.modals.password.fields.password = ''
                this.modals.password.fields.retypePassword = ''
            },

            // Get errors from "rs-form"-component and set in "formErrors"-data-variable
            setFormErrorsChangePassword (errors) {
                this.modals.password.formErrors = errors
            },

            // Customizing error-message for show in view (below inputs)
            getInputErrorPassword (key) {
                return (this.modals.password.formErrors.hasOwnProperty(key)) ? this.modals.password.formErrors[key][0] : ''
            },

            updatePassword () {
                this.modals.password.loading = true
                this.modals.password.formErrors = {}

                updatePassword(this.users[this.modals.password.index].id, this.modals.password.fields.password).then(response => {
                    this.modals.password.fields.password = ''
                    this.modals.password.fields.retypePassword = ''
                    this.$toast.success({
                        title: 'تغییر گذرواژه',
                        message: 'بروزرسانی با موفقیت انجام شد',
                    })
                    this.modals.password.visibility = false
                }).catch(error => {
                    this.$toast.error({
                        title: 'تغییر گذرواژه',
                        message: error.response.data.msg,
                    })
                }).finally(() => {
                    this.modals.password.loading = false
                })
            },

            // </editor-fold>
        },

        mounted () {
            this.getUsers()
        }
    }
</script>
