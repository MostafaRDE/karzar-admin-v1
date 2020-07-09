<template>
    <div class="card">
        <div v-if="loading"
             class="position-absolute top-0 left-0 right-0 bottom-0 d-flex align-items-center justify-content-center"
             style="background: #000A; z-index: 9999; color: white">
            <rs-loading icon="spinner4"/>
        </div>

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
                                  :error="getInputEditProfile('imageProfile')"
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
                          placeholder="شماره موبایل"
                          name="mobileNumber"
                          :rules="modals.edit.fields.rules.mobileNumber"
                          :error="getInputEditProfile('mobileNumber')"
                          v-model="modals.edit.fields.mobileNumber"/>

                <template slot="footer">
                    <rs-button type="button" color="link" @click.native="modals.edit.visibility = false">بستن
                    </rs-button>
                    <rs-button type="submit" bg="primary" :loading="modals.edit.loading">ویرایش</rs-button>
                </template>

            </rs-modal>

        </rs-form>

        <rs-form :submit="setDescription">
            <rs-modal title="ثبت توضیحات" dialogStyle="min-width: 300px" v-model="modals.setDescription.visibility">

                <div class="row">
                    <div class="col-sm-12">
                        <rs-textarea placeholder="توضیحات" v-model="modals.setDescription.fields.text"/>
                    </div>
                </div>

                <template slot="footer">
                    <rs-button type="button" color="link" @click.native="modals.setDescription.visibility = false">
                        بستن
                    </rs-button>
                    <rs-button type="submit" bg="primary" :loading="modals.setDescription.loading">ثبت</rs-button>
                </template>
            </rs-modal>
        </rs-form>

        <rs-form :submit="changePassword">
            <rs-modal title="تغییر رمز عبور" dialogStyle="min-width: 300px" v-model="modals.changePassword.visibility">

                <div class="row">
                    <div class="col-sm-12">
                        <rs-input type="password" placeholder="رمزعبور" v-model="modals.changePassword.password"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <rs-input type="password" placeholder="تکرار رمزعبور" v-model="modals.changePassword.retypePassword"/>
                    </div>
                </div>

                <template slot="footer">
                    <rs-button type="button" color="link" @click.native="modals.changePassword.visibility = false">
                        بستن
                    </rs-button>
                    <rs-button type="submit" bg="primary" :loading="modals.changePassword.loading">ثبت</rs-button>
                </template>

            </rs-modal>
        </rs-form>

        <div class="card-header header-elements-inline pb-0">
            <div class="d-flex flex-wrap w-100">
                <rs-button icon="vcard" class="mb-3 mr-3" @click.native="showEditProfileModal">ویرایش کاربر</rs-button>
                <rs-button icon="comments" class="mb-3 mr-3" @click.native="showSetDescriptionModal">ثبت توضیحات
                </rs-button>
                <rs-button icon="sync" color="primary" class="mb-3 mr-3"
                           @click.native="$router.push({name: 'userTournaments', params: {id: $route.params.id}})">
                    تورنومنت ها
                </rs-button>
                <rs-button icon="credit-card" color="primary" class="mb-3 mr-3"
                           @click.native="$router.push({name: 'userDeposits', params: {id: $route.params.id}})">واریز
                </rs-button>
                <rs-button icon="credit-card" color="primary" class="mb-3 mr-3"
                           @click.native="$router.push({name: 'userWithdraws', params: {id: $route.params.id}})">برداشت
                </rs-button>
                <rs-button icon="lock" color="primary" class="mb-3 mr-3" @click.native="showChangePassword">تغییر رمز عبور</rs-button>

                <div class="mb-3 flex-grow-1 d-flex justify-content-end align-items-center">
                    <span class="mr-2 font-weight-bold font-size-lg">{{ moneyFormat(balance, 0) }}</span>
                    <span class="font-weight-bold font-size-lg">تومان</span>
                </div>
            </div>
        </div>

        <hr class="my-0"/>

        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <h3 class="mb-0">اطلاعات پایه</h3>
                <div class="d-flex">
                    <div class="d-flex align-items-center ml-2">
                        <rs-switchery-2 :active="getUserData('blocked_at') == null" @click.native="changeLock">
                            <mdi-shield-account size="21px" slot="icon"/>
                        </rs-switchery-2>
                        <rs-loading v-if="lockChanging" icon="spinner4" class="ml-2"/>
                    </div>
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-sm-3 d-flex align-items-center">
                    <span class="font-weight-normal">نام</span>
                </div>
                <div class="col-sm-3 text-right">
                    <span class="font-weight-normal">{{ getUserData('name') || 'ثبت نشده' }}</span>
                    <rs-button-icon class="ml-2" icon="copy3" rounded @click.native="copyTextUser('name')"/>
                </div>
                <div class="col-sm-3 d-flex align-items-center">
                    <span class="font-weight-normal">کد معرف</span>
                </div>
                <div class="col-sm-3 text-right">
                    <span class="font-weight-normal">
                        <router-link v-if="getUserData('refer_code')" :to="{name: 'userShow', params: {id: getUserData('refer_code')}}">{{ getUserData('refer_code') }}</router-link>
                        <span v-else>ثبت نشده</span>
                    </span>
                    <rs-button-icon class="ml-2" icon="copy3" rounded @click.native="copyTextUser('refer_code')"/>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-3 d-flex align-items-center">
                    <span class="font-weight-normal">شماره موبایل</span>
                </div>
                <div class="col-sm-3 d-flex align-items-center justify-content-end">
                    <rs-loading v-if="changingStatusMobileNumber" icon="spinner4"/>
                    <rs-switchery class="mb-0 ml-2" :active="getUserData('mobile_number_verified_at') != null"
                                  @click.native="updateStatusMobileNumber"/>
                    <span class="font-weight-normal" style="line-height: 1">{{ getUserData('mobile_number') }}</span>
                    <rs-button-icon class="ml-2" icon="copy3" rounded @click.native="copyTextUser('mobile_number')"/>
                </div>
                <div class="col-sm-3 d-flex align-items-center">
                    <span class="font-weight-normal">ایمیل</span>
                </div>
                <div class="col-sm-3 d-flex align-items-center justify-content-end">
                    <rs-loading v-if="changingStatusEmail" icon="spinner4"/>
                    <rs-switchery class="mb-0 ml-2" :active="getUserData('email_verified_at') != null"
                                  @click.native="updateStatusEmail"/>
                    <span class="font-weight-normal" style="line-height: 1">{{ getUserData('email') }}</span>
                    <rs-button-icon class="ml-2" icon="copy3" rounded @click.native="copyTextUser('email')"/>
                </div>
            </div>
        </div>

        <hr class="my-0"/>


        {{ /* Start status description character modal */ }}
        <rs-form :submit="updateStatusCharacter">
            <rs-modal :dialogStyle="{minWidth: '600px'}"
                      :title="`${modals.character.type === 'ADD' ? 'افزودن' : 'ویرایش'} توضیحات`"
                      v-model="modals.character.visibility">

                <div class="col-sm-12">
                    <rs-input textarea placeholder="توضیحات" v-model="modals.character.fields.status_reason"/>
                </div>

                <template slot="footer">
                    <rs-button type="button" color="link" @click.native="modals.character.visibility = false">بستن
                    </rs-button>
                    <rs-button type="submit" bg="primary" :loading="modals.character.loading">{{
                        modals.character.type === 'ADD'
                        ?
                        'افزودن' : 'بروزرسانی'}}
                    </rs-button>
                </template>

            </rs-modal>
        </rs-form>
        {{ /* End status description character modal */ }}

        <div v-if="characters.length || loadings.characters" class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <h3 class="mb-0">کاراکتر ها</h3>
            </div>

            <template>

                <rs-loading v-if="loadings.characters" icon="spinner4"/>

                <rs-table v-else-if="characters.length">
                    <template slot="head">
                        <th>ردیف</th>
                        <th>نام کاراکتر</th>
                        <th>آی دی کاراکتر</th>
                        <th></th>
                    </template>

                    <template slot="body">
                        <tr v-for="(item, index) of characters">
                            <td class="font-weight-normal">{{ index + 1 }}</td>
                            <td class="font-weight-normal" style="direction: ltr">{{ item.name }}</td>
                            <td class="font-weight-normal">{{ item.id }}</td>
                            <td>
                                <div class="d-flex align-items-center">
                                    <rs-drop-down class="flex-grow-1" :source="statuses.characters" v-model="item.status" @input="updateStatusCharacter(item.id, index)"/>
                                    <rs-badge-icon class="cursor-pointer ml-2 mr-2"
                                                   color="primary"
                                                   icon="bubble-lines4"
                                                   rounded
                                                   @click.native="showUpdateCharacterDescriptionStatusModal(item.id, index)"/>
                                </div>
                            </td>
                        </tr>
                    </template>
                </rs-table>

                <div v-else class="card-body text-center">
                    <span>کاراکتری پیدا نشد</span>
                </div>

            </template>

        </div>
    </div>
</template>

<script>
    import {
        myCharacters,
        user,
        updateProfile,
        updatePassword, userBalance, updateCharacterStatus,
    } from '../../../api'

    export default {
        name: 'Show',

        metaInfo: {
            title: 'جزئیات'
        },

        breadcrumb: () => ([
            { label: 'پیشخوان', to: '/', icon: 'home4' },
            { label: 'کاربران', to: '/users', icon: 'users4' },
            { label: 'جزئیات', to: '', icon: 'user' },
        ]),

        components: {
            'mdi-shield-account': () => import('../../../components/icons/MaterialDesignIcons/MdiShieldAccount.vue'),
        },

        data: () => ({
            loading: false,
            lockChanging: false,
            changingStatusMobileNumber: false,
            changingStatusEmail: false,
            settingDescription: false,

            loadings: {
                characters: false,
            },

            user: {},
            balance: 0,
            characters: [],

            statuses: {
                characters: [
                    {key: 0, value: 'در انتظار تایید'},
                    {key: 1, value: 'تایید'},
                    {key: 2, value: 'رد شده'},
                ]
            },

            // Server error message after submit data
            signInError: {},

            modals: {
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
                        mobileNumber: '',
                        image: null,

                        rules: {
                            name: 'required|string|min:2',
                            email: 'required|email',
                            mobileNumber: 'required|string:digits',
                        }
                    }
                },
                setDescription: {
                    visibility: false,
                    loading: false,

                    fields: {
                        text: '',
                    }
                },
                changePassword: {
                    visibility: false,
                    loading: false,
                    password: '',
                    retypePassword: '',
                },
                character: {
                    type: 'ADD', // {'ADD' | 'EDIT'}

                    visibility: false,
                    loading: false,
                    formErrors: {},

                    id: -1,
                    index: -1,

                    fields: {
                        status_reason: '',
                    }
                },
            }
        }),

        methods: {
            getUser () {
                if (!this.loading) {
                    this.loading = true
                    user(this.$route.params.id)
                        .then(response => {
                            this.user = response.data
                            userBalance(this.$route.params.id)
                                .then(res => {
                                    this.balance = res.data.amount
                                })
                                .catch(error => {

                                })
                                .finally(() => {
                                    this.loading = false
                                })
                        })
                        .catch(error => {

                        })
                        .finally(() => {
                            this.loading = false
                        })
                }
            },

            // <editor-fold desc="Update profile">

            showEditProfileModal () {
                this.modals.edit.formErrors = {}
                this.modals.edit.visibility = true
                this.modals.edit.fields.image = null
                this.modals.edit.profileImageURL = null

                this.modals.edit.fields.name = this.user.name
                this.modals.edit.fields.email = this.user.email
                this.modals.edit.fields.mobileNumber = this.user.mobile_number
                if (this.user.profile_image !== null)
                    this.modals.edit.profileImageURL = process.env.VUE_APP_URL + this.user.profile_image.url_static
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
                if (!this.modals.edit.loading) {
                    this.modals.edit.loading = true
                    this.modals.edit.formErrors = {}

                    updateProfile({
                        user_id: this.user.id,
                        name: this.modals.edit.fields.name,
                        email: this.modals.edit.fields.email,
                        mobile_number: this.modals.edit.fields.mobileNumber,
                        image: this.modals.edit.fields.image
                    }).then(response => {
                        this.modals.edit.fields.name = ''
                        this.modals.edit.fields.email = ''
                        this.modals.edit.fields.mobileNumber = ''
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
                }
            },

            // </editor-fold>

            changeLock () {
                if (!this.lockChanging) {
                    this.lockChanging = true
                    updateProfile({
                        user_id: this.getUserData('id'),
                        blocked_at: !this.getUserData('blocked_at'),
                    })
                        .then(response => {
                            this.$toast.success({
                                title: 'تغییر وضعیت بلاک کاربر',
                                message: 'با موفقیت انجام شد',
                            })
                            this.user.blocked_at = !this.user.blocked_at
                        })
                        .catch(error => {
                            console.log(error)
                            this.$toast.error({
                                title: 'تغییر وضعیت بلاک کاربر',
                                message: error.response.data.msg,
                            })
                        })
                        .finally(() => {
                            this.lockChanging = false
                        })
                }
            },

            showSetDescriptionModal () {
                this.modals.setDescription.fields.text = this.user.description
                this.modals.setDescription.visibility = true
            },
            setDescription () {
                if (!this.modals.setDescription.loading) {
                    this.modals.setDescription.loading = true
                    updateProfile({
                        description: this.modals.setDescription.fields.text,
                        user_id: this.$route.params.id,
                    })
                        .then(response => {
                            this.$toast.success({
                                title: 'ثبت نوضیحات',
                                message: 'با موفقیت انجام شد',
                            })
                            this.user.description = this.modals.setDescription.fields.text
                            this.modals.setDescription.visibility = false
                        })
                        .catch(error => {
                            this.$toast.error({
                                title: 'ثبت نوضیحات',
                                message: error.response.data.msg,
                            })
                        })
                        .finally(() => {
                            this.modals.setDescription.loading = false
                        })
                }
            },

            showChangePassword () {
                this.modals.changePassword.password = ''
                this.modals.changePassword.retypePassword = ''
                this.modals.changePassword.visibility = true
            },
            changePassword() {
                if (!this.modals.changePassword.loading) {
                    if (this.modals.changePassword.password !== this.modals.changePassword.retypePassword) {
                        this.$toast.error({
                            title: 'خطا',
                            message: 'رمز عبور با تکرار آن مطابقت ندارد',
                        })
                        return;
                    }
                    this.modals.changePassword.loading = true
                    updatePassword(this.$route.params.id, this.modals.changePassword.password)
                        .then(response => {
                            this.$toast.success({
                                title: 'تغییر رمز عبور',
                                message: 'با موفقیت انجام شد',
                            })
                            this.modals.changePassword.visibility = false
                        })
                        .catch(error => {
                            this.$toast.error({
                                title: 'تغییر رمز عبور',
                                message: error.response.data.msg,
                            })
                        })
                        .finally(() => {
                            this.modals.changePassword.loading = false
                        })
                }
            },

            //----------------------------------------------------------

            updateStatusEmail () {
                if (!this.changingStatusEmail) {
                    this.changingStatusEmail = true
                    updateProfile({
                        user_id: this.getUserData('id'),
                        email_verified_at: !this.getUserData('email_verified_at'),
                    })
                        .then(response => {
                            this.$toast.success({
                                title: 'تغییر وضعیت تایید ایمیل',
                                message: 'با موفقیت انجام شد',
                            })
                            this.user.email_verified_at = !this.user.email_verified_at
                        })
                        .catch(error => {
                            this.$toast.error({
                                title: 'تغییر وضعیت تایید ایمیل',
                                message: error.response.data.msg,
                            })
                        })
                        .finally(() => {
                            this.changingStatusEmail = false
                        })
                }
            },

            updateStatusMobileNumber () {
                if (!this.changingStatusMobileNumber) {
                    this.changingStatusMobileNumber = true
                    updateProfile({
                        user_id: this.getUserData('id'),
                        mobile_number_verified_at: !this.getUserData('mobile_number_verified_at'),
                    })
                        .then(response => {
                            this.$toast.success({
                                title: 'تغییر وضعیت تایید شماره موبایل',
                                message: 'با موفقیت انجام شد',
                            })
                            this.user.mobile_number_verified_at = !this.user.mobile_number_verified_at
                        })
                        .catch(error => {
                            this.$toast.error({
                                title: 'تغییر وضعیت تایید ایمیل',
                                message: error.response.data.msg,
                            })
                        })
                        .finally(() => {
                            this.changingStatusMobileNumber = false
                        })
                }
            },

            getUserData (key) {
                if (this.user && this.user.hasOwnProperty(key)) {
                    return this.user[key]
                }
            },

            copyTextUser (key) {
                if (this.copyText(this.getUserData(key))) {
                    this.$toast.success({
                        title: 'کپی',
                        message: 'کپی شد',
                    })
                } else {
                    this.$toast.error({
                        title: 'کپی',
                        message: 'کپی ناموفق',
                    })
                }
            },

            //----------------------------------------------------------

            getCharacters() {
                this.loadings.characters = true

                myCharacters(undefined, undefined, this.$route.params.id)
                    .then(response => {
                        this.characters = response.data.result
                    })
                    .catch(error => {
                        this.$toast.error({
                            title: 'خطا',
                            message: 'خطا در بارگیری گزارشات',
                        })
                    })
                    .finally(() => {
                        this.loadings.characters = false
                    })
            },

            showUpdateCharacterDescriptionStatusModal(id, index) {
                this.modals.character.loading = false
                this.modals.character.formErrors = {}

                this.modals.character.fields.status_reason = this.characters[index].status_reason

                this.modals.character.id = id
                this.modals.character.index = index
                this.modals.character.visibility = true
            },

            updateStatusCharacter(id = undefined, index = -1) {
                this.modals.character.loading = true

                updateCharacterStatus(id || this.modals.character.id, this.characters[index > -1 ? index : this.modals.character.index].status, index > -1 ? this.characters[index].status_reason : this.modals.character.fields.status_reason)
                    .then(response => {
                        this.$toast.success({
                            title: 'ویرایش وضعیت',
                            message: 'بروزرسانی با موفقیت انجام شد',
                        })
                        if (this.modals.character.visibility) {
                            this.modals.character.visibility = false

                            this.modals.character.loading = false
                            this.modals.character.formErrors = {}

                            this.modals.character.fields.status_reason = ''

                            this.modals.character.id = 0
                            this.modals.character.index = -1
                        }
                        this.getCharacters()
                    })
                    .catch(error => {
                        this.$toast.error({
                            title: 'ویرایش وضعیت',
                            message: 'بروزرسانی با شکست مواجه شد',
                        })
                    })
                    .finally(() => {
                        this.modals.character.loading = false
                    })
            }
        },

        mounted () {
            this.getUser()
            this.getCharacters()
        }
    }
</script>
