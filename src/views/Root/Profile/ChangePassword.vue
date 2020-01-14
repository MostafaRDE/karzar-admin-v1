<template>
    <div>
        <div>
            <div class="card">
                <div class="card-header header-elements-inline">
                    <h5 class="card-title">تغییر گذرواژه</h5>
                </div>

                <div class="card-body">
                    <rs-form :submit="changePassword" @errors="setFormErrors">
                        <div class="row">
                            <div class="col-12">
                                <rs-input type="password"
                                          placeholder="گذرواژه فعلی"
                                          name="currentPassword"
                                          :error="getInputError('currentPassword')"
                                          :rules="fields.rules.currentPassword"
                                          v-model="fields.currentPassword"/>
                            </div>
                            <div class="col-12">
                                <rs-input type="password"
                                          placeholder="گذرواژه جدید"
                                          name="password"
                                          :error="getInputError('password')"
                                          :rules="fields.rules.password"
                                          v-model="fields.password"/>
                            </div>
                            <div class="col-12">
                                <rs-input type="password"
                                          placeholder="تکرار گذرواژه جدید"
                                          name="confirm-password"
                                          :error="getInputError('confirm-password')"
                                          :rules="fields.rules.passwordConfirmation"
                                          v-model="fields.passwordConfirmation"/>
                            </div>
                            <div class="col-12">
                                <rs-button type="submit" :loading="loading">ویرایش</rs-button>
                            </div>
                        </div>
                    </rs-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { profileChangePassword } from '../../../api'

    export default {
        name: 'ChangePassword',

        metaInfo: {
            title: 'پروفایل - تغییر گذرواژه'
        },

        breadcrumb: () => ([
            { label: 'پیشخوان', to: '/', icon: 'home4' },
            { label: 'پروفایل', to: '/profile', icon: 'user', disabled: true },
            { label: 'تغییر گذرواژه', to: '/profile/change-password', icon: 'key' },
        ]),

        data: () => ({
            formErrors: {},
            loading: false,

            fields: {
                currentPassword: '',
                password: '',
                passwordConfirmation: '',
                rules: {
                    currentPassword: 'required|string',
                    password: 'required|password',
                    passwordConfirmation: 'required|confirm_password',
                }
            }
        }),

        methods: {
            // Get errors from "rs-form"-component and set in "formErrors"-data-variable
            setFormErrors (errors) {
                this.formErrors = errors
            },

            // Customizing error-message for show in view (below inputs)
            getInputError (key) {
                return (this.formErrors.hasOwnProperty(key)) ? this.formErrors[key][0] : ''
            },

            changePassword() {
                this.loading = true
                profileChangePassword(this.fields.currentPassword, this.fields.password)
                    .then(response => {
                        if (response.hasOwnProperty('data')) {
                            this.$toast.success({
                                title: 'تغییر گذرواژه',
                                message: 'تغییر گذرواژه با موفقیت انجام شد',
                            })
                        } else {
                            this.$toast.error({
                                title: 'تغییر گذرواژه',
                                message: response.response.data.msg,
                            })
                        }
                    })
                    .catch(error => [
                        this.$toast.error({
                            title: 'تغییر گذرواژه',
                            message: 'تغییر گذرواژه با شکست مواجه شد',
                        })
                    ])
                    .finally(() => {
                        this.loading = false
                    })
            }
        }
    }
</script>
