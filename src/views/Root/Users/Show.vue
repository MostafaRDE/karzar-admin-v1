<template>
    <div class="card">
        <div v-if="loading"
             class="position-absolute top-0 left-0 right-0 bottom-0 d-flex align-items-center justify-content-center"
             style="background: #000A; z-index: 9999; color: white">
            <rs-loading icon="spinner4"/>
        </div>

        <rs-form :submit="updateUser">
            <rs-modal title="ویرایش کاربر" v-model="modals.edit.visibility">
                <div class="row">
                    <div class="col-sm-6">
                        <label>نام</label>
                        <rs-input placeholder="نام"
                                  v-model="modals.edit.fields.name"/>
                    </div>
                    <div class="col-sm-6">
                        <label>کد معرف</label>
                        <rs-input placeholder="کد معرف"
                                  v-model="modals.edit.fields.refer"/>
                    </div>
                    <div class="col-sm-6">
                        <label>ایمیل</label>
                        <rs-input placeholder="ایمیل"
                                  v-model="modals.edit.fields.email"/>
                    </div>
                    <div class="col-sm-6">
                        <label>شماره واتس آپ</label>
                        <rs-input placeholder="شماره واتس آپ"
                                  v-model="modals.edit.fields.whatsappNumber"/>
                    </div>
                </div>

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
            <div class="d-flex flex-wrap">
                <rs-button icon="vcard" class="mb-3 mr-3" @click.native="showEditModal">ویرایش کاربر</rs-button>
                <rs-button icon="comments" class="mb-3 mr-3" @click.native="showSetDescriptionModal">ثبت توضیحات
                </rs-button>
                <rs-button icon="sync" color="primary" class="mb-3 mr-3"
                           @click.native="$router.push({name: 'userTradesHistory', params: {id: $route.params.id}})">
                    تورنومنت ها
                </rs-button>
                <rs-button icon="credit-card" color="primary" class="mb-3 mr-3"
                           @click.native="$router.push({name: 'userDeposits', params: {id: $route.params.id}})">واریز و برداشت
                </rs-button>
                <rs-button icon="wallet" color="primary" class="mb-3 mr-3"
                           @click.native="$router.push({name: 'userWallets', params: {id: $route.params.id}})">کیف پول
                </rs-button>
                <rs-button icon="lock" color="primary" class="mb-3 mr-3" @click.native="showChangePassword">تغییر رمز عبور</rs-button>
            </div>
        </div>

        <hr class="my-0"/>

        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <h3 class="mb-0">اطلاعات پایه</h3>
                <div class="d-flex">
                    <div class="d-flex align-items-center ml-2">
                        <rs-switchery-2 :active="!getUserData('locked')" @click.native="changeLock()">
                            <mdi-shield-account size="21px" slot="icon"/>
                        </rs-switchery-2>
                        <rs-loading v-if="lockChanging" icon="spinner4" class="ml-2"/>
                    </div>
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-sm-3 d-flex align-items-center">
                    <span>نام</span>
                </div>
                <div class="col-sm-3 text-right">
                    <span>{{ getUserData('name') }}</span>
                    <rs-button-icon class="ml-2" icon="copy3" rounded @click.native="copyTextUser('name')"/>
                </div>
                <div class="col-sm-3 d-flex align-items-center">
                    <span>کد معرف</span>
                </div>
                <div class="col-sm-3 text-right">
                    <span>{{ getUserData('refer_code') }}</span>
                    <rs-button-icon class="ml-2" icon="copy3" rounded @click.native="copyTextUser('refer_code')"/>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-3 d-flex align-items-center">
                    <span>شماره واتس اپ</span>
                </div>
                <div class="col-sm-3 d-flex align-items-center justify-content-end">
                    <span style="line-height: 1">{{ getUserData('whatsapp_number') }}</span>
                    <rs-button-icon class="ml-2" icon="copy3" rounded @click.native="copyTextUser('whatsapp_numbers')"/>
                </div>
                <div class="col-sm-3 d-flex align-items-center">
                    <span>ایمیل</span>
                </div>
                <div class="col-sm-3 d-flex align-items-center justify-content-end">
<!--                    <rs-loading v-if="changingStatusEmail" icon="spinner4"/>-->
<!--                    <rs-switchery class="mb-0 ml-2" :active="getUserData('email_status')"-->
<!--                                  @click.native="updateStatusEmail"/>-->
                    <span style="line-height: 1">{{ getUserData('email') }}</span>
                    <rs-button-icon class="ml-2" icon="copy3" rounded @click.native="copyTextUser('email')"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        blockUser,
        unblockUser,
        user,
        updateProfile,
        updatePassword,
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

            user: {},

            // Server error message after submit data
            signInError: {},

            modals: {
                edit: {
                    visibility: false,
                    loading: false,

                    fields: {
                        name: '',
                        whatsappNumber: '',
                        email: '',
                        refer: '',
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
                }
            }
        }),

        methods: {
            getUser () {
                this.loading = true
                user(this.$route.params.id)
                    .then(response => {
                        this.user = response.data
                    })
                    .catch(error => {

                    })
                    .finally(() => {
                        this.loading = false
                    })
            },

            showEditModal () {
                if (!this.modals.edit.loading) {
                    this.modals.edit.fields.name = this.getUserData('name')
                    this.modals.edit.fields.whatsappNumber = this.getUserData('whatsapp_number')
                    this.modals.edit.fields.email = this.getUserData('email')
                    this.modals.edit.fields.refer = this.getUserData('refer_code')

                    this.modals.edit.visibility = true
                }
            },
            updateUser () {
                if (!this.modals.edit.loading) {
                    this.modals.edit.loading = true

                    let data = {
                        user_id: this.$route.params.id,
                        name: this.modals.edit.fields.name,
                        whatsapp_number: this.modals.edit.fields.whatsappNumber,
                        email: this.modals.edit.fields.email,
                        refer_code: this.modals.edit.fields.refer,
                    }

                    updateProfile(data)
                        .then(response => {
                            this.$toast.success({
                                title: 'ویرایش کاربر',
                                message: 'با موفقیت انجام شد',
                            })
                            this.modals.edit.visibility = false
                        })
                        .catch(error => {
                            this.$toast.error({
                                title: 'ویرایش کاربر',
                                message: error.response.data.msg,
                            })
                        })
                        .finally(() => {
                            this.modals.edit.loading = false
                        })
                }
            },

            changeLock () {
                if (!this.lockChanging) {
                    this.lockChanging = true
                    updateUser({
                        user_id: this.getUserData('id'),
                        locked: this.getUserData('locked') ? 'false' : 'true',
                    })
                        .then(response => {
                            this.$toast.success({
                                title: 'تغییر وضعیت بلاک کاربر',
                                message: 'با موفقیت انجام شد',
                            })
                            this.user.locked = !this.user.locked
                        })
                        .catch(error => {
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
                this.modals.setDescription.fields.text = this.user.des_for_admin
                this.modals.setDescription.visibility = true
            },
            setDescription () {
                if (!this.modals.setDescription.loading) {
                    this.modals.setDescription.loading = true
                    updateUser({
                        des: this.modals.setDescription.fields.text,
                        user_id: this.$route.params.id,
                    })
                        .then(response => {
                            this.$toast.success({
                                title: 'ثبت نوضیحات',
                                message: 'با موفقیت انجام شد',
                            })
                            this.user.des_for_admin = this.modals.setDescription.fields.text
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
                    updateUser({
                        user_id: this.getUserData('id'),
                        email_status: this.getUserData('email_status') ? 'false' : 'true',
                    })
                        .then(response => {
                            this.$toast.success({
                                title: 'تغییر وضعیت تایید ایمیل',
                                message: 'با موفقیت انجام شد',
                            })
                            this.user.email_status = !this.user.email_status
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
        },

        mounted () {
            this.getUser()
        }
    }
</script>
