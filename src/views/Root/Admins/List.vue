<template>
    <div>
        <div>
            <div class="card">
                <div class="card-header header-elements-inline">
                    <h5 class="card-title">مجری ها</h5>
                    <rs-button @click.native="showAdminModal('ADD')">+ افزودن</rs-button>
                </div>

                <rs-table v-if="!loading">
                    <template slot="head">
                        <th>ردیف</th>
                        <th>نام</th>
                        <th>ایمیل</th>
                        <th>نام کاربری</th>
                        <th>نقش</th>
                        <th>کلید دو مرحله ای گوگل</th>
                        <th>وضعیت بلاک</th>
                        <th></th>
                    </template>

                    <template slot="body">
                        <tr v-for="(item, index) of list">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.email }}</td>
                            <td>{{ item.username }}</td>
                            <td>{{ role(item.role) }}</td>
                            <td>{{ JSON.parse(item.secret).base32 }}</td>
                            <td>
                                <rs-switchery class="d-inline-block" activeColor="#e91e63" disableColor="#64BD63"
                                              v-model="item.blocked_at !== null"
                                              @click.native="blockToggle(index)"/>
                                <rs-loading v-if="item.loading_block" class="d-inline-block" icon="spinner4"/>
                            </td>
                            <td>
                                <rs-badge-icon class="cursor-pointer mr-2"
                                               bg="teal-600"
                                               icon="pencil6"
                                               rounded
                                               @click.native="showAdminModal('EDIT', index)"/>
                                <rs-badge-icon class="cursor-pointer mr-2"
                                               bg="teal-600"
                                               icon="key"
                                               rounded
                                               @click.native="showPasswordModal(index)"/>
                                <rs-badge-icon class="cursor-pointer mr-2"
                                               bg="teal-600"
                                               icon="equalizer2"
                                               rounded
                                               @click.native="showPermissionsModal(index)"/>
                                <rs-badge-icon class="cursor-pointer mr-2"
                                               bg="teal-600"
                                               icon="safe"
                                               rounded
                                               @click.native="update2fa(index, item.id)"/>
                                <rs-loading v-if="twoFactor.index === index && twoFactor.loading" class="d-inline-block"
                                            icon="spinner4"/>
                            </td>
                        </tr>
                    </template>
                </rs-table>

                <rs-loading v-if="loading" icon="spinner4"/>

                <div class="card-body">
                    <rs-pagination :count="totalPages" v-model="currentPage" @change="updateListByPagination"/>
                </div>

                <rs-form :submit="store" @errors="setFormErrors('admin', $event)">

                    <rs-modal :dialogStyle="{minWidth: '600px'}"
                              :title="`${modals.admin.type === 'ADD' ? 'افزودن' : 'ویرایش'} مجری`"
                              v-model="modals.admin.visibility">

                        <rs-input placeholder="نام"
                                  class="mb-0"
                                  name="name"
                                  :rules="modals.admin.fields.rules.name"
                                  :error="getInputError('admin', 'name')"
                                  v-model="modals.admin.fields.name"/>

                        <rs-input type="email"
                                  placeholder="ایمیل"
                                  class="mb-0 mt-10"
                                  name="email"
                                  :rules="modals.admin.fields.rules.email"
                                  :error="getInputError('admin', 'email')"
                                  v-model="modals.admin.fields.email"/>

                        <rs-input placeholder="نام کاربری"
                                  class="mb-0 mt-10"
                                  name="username"
                                  :rules="modals.admin.fields.rules.username"
                                  :error="getInputError('admin', 'username')"
                                  v-model="modals.admin.fields.username"/>

                        <template v-if="modals.admin.type === 'ADD'">
                            <rs-input type="password"
                                      placeholder="گذرواژه"
                                      class="mb-0 mt-10"
                                      name="password"
                                      :rules="modals.admin.fields.rules.password"
                                      :error="getInputError('admin', 'password')"
                                      v-model="modals.admin.fields.password"/>

                            <rs-input type="password"
                                      placeholder="تکرار گذرواژه"
                                      class="mb-0 mt-10"
                                      name="password-confirmation"
                                      :rules="modals.admin.fields.rules.retypePassword"
                                      :error="getInputError('admin', 'password-confirmation')"
                                      v-model="modals.admin.fields.retypePassword"/>
                        </template>

                        <template slot="footer">
                            <rs-button type="button" color="link" @click.native="modals.admin.visibility = false">بستن
                            </rs-button>
                            <rs-button type="submit" bg="primary" :loading="modals.admin.loading">{{ modals.admin.type
                                ===
                                'ADD' ? 'افزودن' : 'ویرایش' }}
                            </rs-button>
                        </template>

                    </rs-modal>

                </rs-form>

                <rs-form :submit="updatePassword" @errors="setFormErrors('updatePassword', $event)">

                    <rs-modal :dialogStyle="{minWidth: '600px'}"
                              title="ویرایش گذرواژه"
                              v-model="modals.updatePassword.visibility">

                        <rs-input type="password"
                                  placeholder="گذرواژه"
                                  class="mb-0 mt-10"
                                  name="password"
                                  :rules="modals.updatePassword.fields.rules.password"
                                  :error="getInputError('updatePassword', 'password')"
                                  v-model="modals.updatePassword.fields.password"/>

                        <rs-input type="password"
                                  placeholder="تکرار گذرواژه"
                                  class="mb-0 mt-10"
                                  name="password-confirmation"
                                  :rules="modals.updatePassword.fields.rules.retypePassword"
                                  :error="getInputError('updatePassword', 'password-confirmation')"
                                  v-model="modals.updatePassword.fields.retypePassword"/>

                        <template slot="footer">
                            <rs-button type="button" color="link"
                                       @click.native="modals.updatePassword.visibility = false">بستن
                            </rs-button>
                            <rs-button type="submit" bg="primary" :loading="modals.updatePassword.loading">ویرایش
                            </rs-button>
                        </template>

                    </rs-modal>

                </rs-form>

                <rs-form :submit="updatePermissions">
                    <rs-modal :dialogStyle="{minWidth: '800px'}"
                              v-model="modals.permissions.visibility">
                        <div class="row">
                            <div v-for="permission of permissions" class="col-3">
                                <rs-switchery class="d-inline-block" activeColor="#e91e63" disableColor="#64BD63"
                                              :active="!modals.permissions.permissions.includes(permission.id)"
                                              @click.native.prevent="permissionToggle(permission)"/>
                                <rs-loading v-if="modals.permissions.loading && modals.permissions.id === permission.id" class="d-inline-block" icon="spinner4"/>
                                {{ permission.label }}
                            </div>
                        </div>

                        <template slot="footer">
                            <rs-button type="button" color="link"
                                       @click.native="modals.permissions.visibility = false">بستن
                            </rs-button>
                            <rs-button type="submit" bg="primary" :loading="modals.permissions.loading">ویرایش
                            </rs-button>
                        </template>

                    </rs-modal>
                </rs-form>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        itemsPerPage,
        admins,
        storeAdmin,
        updateAdmin,
        updateAdmin2fa,
        updateAdminPassword,
        updateAdminPermissions,
        unblockAdmin,
        blockAdmin,
        permissions
    } from '../../../api'

    export default {
        name: 'List',

        metaInfo: {
            title: 'مجری ها'
        },

        breadcrumb: () => ([
            { label: 'پیشخوان', to: '/', icon: 'home4' },
            { label: 'مجری ها', to: '/admins', icon: 'user-tie' },
        ]),

        data: () => ({
            currentPage: 1,
            itemsPerPage,
            loading: false,

            permissions: [],
            list: [],
            totalPages: 0,

            twoFactor: {
                index: -1,
                id: 0,
                loading: false,
            },

            modals: {
                admin: {
                    type: 'ADD', // { ADD | EDIT }
                    loading: false,
                    visibility: false,
                    index: -1,
                    id: 0,

                    formErrors: {},
                    fields: {
                        name: '',
                        email: '',
                        username: '',
                        password: '',
                        retypePassword: '',
                        role: 'EXECUTOR',

                        rules: {
                            name: 'required|string|min:2',
                            email: 'required|email',
                            username: 'required|string|min:6',
                            password: 'required|password',
                            retypePassword: 'required|confirm_password',
                        }
                    },
                },

                updatePassword: {
                    loading: false,
                    visibility: false,
                    index: -1,
                    id: 0,

                    formErrors: {},
                    fields: {
                        password: '',
                        retypePassword: '',

                        rules: {
                            password: 'required|password|min:8',
                            retypePassword: 'required|confirm_password|min:8',
                        }
                    }
                },

                permissions: {
                    visibility: false,
                    loading: false,
                    index: -1,
                    id: 0,
                    permissions: [],
                }
            }
        }),

        methods: {
            role (role) {
                switch (role) {
                    case 'SUPER_ADMIN':
                        return 'مدیر کل'

                    case 'EXECUTOR':
                        return 'مجری'
                }
            },

            getPermissions () {
                permissions()
                    .then(response => {
                        this.permissions = response.data.result
                    })
            },

            getAll () {
                this.loading = true

                admins()
                    .then(response => {
                        this.getPermissions()
                        let totalPages = response.data.total / this.itemsPerPage
                        this.totalPages = (totalPages % 1 !== 0) ? Math.floor(totalPages) + 1 : totalPages
                        this.list = response.data.result.map(item => {
                            item['loading_block'] = false
                            return item
                        })
                    })
                    .catch(error => {
                        this.$toast.error({
                            title: 'خطا',
                            message: 'خطا در بارگیری مجریان'
                        })
                    })
                    .finally(() => {
                        this.loading = false
                    })
            },

            updateListByPagination () {
                this.getAll()
            },

            setFormErrors (modal, errors) {
                this.modals[modal].formErrors = errors
            },

            // Customizing error-message for show in view (below inputs)
            getInputError (modal, key) {
                return (this.modals[modal].formErrors.hasOwnProperty(key)) ? this.modals[modal].formErrors[key][0] : ''
            },

            // <editor-fold desc="Admin modal">

            showAdminModal (type, index = -1) {
                this.modals.admin.formErrors = {}
                this.modals.admin.type = type
                this.modals.admin.index = index

                if (type === 'ADD') {
                    this.modals.admin.id = 0
                    this.modals.admin.fields = {
                        name: '',
                        email: '',
                        username: '',
                        password: '',
                        retypePassword: '',
                        role: 'EXECUTOR',

                        rules: {
                            name: 'required|string|min:2',
                            email: 'required|email',
                            username: 'required|string|min:6',
                            password: 'required|password',
                            retypePassword: 'required|confirm_password',
                        }
                    }
                } else {
                    this.modals.admin.id = this.list[index].id
                    this.modals.admin.fields = {
                        name: this.list[index].name,
                        email: this.list[index].email,
                        username: this.list[index].username,
                        role: this.list[index].role,

                        rules: {
                            name: 'required|string|min:2',
                            email: 'required|email',
                            username: 'required|string|min:6',
                        }
                    }
                }
                this.modals.admin.visibility = true
            },

            store () {
                this.modals.admin.loading = true

                if (this.modals.admin.type === 'ADD') {
                    storeAdmin(this.modals.admin.fields.name, this.modals.admin.fields.email, this.modals.admin.fields.username, this.modals.admin.fields.password, this.modals.admin.fields.role)
                        .then(response => {
                            this.$toast.success({
                                title: 'افزودن',
                                message: 'افزودن با موفقیت انجام شد',
                            })

                            this.modals.admin.visibility = false
                            this.getAll()
                        })
                        .catch(error => {
                            this.$toast.error({
                                title: 'افزودن',
                                message: 'خطا در ثبت مجری',
                            })
                        })
                        .finally(() => {
                            this.modals.admin.loading = false
                        })
                } else {
                    updateAdmin(this.modals.admin.id, this.modals.admin.fields.name, this.modals.admin.fields.email, this.modals.admin.fields.username, this.modals.admin.fields.role)
                        .then(response => {
                            this.$toast.success({
                                title: 'ویرایش',
                                message: 'ویرایش با موفقیت انجام شد',
                            })

                            this.modals.admin.visibility = false
                            this.getAll()
                        })
                        .catch(error => {
                            this.$toast.error({
                                title: 'ویرایش',
                                message: 'خطا در بروزرسانی مجری',
                            })
                        })
                        .finally(() => {
                            this.modals.admin.loading = false
                        })
                }
            },

            // </editor-fold>

            // <editor-fold desc="Admin modal">

            showPasswordModal (index) {
                this.modals.updatePassword.formErrors = {}
                this.modals.updatePassword.index = index
                this.modals.updatePassword.id = this.list[index].id
                this.modals.updatePassword.fields = {
                    password: '',
                    retypePassword: '',

                    rules: {
                        password: 'required|password|min:8',
                        retypePassword: 'required|confirm_password',
                    }
                }
                this.modals.updatePassword.visibility = true
            },

            updatePassword () {
                this.modals.updatePassword.loading = true

                updateAdminPassword(this.modals.updatePassword.id, this.modals.updatePassword.fields.password)
                    .then(response => {
                        this.$toast.success({
                            title: 'ویرایش گذرواژه',
                            message: 'گذرواژه با موفقیت بروز شد',
                        })

                        this.modals.updatePassword.visibility = false
                        this.getAll()
                    })
                    .catch(error => {
                        this.$toast.success({
                            title: 'ویرایش گذرواژه',
                            message: 'بروزرسانی گذرواژه با شکست مواجه شد',
                        })
                    })
                    .finally(() => {
                        this.modals.updatePassword.loading = false
                    })
            },

            // </editor-fold>

            // <editor-fold desc="Permissions modal">

            showPermissionsModal (index) {
                this.modals.permissions.index = index
                this.modals.permissions.id = this.list[index].id
                this.modals.permissions.permissions = this.list[index].permissionsIds
                this.modals.permissions.visibility = true
            },

            permissionToggle(permission) {
                if (this.modals.permissions.permissions.includes(permission.id))
                    this.modals.permissions.permissions.splice(this.modals.permissions.permissions.indexOf(permission.id), 1)
                else
                    this.modals.permissions.permissions.push(permission.id)
            },

            updatePermissions() {
                this.modals.permissions.loading = true

                updateAdminPermissions(this.modals.permissions.id, this.modals.permissions.permissions.toString())
                    .then(response => {
                        this.$toast.success({
                            title: 'مجوزات',
                            message: 'مجوزات با موفقیت بروز شد',
                        })

                        this.modals.permissions.visibility = false
                        this.getAll()
                    })
                    .catch(error => {
                        this.$toast.error({
                            title: 'مجوزات',
                            message: 'بروزرسانی مجوزات شکست خورد',
                        })
                    })
                    .finally(() => {
                        this.modals.permissions.loading = false
                    })
            },

            // </editor-fold>

            update2fa (index, id) {
                this.twoFactor.index = index
                this.twoFactor.id = id
                this.twoFactor.loading = true

                updateAdmin2fa(id)
                    .then(response => {
                        this.$toast.success({
                            title: 'ساخت کلید دو مرحله ای',
                            message: 'کلید دو مرحله ای جدید با موفقیت ساخته شد',
                        })

                        this.getAll()
                    })
                    .catch(error => {
                        this.$toast.error({
                            title: 'ساخت کلید دو مرحله ای',
                            message: 'ساخت کلید دو مرحله ای جدید با شکست مواجه شد',
                        })
                    })
                    .finally(() => {
                        this.twoFactor.loading = false
                    })
            },

            blockToggle (index) {
                this.list[index].loading_block = true
                if (this.list[index].blocked_at === null) {
                    blockAdmin(this.list[index].id)
                        .then(response => {
                            this.list[index].blocked_at = moment().format()
                            this.$toast.success({
                                title: 'وضعیت بلاک',
                                message: 'مجری با موفقیت بلاک شد',
                            })
                        })
                        .catch(error => {
                            this.$toast.error({
                                title: 'وضعیت بلاک',
                                message: 'مجری با موفقیت بلاک شد',
                            })
                        })
                        .finally(() => {
                            this.list[index].loading_block = false
                        })
                } else {
                    unblockAdmin(this.list[index].id)
                        .then(response => {
                            this.list[index].blocked_at = null
                            this.$toast.success({
                                title: 'وضعیت بلاک',
                                message: 'مجری با موفقیت آنبلاک شد',
                            })
                        })
                        .catch(error => {
                            this.$toast.error({
                                title: 'وضعیت بلاک',
                                message: 'مجری با موفقیت آنبلاک شد',
                            })
                        })
                        .finally(() => {
                            this.list[index].loading_block = false
                        })
                }
            },
        },

        mounted () {
            this.getAll()
        }
    }
</script>
